import React from 'react';
import '../styles/UserDetails.css';
const UserDetails = ({ userDetails, setUserDetails, formError, handleContinue }) => {
  return (
    <div className="user-details">
      <h2>Enter Your Details</h2>
      <input
        type="text"
        placeholder="Name"
        value={userDetails.name}
        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={userDetails.email}
        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
      />
      {formError && <p className="error-message">{formError}</p>}
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default UserDetails;
