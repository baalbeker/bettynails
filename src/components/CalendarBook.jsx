import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarBook.css";
import { getData } from "../firebase/functions";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore"; 
import { db } from "../firebase/firebase";

const CalendarBook = () => {
  const { user, fetchBookingData, fetchPending, approveBooking, denyBooking, updateDocument, addData, deleteOldBookings } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [modalBooking, setModalBooking] = useState(null);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [showPendingModal, setShowPendingModal] = useState(false);
  
  // Debouncing state
  const [pendingChanges, setPendingChanges] = useState(new Map());
  const [isProcessing, setIsProcessing] = useState(false);
  const debounceTimeoutRef = useRef(null);
  const DEBOUNCE_DELAY = 2000; // 2 seconds

  useEffect(() => {
    if (!user) return;

    const cleanupOldBookings = async () => {
      try {
        const employees = await getData("employees");
        const employee = employees.find((emp) => emp.name === "Бетина Борилова");
        if (!employee) return;
        await deleteOldBookings(employee.docID);
      } catch (error) {
        console.error("Error cleaning old bookings:", error);
      }
    };

    cleanupOldBookings();

    const fetchBookings = async () => {
      try {
        const formattedDate = selectedDate.toLocaleDateString("en-CA");
        const data = await fetchBookingData(formattedDate, user.displayName);
        const allSlots = Array.from({ length: 18 }, (_, i) => `${10 + Math.floor(i / 2)}:${(i % 2 === 0 ? '00' : '30')}`);
        
        const combinedSlots = [];
        const occupiedSlots = new Set();

        allSlots.forEach(hour => {
          if (occupiedSlots.has(hour)) return;

          const booking = data.find(b => b.selectedTime === hour);
          if (booking) {
            const [startHour, startMinute] = hour.split(':').map(Number);
            const procedureDuration = booking.procedureDuration;
            const startMinutes = startHour * 60 + startMinute;
            const endMinutes = startMinutes + procedureDuration;

            for (let t = startMinutes + 30; t < endMinutes; t += 30) {
              const hourStr = `${Math.floor(t / 60)}:${t % 60 === 0 ? '00' : '30'}`;
              occupiedSlots.add(hourStr);
            }

            const endHour = Math.floor(endMinutes / 60);
            const endMinute = endMinutes % 60;
            const endTime = `${endHour}:${endMinute === 0 ? "00" : "30"}`;

            combinedSlots.push({
              hour,
              status: booking.status === 'notavailable' ? 'notavailable' : 'booked',
              booking,
              startTime: hour,
              endTime
            });
          } else {
            combinedSlots.push({ hour, status: 'free' });
          }
        });

        setSlots(combinedSlots);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [user, selectedDate]);

  useEffect(() => {
    fetchPendingBookings();
  }, []);

  // Process pending changes with debouncing (restarts timer on each interaction)
  useEffect(() => {
    if (pendingChanges.size > 0) {
      // Clear existing timeout to restart the timer
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // Set new timeout - this restarts every time there's a new change
      debounceTimeoutRef.current = setTimeout(() => {
        processPendingChanges();
      }, DEBOUNCE_DELAY);
    }

    // Cleanup timeout on unmount
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [pendingChanges]);

  const processPendingChanges = async () => {
    if (pendingChanges.size === 0 || isProcessing) return;

    setIsProcessing(true);
    
    try {
      const employees = await getData("employees");
      const employee = employees.find((emp) => emp.name === "Бетина Борилова");
      if (!employee) throw new Error("Employee with the given name not found.");
      const employeeId = employee.docID;

      // Process all pending changes
      const changePromises = Array.from(pendingChanges.entries()).map(async ([slotKey, change]) => {
        const { action, slotData } = change;
        
        try {
          if (action === 'create') {
            const newBookingData = {
              name: "Почивка",
              procedure: "Почивка",
              selectedDate: selectedDate.toLocaleDateString("en-CA"),
              selectedTime: slotData.hour,
              procedureDuration: 30,
              status: "notavailable",
            };

            const addedBooking = await addData(`employees/${employeeId}/bookings`, newBookingData);
            const bookingId = addedBooking.id;
            
            await updateDocument(`employees/${employeeId}/bookings`, bookingId, {
              ...newBookingData,
              docID: bookingId,
              personDocID: employeeId,
            });

            console.log(`✅ Created booking for slot ${slotData.hour}`);
          } else if (action === 'delete') {
            const bookingsRef = collection(db, `employees/${employeeId}/bookings`);
            const bookingQuery = query(
              bookingsRef, 
              where("selectedTime", "==", slotData.hour), 
              where("selectedDate", "==", selectedDate.toLocaleDateString("en-CA"))
            );

            const bookingSnapshot = await getDocs(bookingQuery);
            if (!bookingSnapshot.empty) {
              const bookingDoc = bookingSnapshot.docs[0];
              const bookingId = bookingDoc.id;
              await deleteDoc(doc(db, `employees/${employeeId}/bookings`, bookingId));
              console.log(`✅ Deleted booking for slot ${slotData.hour}`);
            }
          }
        } catch (error) {
          console.error(`Error processing change for slot ${slotData.hour}:`, error);
          // Revert the visual change if database operation failed
          revertSlotChange(slotKey, change);
        }
      });

      await Promise.all(changePromises);
      
      // Clear pending changes after processing
      setPendingChanges(new Map());
      
      // Refresh slots to ensure consistency
      await refreshSlots();
      
    } catch (error) {
      console.error("Error processing pending changes:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const revertSlotChange = (slotKey, change) => {
    const { action, originalSlot } = change;
    setSlots(prevSlots => 
      prevSlots.map(slot => 
        slot.hour === originalSlot.hour ? originalSlot : slot
      )
    );
  };

  const addPendingChange = (slotKey, action, slotData, originalSlot) => {
    setPendingChanges(prevChanges => {
      const newChanges = new Map(prevChanges);
      
      // If there's already a pending change for this slot, we need to handle it
      if (newChanges.has(slotKey)) {
        const existingChange = newChanges.get(slotKey);
        
        // If the new action cancels out the existing one, remove the pending change
        if ((existingChange.action === 'create' && action === 'delete') ||
            (existingChange.action === 'delete' && action === 'create')) {
          newChanges.delete(slotKey);
          return newChanges;
        }
      }
      
      // Add or update the pending change
      newChanges.set(slotKey, {
        action,
        slotData,
        originalSlot,
        timestamp: Date.now()
      });
      
      return newChanges;
    });
  };

  const refreshSlots = async () => {
    try {
      const formattedDate = selectedDate.toLocaleDateString("en-CA");
      const data = await fetchBookingData(formattedDate, user.displayName);
      const allSlots = Array.from({ length: 18 }, (_, i) => `${10 + Math.floor(i / 2)}:${(i % 2 === 0 ? '00' : '30')}`);

      const combinedSlots = [];
      const occupiedSlots = new Set();

      allSlots.forEach(hour => {
        if (occupiedSlots.has(hour)) return;

        const booking = data.find(b => b.selectedTime === hour);
        if (booking) {
          const [startHour, startMinute] = hour.split(':').map(Number);
          const procedureDuration = booking.procedureDuration;
          const startMinutes = startHour * 60 + startMinute;
          const endMinutes = startMinutes + procedureDuration;

          for (let t = startMinutes + 30; t < endMinutes; t += 30) {
            const hourStr = `${Math.floor(t / 60)}:${t % 60 === 0 ? '00' : '30'}`;
            occupiedSlots.add(hourStr);
          }

          const endHour = Math.floor(endMinutes / 60);
          const endMinute = endMinutes % 60;
          const endTime = `${endHour}:${endMinute === 0 ? "00" : "30"}`;

          combinedSlots.push({
            hour,
            status: booking.status === 'notavailable' ? 'notavailable' : 'booked',
            booking,
            startTime: hour,
            endTime
          });
        } else {
          combinedSlots.push({ hour, status: 'free' });
        }
      });

      setSlots(combinedSlots);
    } catch (error) {
      console.error("Error refreshing slots:", error);
    }
  };

  const handleDateChange = (newDate) => setSelectedDate(newDate);
  const closeModal = () => setModalBooking(null);

  // Enhanced handleSlotClick with debounced batch updates
  const handleSlotClick = async (slot) => {
    if (slot.status === 'booked') {
      setModalBooking(slot.booking);
      return;
    }

    const slotKey = `${selectedDate.toLocaleDateString("en-CA")}-${slot.hour}`;
    const originalSlot = { ...slot };

    if (slot.status === 'free') {
      // ✅ Instant visual feedback - update UI immediately
      const updatedSlots = slots.map((s) =>
        s.hour === slot.hour 
          ? { ...s, status: 'notavailable', booking: { procedure: "Почивка" } } 
          : s
      );
      setSlots(updatedSlots);

      // ⏳ Add to pending changes for delayed database write
      addPendingChange(slotKey, 'create', slot, originalSlot);
      
    } else if (slot.status === 'notavailable') {
      // ✅ Instant visual feedback - update UI immediately
      const updatedSlots = slots.map((s) =>
        s.hour === slot.hour 
          ? { ...s, status: 'free', booking: null } 
          : s
      );
      setSlots(updatedSlots);

      // ⏳ Add to pending changes for delayed database write
      addPendingChange(slotKey, 'delete', slot, originalSlot);
    }
  };

  const handleBookAllClick = async () => {
    const freeSlots = slots.filter(slot => slot.status === 'free');
    if (freeSlots.length === 0) return;

    try {
      const employees = await getData("employees");
      const employee = employees.find((emp) => emp.name === "Бетина Борилова");
      if (!employee) throw new Error("Employee with the given name not found.");
      const employeeId = employee.docID;

      for (const slot of freeSlots) {
        const newBookingData = {
          name: "Почивка",
          procedure: "Почивка",
          selectedDate: selectedDate.toLocaleDateString("en-CA"),
          selectedTime: slot.hour,
          procedureDuration: 30,
          status: "notavailable",
        };

        const addedBooking = await addData(`employees/${employeeId}/bookings`, newBookingData);
        const bookingId = addedBooking.id;

        await updateDocument(`employees/${employeeId}/bookings`, bookingId, {
          ...newBookingData,
          docID: bookingId,
          personDocID: employeeId,
        });
      }

      await refreshSlots();
    } catch (error) {
      console.error("Error booking all free slots:", error);
    }
  };

  const handleUnbookAllClick = async () => {
    try {
      const employees = await getData("employees");
      const employee = employees.find((emp) => emp.name === "Бетина Борилова");
      if (!employee) throw new Error("Employee with the given name not found.");
      const employeeId = employee.docID;

      const bookings = await getData(`employees/${employeeId}/bookings`);
      const targetDate = selectedDate.toLocaleDateString("en-CA");

      const bookingsToDelete = bookings.filter(
        (booking) =>
          booking.selectedDate === targetDate &&
          booking.name === "Почивка" &&
          booking.status === "notavailable"
      );

      for (const booking of bookingsToDelete) {
        await deleteDoc(doc(db, "employees", employeeId, "bookings", booking.docID));
      }

      await refreshSlots();
    } catch (error) {
      console.error("Error unbooking all slots:", error);
    }
  };

  const fetchPendingBookings = async () => {
    try {
      const pendingData = await fetchPending(user.displayName);
      if (pendingData.length > 0) {
        setPendingBookings(pendingData);
      }
    } catch (error) {
      console.error('Error fetching pending bookings:', error.message);
    }
  };

  const openPending = () => setShowPendingModal(true);

  const handleApproveBooking = async (docID, person) => {
    try {
      await approveBooking(docID, person);
      setPendingBookings(prevBookings => prevBookings.filter(booking => booking.docID !== docID));
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  const handleDenyBooking = async (docID, person) => {
    try {
      await denyBooking(docID, person);
      setPendingBookings(prevBookings => prevBookings.filter(booking => booking.docID !== docID));
      await refreshSlots();

      if (pendingBookings.length <= 1) setShowPendingModal(false);
    } catch (error) {
      console.error('Error denying booking:', error);
    }
  };

  return (
    <div className="calendar-book-container">
      {/* Status indicator for pending changes */}
      {pendingChanges.size > 0 && (
        <div className="pending-changes-indicator" style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: '#007bff',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 1000
        }}>
          {isProcessing ? 'Saving changes...' : `${pendingChanges.size} changes pending`}
        </div>
      )}

      <button
        className="openPendingButton"
        onClick={openPending}
        disabled={pendingBookings.length === 0}
      >
        {pendingBookings.length === 0
          ? "No pending bookings"
          : `You have ${pendingBookings.length} new bookings`}
      </button>

      {showPendingModal && (
        <div className="pending-bookings-modal-overlay">
          <div className="pending-bookings-modal-content">
            <span
              className="calendar-book-close"
              onClick={() => setShowPendingModal(false)}
            >
              ×
            </span>
            <h3>Чакащи часове</h3>
            <div className="pending-bookings-list">
              {pendingBookings.map((pendingBooking) => (
                <div key={pendingBooking.docID}>
                  <p><strong>Име:</strong> {pendingBooking.name}</p>
                  <p><strong>Телефон:</strong> {pendingBooking.phone}</p>
                  <p><strong>Имейл:</strong> {pendingBooking.email}</p>
                  <p><strong>Процедура:</strong> {pendingBooking.procedure}</p>
                  <p><strong>Дата:</strong> {pendingBooking.selectedDate}</p>
                  <p><strong>Час:</strong> {pendingBooking.selectedTime}</p>
                  <p><strong>Бележка:</strong> {pendingBooking.notes}</p>
                  <p><strong>Създадено на:</strong> {pendingBooking.dateCreation}</p>
                  <div className="booking-actions">
                    <button
                      onClick={() =>
                        handleApproveBooking(
                          pendingBooking.docID,
                          pendingBooking.personDocID
                        )
                      }
                    >
                      ПОТВЪРДИ
                    </button>
                    <button
                      onClick={() =>
                        handleDenyBooking(
                          pendingBooking.docID,
                          pendingBooking.personDocID
                        )
                      }
                    >
                      ОТКАЖИ
                    </button>
                  </div>
                  <hr className="solid"></hr>
                </div>
              ))}
            </div>
            <button
              className="calendar-close-button"
              onClick={() => setShowPendingModal(false)}
            >
              Затвори
            </button>
          </div>
        </div>
      )}

      <div className="calendar-container">
        <h2>Изберете дата</h2>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="react-calendar"
        />
      </div>

      <div className="bookings-container">
        <h2>Запазени часове за {selectedDate.toLocaleDateString("bg-BG")}</h2>
        <div>
          <div className="slots-header">
            <h3>Часове:</h3>
            <div className="slots-header-buttons">
              <button
                onClick={handleBookAllClick}
                className="book-all-button"
                disabled={!slots.some((slot) => slot.status === "free")}
              >
                Запази ден
              </button>

              <button
                onClick={handleUnbookAllClick}
                className="unbook-all-button"
                disabled={
                  !slots.some((slot) =>
                    ["booked", "notavailable"].includes(slot.status)
                  )
                }
              >
                Освободи
              </button>
            </div>
          </div>

          <div className="booked-slots-list">
            {slots.map((slot) => {
              if (slot.status === "booked") {
                return (
                  <div
                    key={slot.booking.docID}
                    className={`booked-slot-item booked ${
                      slot.booking.procedure === "Почивка"
                        ? "pochivka-slot"
                        : ""
                    }`}
                    onClick={() => handleSlotClick(slot)}
                  >
                    {slot.booking.procedure !== "Почивка" && (
                      <span>{`${slot.startTime} - ${slot.endTime}`}</span>
                    )}
                    <span>{slot.booking.procedure}</span>
                  </div>
                );
              } else if (slot.status === "notavailable") {
                return (
                  <div
                    key={slot.hour}
                    className="booked-slot-item notavailable"
                    onClick={() => handleSlotClick(slot)}
                  >
                    {slot.hour}
                  </div>
                );
              } else {
                return (
                  <div
                    key={slot.hour}
                    className="booked-slot-item free"
                    onClick={() => handleSlotClick(slot)}
                  >
                    {slot.hour}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>

      {modalBooking && (
        <div className="calendar-book-modal">
          <div className="calendar-book-modal-content">
            <span className="calendar-book-close" onClick={closeModal}>
              ×
            </span>
            <h3>Информация за запазен час</h3>
            <p><strong>Име:</strong> {modalBooking.name}</p>
            <p><strong>Телефон:</strong> {modalBooking.phone}</p>
            <p><strong>Процедура:</strong> {modalBooking.procedure}</p>
            <p><strong>Час:</strong> {modalBooking.selectedTime}</p>
            <p><strong>Статус:</strong> {modalBooking.status}</p>
            <p><strong>Бележки:</strong> {modalBooking.notes || "Няма бележки"}</p>
            <div className="modal-buttons-row">
              <button className="calendar-close-button" onClick={closeModal}>
                Затвори
              </button>
              <button
                className="remove-booking-button"
                onClick={async () => {
                  try {
                    await denyBooking(
                      modalBooking.docID,
                      modalBooking.personDocID
                    );
                    await refreshSlots();
                    closeModal();
                  } catch (error) {
                    console.error("Error removing booking:", error);
                  }
                }}
              >
                Изтрий
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarBook;