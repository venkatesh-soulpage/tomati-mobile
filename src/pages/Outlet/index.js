import React from "react";
// Redux
import { connect } from "react-redux";
import * as Action from "_actions";
// Router
import { withRouter, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import Currency from "assets/images/ngn_currency.svg";
import _ from "lodash";

const Index = (props) => {
  const [state, setState] = React.useState({
    showMenu: false,
    menu_category: null,
    product_category: null,
    outlet_category: null,
    currentLevel: "level1",
  });
  //get query parameters
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  const {
    showMenu,
    menu_category,
    product_category,
    outlet_category,
    currentLevel,
  } = state;
  const { outlet } = props.outlet;
  React.useEffect(() => {
    props.dispatch(Action.getUserData());
  }, []);
  //get menu
  React.useEffect(() => {
    props.dispatch(Action.getOutlet(query.get("outlet_venue")));
  }, [props?.auth?.userData]);

  const {
    name,
    description,
    menu,
    cover_image,
    location,
    phone_number,
    logo_img,
  } = outlet;

  // Outlet Menu Category
  const outlet_menu = _.without(
    _.map(_.uniqBy(menu, "outlet_category"), "outlet_category"),
    "",
    null
  );

  if (!outlet_menu.length > 0 && currentLevel === "level1") {
    setState({ currentLevel: "level2" });
  }

  // Product Menu Category
  let product_menu = _.without(
    _.map(_.uniqBy(menu, "product_category"), "product_category"),
    "",
    null
  );

  if (outlet_menu) {
    const items = _.filter(menu, { outlet_category });

    product_menu = _.without(
      _.map(_.uniqBy(items, "product_category"), "product_category"),
      "",
      null
    );
  }

  let filtered_menu = menu;

  // Filtering Categories
  if (product_category && outlet_category) {
    filtered_menu = _.filter(menu, { product_category, outlet_category });
  } else if (product_category && !outlet_category) {
    filtered_menu = _.filter(menu, { product_category });
  } else if (!product_category && outlet_category) {
    filtered_menu = _.filter(menu, { outlet_category });
  }

  let items_list = filtered_menu;

  if (menu_category) {
    items_list = _.filter(filtered_menu, { product_category, menu_category });
  }

  if (!outlet) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "100vh", backgroundColor: "#030303" }}>
      {outlet?.is_venue_active ? (
        <div>
          {cover_image ? (
            <>
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
            </>
          ) : (
            <div>No Image</div>
          )}
          <div style={{ padding: "10px", backgroundColor: "#030303" }}>
            <div className="heading-style">{name}</div>

            {!showMenu ? (
              <>
                {/* <div style={{ color: "#fff" }}>{location.name}</div> */}

                <hr className="hr" />
                <p
                  style={{
                    marginBottom: "30px",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  {description}
                </p>

                <Button
                  className="btn-v"
                  onClick={() =>
                    setState((state) => ({
                      ...state,
                      showMenu: true,
                      currentLevel: "level1",
                    }))
                  }
                  block
                >
                  View Menu
                </Button>
              </>
            ) : (
              <>
                <div style={{ width: "100%", display: "block" }}>
                  {currentLevel === "level1" ? (
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
                  ) : currentLevel === "level2" ? (
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
                  ) : currentLevel === "level3" ? (
                    <div>
                      <div className="w-100">
                        <div className="tag-group">
                          {_.without(
                            _.map(
                              _.uniqBy(filtered_menu, "menu_category"),
                              "menu_category"
                            ),
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
                          const inputRef = React.createRef();

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
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>Menu is inactive. Please contact restaurant manager</div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return { auth: state.auth, outlet: state.outlet };
}

export default withRouter(connect(mapStateToProps)(Index));
