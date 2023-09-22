import React, { useState } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error, errorInfo) => {
   
    setHasError(true);
  };

  return hasError ? (
    <div>
      <h2>Something went wrong. Please try again later.</h2>
    </div>
  ) : (
    children
  );
};

export default ErrorBoundary;
