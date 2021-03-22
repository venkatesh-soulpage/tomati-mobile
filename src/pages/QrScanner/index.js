import React from "react";
import QrReader from "react-qr-reader";

const index = (props) => {
  const handleScan = (data) => {
    if (data) {
      //   console.log(data.slice(4));
      window.location.href = data.slice(4);
    }
  };
  const handleError = (data) => {
    console.log(data);
  };
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
