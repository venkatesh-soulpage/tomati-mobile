import React from "react";
import { Button } from "react-bootstrap";

const Level2 = ({ product_menu, setState, state }) => {
  return (
    <div>
      <p>
        {product_menu.map((item, index) => (
          <Button
            key={index}
            className="btn-white w-100 mt-2"
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
          className="w-100 mt-3 btn-danger"
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
