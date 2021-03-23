import React from "react";
import { Button } from "react-bootstrap";
import _ from "lodash";

const Level3 = ({
  filtered_menu,
  menu_category,
  setState,
  state,
  items_list,
}) => {
  return (
    <div>
      <div className="w-100">
        <div className="tag-group">
          {_.without(
            _.map(_.uniqBy(filtered_menu, "menu_category"), "menu_category"),
            "",
            null
          ).map((item, index) => (
            <>
              <Button
                key={index}
                style={
                  item === menu_category
                    ? {
                        backgroundColor: "#3498ff",
                        color: "#fff",
                        borderRadius: "42px",
                        marginRight: "10px",
                        fontWeight: "bold",
                      }
                    : {
                        borderRadius: "42px",
                        marginRight: "10px",
                        fontWeight: "bold",
                        color: "#575757",
                        background: "#e5e5ea",
                        border: "1px solid #e5e5ea",
                      }
                }
                appearance="default"
                onClick={() =>
                  item !== menu_category
                    ? setState((state) => ({
                        ...state,
                        menu_category: item,
                      }))
                    : setState((state) => ({
                        ...state,
                        menu_category: null,
                      }))
                }
              >
                {item}
              </Button>
            </>
          ))}
        </div>
      </div>
      <Button
        appearance="primary"
        style={{
          width: "100%",
          borderRadius: "0px",
          zIndex: "0",
          marginTop: "10px",
        }}
        onClick={() =>
          setState((state) => ({
            ...state,
            menu_category: null,
            product_category: null,
            currentLevel: "level2",
          }))
        }
      >
        Back
      </Button>
      <div
        style={{
          backgroundColor: "#030303",
          paddingBottom: "30px",
        }}
      >
        {items_list.map((item, index) => {
          return (
            <div className="menu-div" key={index}>
              <div>
                <div className="text-style">{item.name}</div>

                <div
                  className="text-style2"
                  size="13px"
                  color="#ffffff"
                  weight="normal"
                >
                  {item.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Level3;
