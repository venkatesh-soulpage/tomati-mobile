import React from "react";
import { Button } from "react-bootstrap";

const Level2 = ({ product_menu, setState, state }) => {
  return (
    <div>
      <p>
        {product_menu.map((item, index) => (
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
            appearance="default"
            onClick={() =>
              setState((state) => ({
                ...state,
                product_category: item,
                currentLevel: "level3",
              }))
            }
          >
            {item}
          </Button>
        ))}
        <Button
          appearance="primary"
          style={{
            width: "100%",
            marginTop: "10px",
          }}
          onClick={() =>
            setState((state) => ({
              ...state,
              menu_category: null,
              product_category: null,
              outlet_category: null,
              currentLevel: "level1",
            }))
          }
        >
          Back
        </Button>
      </p>
    </div>
  );
};

export default Level2;
