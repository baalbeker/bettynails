import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { emailLogin, emailSignUp } from "../firebase/functions";
import './Login.css';

const Login = () => {
  const { setUser } = useContext(AuthContext);  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");  
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const validateEmail = () => {
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setError("Password must contain at least one letter and one number.");
      return false;
    }
    return true;
  };

  const handleEmailLogin = async () => {
    if (validateEmail()) {
      setError("");  
      try {
        const result = await emailLogin(email, password);
        setUser(result);  
      } catch (error) {
        setError(error.message);  
      }
    }
  };

  const handleEmailSignUp = async () => {
    if (validateEmail() && validatePassword()) {
      setError(""); 
      const newUser = await emailSignUp(email, password, name);
      if (newUser) {
        setUser(newUser);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (isSignUp) {
      handleEmailSignUp();
    } else {
      handleEmailLogin();
    }
  };

  return (
    <div className="login-container">
        <div className="login-form">
          <h3>{isSignUp ? "Регистрация" : "Влизане"}</h3>

          <form onSubmit={handleSubmit}>
            <div>
              {isSignUp && (
                <input
                  type="text"
                  placeholder="Име"
                  value={name}
                  onChange={(e) => setName(e.target.value)}  
                />
              )}
              <input
                type="email"
                placeholder="Имейл"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"  
              />
              <input
                type="password"
                placeholder="Парола"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"  
              />
              {error && <div className="error-message">{error}</div>}
              {isSignUp && (
                <p className="password-requirements">
                  Паролата трябва да е с дължина поне 8 знака и да включва поне една буква и една цифра.
                </p>
              )}
              <button type="submit" className="submit-btn">
                {isSignUp ? "Регистрация" : "Напред"}
              </button>
            </div>
          </form>

          {/* <button className="google-login" onClick={handleGoogleLogin}>
            Sign in with Google
          </button> */}
          <button className="toggle-btn" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp
              ? "Имате профил? Влезте"
              : "Нямате профил? Регистрация"}
          </button>
        </div>
    </div>
  );
};

export default Login;
