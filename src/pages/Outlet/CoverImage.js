import React from "react";

const CoverImage = ({ cover_image, logo_img, name }) => {
  return (
    <div>
      <img
        alt={name}
        style={{
          maxWidth: "100%",
          minHeight: "250px",
          width: "100%",
        }}
        src={cover_image}
      />
      <img
        alt={name}
        style={{
          height: "100px",
          width: "100px",
          top: 125,
          left: 25,
          zIndex: 999,
          position: "absolute",
          borderRadius: "50%",
          padding: 3,
          background: "#fff",
        }}
        src={logo_img}
      />
      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <div
          className="heading-style"
          style={{
            height: "auto",
            width: "200px",
            top: 150,
            left: 150,
            zIndex: 999,
            position: "absolute",
            backdropFilter: "brightness(20%)",
            overflow: "inherit",
            textOverflow: "inherit",
          }}
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default CoverImage;
