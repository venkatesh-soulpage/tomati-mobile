import React from "react";
import QrReader from "react-qr-reader";

const index = (props) => {
  const handleScan = (data) => {
    //redirection after scanning qr code
    if (data) {
      window.location.href = data.split(" ")[1];
    }
  };
  const handleError = (data) => {};
  return (
    <div>
      <QrReader
        delay={300}
        onError={(data) => handleError(data)}
        onScan={(data) => handleScan(data)}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default index;
