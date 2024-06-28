import React from 'react';

import '../css/LoadingOverlay.css';


const LoadingOverlay = ({ isActive }) => {
  return (
    isActive && (
      <div className="LoadingOverlay">
        <div className="LoadingOverlay__Spinner"></div>
      </div>
    )
  );
};

export default LoadingOverlay;
