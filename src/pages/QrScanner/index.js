import React from "react";
import QrReader from "react-qr-reader";
import AlertMessage from "components/AlertMessage";
import { Alert } from "react-bootstrap";

const Index = (props) => {
  const [error, setError] = React.useState(false);
  const handleScan = (data) => {
    //redirection after scanning qr code
    if (data) {
      window.location.href = data.split(" ")[1];
    }
  };
  const handleError = () => {
    setError(true);
  };
  return (
    <div>
      <Alert variant="info" className="mb-0 mt-3">
        Place the code near the camera
      </Alert>
      <QrReader
        delay={300}
        onError={() => handleError()}
        onScan={(data) => handleScan(data)}
        className="w-100"
      />
      {error && (
        <AlertMessage
          variant="danger"
          error={
            error && {
              message:
                "If you are experiencing issues please try to change to Safari on iOS or your Native Web browser",
            }
          }
          onDismiss={() => setError(false)}
        />
      )}
    </div>
  );
};

export default Index;
