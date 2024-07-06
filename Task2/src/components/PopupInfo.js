// PopupInfo.js
import React from 'react';

function PopupInfo({ onContinue, onExit }) {
  return (
    <div className="popup-info active">
      <h2>Information Popup</h2>
      <button className="continue-btn" onClick={onContinue}>Continue</button>
      <button className="exit-btn" onClick={onExit}>Exit</button>
    </div>
  );
}

export default PopupInfo;
