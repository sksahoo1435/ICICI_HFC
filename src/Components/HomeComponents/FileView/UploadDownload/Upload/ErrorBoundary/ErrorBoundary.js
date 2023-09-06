import React, { useState } from 'react';

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    const handleCatch = (error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo);
        setHasError(true);
    };

    if (hasError) {
        return <div>Oops! Something went wrong. Please try again later.</div>;
    }

    return (
        <>
            {React.Children.map(children, child =>
                React.cloneElement(child, {
                    onError: handleCatch,
                })
            )}
        </>
    );
};

export default ErrorBoundary;
