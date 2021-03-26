import React from "react";

const CoverImage = ({ cover_image, logo_img, name }) => {
  return (
    <div>
      <img alt={name} className="w-100 cover-image-style" src={cover_image} />
      <img
        alt={name}
        className="logo-img-style p-1"
        style={{
          top: 125,
          left: 25,
        }}
        height="100px"
        width="100px"
        src={logo_img}
      />
      <div className="ellipse">
        <div
          className="heading-style w-50"
          style={{
            top: 150,
            left: 150,
            backdropFilter: "brightness(20%)",
          }}
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default CoverImage;
