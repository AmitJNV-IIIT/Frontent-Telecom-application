import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ExcitelRoutes from './routes/ExcitelRoutes';
import { ErrorBoundary } from 'react-error-boundary';
import ServiceUnavailable from './components/Common/ServiceUnavailable/ServiceUnavailable';
import ResourceHints from './constants/Constants';
// import ServiceUnavailable from "./components/Common/ServiceUnavailable/ServiceUnavailable";

function App() {
  function handleError(error, info) {
    console.error('Logging to my error reporting service: ', error, info);
  }
  const MyFallbackComponent = () => {
    return (
      <div role="alert">
        <ServiceUnavailable />
      </div>
    );
  };
  return (
    <>
      <ErrorBoundary
        FallbackComponent={MyFallbackComponent}
        onError={handleError}
      >
        <ResourceHints />
        <ExcitelRoutes />
        <ToastContainer />
      </ErrorBoundary>
    </>
  );
}

export default App;
