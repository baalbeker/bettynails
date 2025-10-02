import { createContext, useState, useEffect } from "react";
import { emailLogin, emailSignUp, logout, fetchBookingData, addBooking, approveBooking,addData, denyBooking, fetchPending,updateDocument,deleteOldBookings } from "../firebase/functions";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(
        firebaseUser
          ? {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
            }
          : null
      );

      if (firebaseUser) {
        // Check if the welcome message has been shown before
        const welcomeShown = localStorage.getItem("welcomeShown");

        if (!welcomeShown) {
          setShowWelcome(true);
          localStorage.setItem("welcomeShown", "true");
          setTimeout(() => {
            setShowWelcome(false);
          }, 2000);
        }
      } else {
        setShowWelcome(false);
        localStorage.removeItem("welcomeShown"); // Clear the flag on logout
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    setShowWelcome(false);
    localStorage.removeItem("welcomeShown"); // Clear the flag on logout
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      showWelcome,
      setShowWelcome,
      emailLogin,
      emailSignUp,
      logout: handleLogout,
      fetchBookingData,
      addBooking,
      approveBooking,
      denyBooking,
      fetchPending,
      addData,
      updateDocument,
      deleteOldBookings,
    }}>
      {children}
    </AuthContext.Provider>
  );
};