import React from "react";
import { Button } from "react-bootstrap";
import _ from "lodash";
import Currency from "assets/images/ngn_currency.svg";

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
                className={
                  item === menu_category
                    ? "btn-blue-filter"
                    : "btn-white-filter"
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
        className="w-100 mt-3"
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
      <div className="menu-style">
        {items_list.map((item, index) => {
          return (
            <div className="menu-div" key={index}>
              <div>
                <div className="text-style">{item.name}</div>

                <div className="text-style2">{item.description}</div>
              </div>
              <div>
                <img alt="Currency" src={Currency} className="currency-style" />
                <span className="menu-item-style"> {item.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Level3;
