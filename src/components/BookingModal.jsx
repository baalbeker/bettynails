import { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./BookingModal.css";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  User,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  FileText,
  CheckCircle,
} from "lucide-react";
import { sendReservationEmail } from "../scripts/sendReservationEmail.js";

const BookingModal = ({ onClose }) => {
  const { addBooking, fetchBookingData } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [procedureDuration, setProcedureDuration] = useState(0);
  const [slots, setSlots] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    procedure: "",
    notes: "",
  });

  const steps = [
    { id: 1, title: "Лични данни", icon: User },
    { id: 2, title: "Процедура", icon: CheckCircle },
    { id: 3, title: "Дата и час", icon: CalendarIcon },
    { id: 4, title: "Потвърждение", icon: FileText },
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await fetchBookingData(selectedDate);

        // Determine if selected date is Saturday (getDay() === 6)
        const dateObj = new Date(selectedDate);
        const isSaturday = dateObj.getDay() === 6;

        // Generate time slots: 10:00–19:00 normally, 10:00–17:00 on Saturday
        const latestHour = isSaturday ? 17 : 19; // 17:00 = last hour for Saturday
        const totalSlots = (latestHour - 10) * 2; // each hour has two 30-minute slots
        const allSlots = Array.from(
          { length: totalSlots },
          (_, i) => `${10 + Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"}`
        );

        const procedureDurationInSlots = Math.floor(procedureDuration / 30);

        const combinedSlots = allSlots.map((hour, index) => {
          const booking = data.find((b) => b.selectedTime === hour);
          if (booking) {
            const bookingDurationInSlots = Math.floor(
              booking.procedureDuration / 30
            );
            const startSlot = index;
            const endSlot = startSlot + bookingDurationInSlots;
            return { hour, status: "booked", booking, startSlot, endSlot };
          } else {
            const slotOccupied = data.some((b) => {
              const startSlot = allSlots.findIndex(
                (slot) => slot === b.selectedTime
              );
              const endSlot = startSlot + Math.floor(b.procedureDuration / 30);
              return index >= startSlot && index < endSlot;
            });

            const canFitProcedure =
              index + procedureDurationInSlots <= allSlots.length &&
              !slotOccupied;

            const procedureFitsInSlots =
              canFitProcedure &&
              allSlots.slice(index, index + procedureDurationInSlots).every(
                (_, i) =>
                  !data.some((b) => {
                    const startSlot = allSlots.findIndex(
                      (slot) => slot === b.selectedTime
                    );
                    const endSlot =
                      startSlot + Math.floor(b.procedureDuration / 30);
                    return index + i >= startSlot && index + i < endSlot;
                  })
              );

            const isBeforeEndOfDay =
              index + procedureDurationInSlots <= allSlots.length;

            return {
              hour,
              status:
                slotOccupied || !procedureFitsInSlots || !isBeforeEndOfDay
                  ? "booked"
                  : "free",
            };
          }
        });

        setSlots(combinedSlots);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (selectedDate) {
      fetchBookings();
    }
  }, [selectedDate, procedureDuration]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const procedureDurations = {
    "Маникюр с гел лак": 90,
    Ноктопластика: 180,
    "Поддръжка на ноктопластика": 150,
    "Френски маникюр": 90,
    "Педикюр гел лак": 90,
    "Спа педикюр": 90,
    "Цялостен педикюр": 90,
    "Изграждане(2 нокътя са 30 минути)": 30,
    "Гел върху естествени нокти": 120,
    "Гел лак + укрепване с гел": 120,
    "Сваляне на гел лак/ноктопластика": 30,
  };

  const procedurePrices = {
    "Маникюр с гел лак": "45 лв",
    Ноктопластика: "80лв+",
    "Поддръжка на ноктопластика": "55лв+",
    "Френски маникюр": "55 лв",
    "Педикюр гел лак": "45 лв",
    "Спа педикюр": "65лв",
    "Цялостен педикюр": "55 лв",
    "Изграждане(2 нокътя са 30 минути)": "15лв",
    "Гел върху естествени нокти": "55лв+",
    "Гел лак + укрепване с гел": "55лв+",
    "Сваляне на гел лак/ноктопластика": "15лв",
  };

  // Define pedicure procedures
  const pedicureProcedures = [
    "Педикюр гел лак",
    "Спа педикюр",
    "Цялостен педикюр"
  ];

  // Check if a procedure is a pedicure
  const isPedicure = (procedure) => {
    return pedicureProcedures.includes(procedure);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "procedure" && procedureDurations[value]) {
      setProcedureDuration(procedureDurations[value]);
    }
  };

  const handleDateSelect = (date) => {
    const formattedDate = date.toLocaleDateString("en-CA");
    if (formattedDate !== selectedDate) {
      setSelectedTime(null);
    }
    setSelectedDate(formattedDate);
  };

  const handleTimeSelect = (time) => setSelectedTime(time);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.procedure ||
      !selectedDate ||
      !selectedTime
    ) {
      alert("Моля, попълнете всички задължителни полета.");
      return;
    }

    const reservation = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      person: "Бетина Борилова",
      procedure: formData.procedure,
      selectedDate,
      selectedTime,
      procedureDuration,
      notes: formData.notes || "–",
    };
    console.log("Adding Booking");
    addBooking(reservation);
    console.log("Sending reservation email with data:", reservation);

    sendReservationEmail(reservation)
      .then(() => {
        setShowSuccessPopup(true); // show popup
        setTimeout(() => {
          setShowSuccessPopup(false); // hide after 3 seconds
          onClose(); // close modal
        }, 3000);
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
        alert("Възникна грешка при изпращането на имейла. Опитайте отново.");
      });
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.phone && formData.email;
      case 2:
        return formData.procedure;
      case 3:
        return selectedDate && selectedTime;
      default:
        return true;
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      transition: { duration: 0.2 },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="modal-header">
            <h2>Запишете час онлайн</h2>
            <motion.button
              className="close-button"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Progress Steps */}
          <div className="steps-container">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`step ${currentStep >= step.id ? "active" : ""} ${
                  currentStep === step.id ? "current" : ""
                }`}
              >
                <div className="step-number">
                  <step.icon size={20} />
                </div>
                <span className="step-title">{step.title}</span>
                {index < steps.length - 1 && <div className="step-line" />}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="form-container">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="form-step"
                >
                  <h3>Лични данни</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <User size={18} />
                        Име и фамилия <span>*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Въведете име и фамилия"
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        <Phone size={18} />
                        Телефон <span>*</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        // placeholder="0000 000 000"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>
                        <Mail size={18} />
                        Имейл <span>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@example.com"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="form-step"
                >
                  <h3>Изберете процедура</h3>
                  <div className="procedures-grid">
                    {Object.entries(procedureDurations).map(
                      ([procedure, duration]) => {
                        const isPedicureProcedure = isPedicure(procedure);
                        
                        return (
                          <motion.div
                            key={procedure}
                            className={`procedure-card ${
                              formData.procedure === procedure && !isPedicureProcedure ? "selected" : ""
                            } ${isPedicureProcedure ? "disabled" : ""}`}
                            onClick={() => {
                              if (!isPedicureProcedure) {
                                handleChange({
                                  target: { name: "procedure", value: procedure },
                                });
                              }
                            }}
                            whileHover={!isPedicureProcedure ? { scale: 1.02 } : {}}
                            whileTap={!isPedicureProcedure ? { scale: 0.98 } : {}}
                            style={{
                              cursor: isPedicureProcedure ? "default" : "pointer",
                              position: "relative",
                            }}
                          >
                            {isPedicureProcedure ? (
                              <>
                                <div 
                                  className="disabled-overlay"
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                                    zIndex: 1,
                                    pointerEvents: "none"
                                  }}
                                />
                                <div className="pedicure-disabled-content" style={{ position: "relative", zIndex: 2 }}>
                                  <div className="procedure-header">
                                    <h4>{procedure}</h4>
                                    <span className="price">
                                      {procedurePrices[procedure]}
                                    </span>
                                  </div>
                                  <div className="procedure-meta">
                                    <span className="duration">
                                      <Clock size={16} />
                                      {duration} мин
                                    </span>
                                  </div>
                                  <div className="disabled-message" style={{ marginTop: "8px" }}>
                                    <span>Обади се за запазване на час</span>
                                  </div>
                                  <motion.button
                                    className="call-button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      window.location.href = "tel:0898754518";
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                      backgroundColor: "#28a745",
                                      color: "white",
                                      border: "none",
                                      borderRadius: "4px",
                                      padding: "8px 12px",
                                      fontSize: "12px",
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      position: "relative",
                                      zIndex: 10,
                                      marginTop: "8px",
                                      width: "100%",
                                      justifyContent: "center"
                                    }}
                                  >
                                    <Phone size={14} />
                                    Обади се
                                  </motion.button>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="procedure-header">
                                  <h4>{procedure}</h4>
                                  <span className="price">
                                    {procedurePrices[procedure]}
                                  </span>
                                </div>
                                <div className="procedure-meta">
                                  <span className="duration">
                                    <Clock size={16} />
                                    {duration} мин
                                  </span>
                                </div>
                              </>
                            )}
                          </motion.div>
                        );
                      }
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="form-step"
                >
                  <h3>Дата и час</h3>
                  <div className="calendar-time-container">
                    <div className="calendar-container">
                      <Calendar
                        onChange={handleDateSelect}
                        value={selectedDate ? new Date(selectedDate) : null}
                        locale="bg-BG"
                        minDate={new Date()}
                        tileDisabled={({ date }) => {
                          const today = new Date();
                          return (
                            date.getDay() === 0 || // Sunday
                            date.toDateString() === today.toDateString() // Today
                          );
                        }}
                      />
                    </div>
                    {selectedDate && (
                      <motion.div
                        className="time-slots-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h4>Избери час:</h4>
                        <div className="time-slots">
                          {slots.map((slot) => (
                            <motion.button
                              key={slot.hour}
                              className={`time-slot ${slot.status} ${
                                slot.hour === selectedTime ? "selected" : ""
                              }`}
                              onClick={() =>
                                slot.status === "free" &&
                                handleTimeSelect(slot.hour)
                              }
                              disabled={slot.status === "booked"}
                              whileHover={
                                slot.status === "free" ? { scale: 1.05 } : {}
                              }
                              whileTap={
                                slot.status === "free" ? { scale: 0.95 } : {}
                              }
                            >
                              {slot.hour}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="form-step"
                >
                  <h3>Потвърждение</h3>
                  <div className="confirmation-details">
                    <div className="detail-item">
                      <User size={18} />
                      <span>Име: {formData.name}</span>
                    </div>
                    <div className="detail-item">
                      <Phone size={18} />
                      <span>Телефон: {formData.phone}</span>
                    </div>
                    <div className="detail-item">
                      <Mail size={18} />
                      <span>Имейл: {formData.email}</span>
                    </div>
                    <div className="detail-item">
                      <CheckCircle size={18} />
                      <span>Процедура: {formData.procedure}</span>
                    </div>
                    <div className="detail-item">
                      <CalendarIcon size={18} />
                      <span>Дата: {selectedDate}</span>
                    </div>
                    <div className="detail-item">
                      <Clock size={18} />
                      <span>Час: {selectedTime}</span>
                    </div>
                    <div className="detail-item">
                      <span className="price-total">
                        Цена: {procedurePrices[formData.procedure]}
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      <FileText size={18} />
                      Бележка към часа
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Ако желаете да добавите нещо"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Buttons */}
          <div className="modal-footer">
            {currentStep > 1 && (
              <motion.button
                type="button"
                className="btn-secondary"
                onClick={handlePrev}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Назад
              </motion.button>
            )}

            {currentStep < 4 ? (
              <motion.button
                type="button"
                className="btn-primary"
                onClick={handleNext}
                disabled={!canProceedToNext()}
                whileHover={{ scale: canProceedToNext() ? 1.02 : 1 }}
                whileTap={{ scale: canProceedToNext() ? 0.98 : 1 }}
              >
                Напред
              </motion.button>
            ) : (
              <motion.button
                type="button"
                className="btn-confirm"
                onClick={handleSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Потвърди резервация
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            className="success-popup"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
          >
            <CheckCircle size={28} color="green" />
            <span>Успешно запазихте час. Очаквайте да се свържем с вас!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default BookingModal;