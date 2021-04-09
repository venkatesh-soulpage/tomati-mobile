import React from "react";
import { Button } from "react-bootstrap";

const Level1 = ({ outlet_menu, setState, state }) => {
  return (
    <div className="mt-3">
      <p>
        {outlet_menu.map((item, index) => (
          <Button
            key={index}
            className="btn-white w-100 mt-2"
            onClick={() => {
              setState((state) => ({
                ...state,
                outlet_category: item,
                currentLevel: "level2",
              }));
            }}
          >
            {item}
          </Button>
        ))}
      </p>
    </div>
  );
};

export default Level1;
