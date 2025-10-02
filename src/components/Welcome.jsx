import './Welcome.css';

const Welcome = ({ userName }) => {
  return (
    <div className="welcome-message">
      <p>Welcome {userName}!</p>
    </div>
  );
};

export default Welcome;
