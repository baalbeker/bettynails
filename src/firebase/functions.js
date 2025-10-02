import { db, auth, storage } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

export const addData = async (collectionName, data) => {
  const colRef = collection(db, collectionName);
  return await addDoc(colRef, data);
};
export const getData = async (collectionName) => {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
export const getDocument = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};
export const updateDocument = async (collectionName, docId, updateData) => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, updateData);
};
export const uploadFile = async (path, file) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export const emailLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    localStorage.setItem("idToken", idToken);
    return user;
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw new Error(error.message || "An unknown error occurred");
  }
};

export const emailSignUp = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName });

    const userDocRef = doc(db, "employees", user.uid);
    await setDoc(userDocRef, {
      name: displayName,
      email: email,
      docID: user.uid,
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Error signing up with email:", error.message);
    throw new Error(error.message || "An unknown error occurred");
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("idToken");
    window.location.href = "/";
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};

export const fetchBookingData = async (date) => {
  try {
    const q = query(
      collection(db, "employees"),
      where("name", "==", "Бетина Борилова")
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error("Employee not found");
    }
    const employeeId = querySnapshot.docs[0].id;
    const bookingsRef = collection(db, `employees/${employeeId}/bookings`);
    const bookingQuery = query(bookingsRef, where("selectedDate", "==", date));
    const bookingsSnapshot = await getDocs(bookingQuery);
    const bookedSlots = bookingsSnapshot.docs.map((doc) => doc.data());
    return bookedSlots;
  } catch (error) {
    console.error("Error fetching booking data:", error.message);
    throw error;
  }
};

export const fetchPending = async (user) => {
  try {
    const q = query(collection(db, "employees"), where("name", "==", user));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error("No such user found");
    }
    const employeeId = querySnapshot.docs[0].id;
    const bookingsRef = collection(db, `employees/${employeeId}/bookings`);
    const bookingQuery = query(bookingsRef, where("status", "==", "pending"));

    const bookingsSnapshot = await getDocs(bookingQuery);
    const bookedSlots = bookingsSnapshot.docs.map((doc) => doc.data());
    return bookedSlots;
  } catch (error) {
    console.error("Error fetching pending bookings:", error.message);
    throw error;
  }
};

export const addBooking = async (bookingData) => {
  const {
    name,
    phone,
    email,
    procedure,
    notes,
    selectedDate,
    selectedTime,
    procedureDuration,
  } = bookingData;
  const formatDateTime = (date) => {
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const HH = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}-${MM}-${dd} ${HH}:${mm}`;
  };
  const booking = {
    name,
    phone,
    email,
    procedure,
    notes,
    selectedDate,
    selectedTime,
    procedureDuration,
    status: "pending",
    dateCreation: formatDateTime(new Date()),
  };

  try {
    const employees = await getData("employees");
    const employee = employees.find((emp) => emp.name === "Бетина Борилова");
    if (!employee) throw new Error("Employee with the given name not found.");
    const employeeId = employee.docID;
    const addedBooking = await addData(
      `employees/${employeeId}/bookings`,
      booking
    );
    const bookingId = addedBooking.id;
    await updateDocument(`employees/${employeeId}/bookings`, bookingId, {
      ...booking,
      docID: bookingId,
      personDocID: employeeId,
    });
  } catch (error) {
    console.error("Error adding booking:", error.message);
    throw error;
  }
};

export const approveBooking = async (bookingId, employeeId) => {
  try {
    const booking = await getDocument(
      `employees/${employeeId}/bookings`,
      bookingId
    );
    if (!booking) throw new Error("Booking not found");
    await updateDocument(`employees/${employeeId}/bookings`, bookingId, {
      status: "approved",
    });
  } catch (error) {
    console.error("Error approving booking:", error.message);
    throw error;
  }
};

export const denyBooking = async (bookingId, employeeId) => {
  try {
    const booking = await getDocument(
      `employees/${employeeId}/bookings`,
      bookingId
    );
    if (!booking) throw new Error("Booking not found");
    await deleteDoc(doc(db, `employees/${employeeId}/bookings`, bookingId));
  } catch (error) {
    console.error("Error denying (deleting) booking:", error.message);
    throw error;
  }
};

export const deleteOldBookings = async (employeeId) => {
  try {
    const now = new Date();
    const threeDaysAgo = new Date(now.setDate(now.getDate() - 3));
    const formattedLimit = threeDaysAgo.toISOString().split("T")[0]; // "YYYY-MM-DD"

    const bookingsRef = collection(db, `employees/${employeeId}/bookings`);
    const snapshot = await getDocs(bookingsRef);

    const oldBookings = snapshot.docs.filter(docSnap => {
      const data = docSnap.data();
      return data.selectedDate && data.selectedDate < formattedLimit;
    });

    for (const bookingDoc of oldBookings) {
      await deleteDoc(doc(db, `employees/${employeeId}/bookings`, bookingDoc.id));
    }

    return oldBookings.length;
  } catch (error) {
    console.error("Error deleting old bookings:", error);
    throw error;
  }
};
