import React from "react";
import { Button } from "react-bootstrap";

const Level1 = ({ outlet_menu, setState, state }) => {
  return (
    <div>
      <p>
        {outlet_menu.map((item, index) => (
          <Button
            key={index}
            style={{
              width: "100%",
              fontWeight: "bold",
              margin: "2px",
              marginTop: "10px",
              color: "#575757",
              background: "#e5e5ea",
              border: "1px solid #e5e5ea",
            }}
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
