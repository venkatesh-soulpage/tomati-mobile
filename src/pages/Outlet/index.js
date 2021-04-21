import React from "react";
// Redux
import { connect } from "react-redux";
import * as Action from "_actions";
// Router
import { withRouter, useLocation } from "react-router-dom";
import _ from "lodash";
import CoverImage from "./CoverImage";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Loading from "components/Loading";
import Header from "components/Header";
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
  //get menu
  React.useEffect(() => {
    props.dispatch(Action.getOutlet(query.get("outlet_venue")));
  }, []);
  const { outlet } = props.outlet;
  if (props?.outlet?.error) {
    return <div>Invalid Venue</div>;
  }
  if (props?.outlet?.isFetching || !outlet) {
    return <Loading textSecondary={true} />;
  }
  const { name, description, menu, cover_image, logo_img, location } = outlet;
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
  if (outlet_menu.length > 0) {
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
  return (
    <div className="outlet-style black-background ">
      <div>
        {cover_image ? (
          <>
            <CoverImage
              cover_image={cover_image}
              logo_img={logo_img}
              name={name}
            />
          </>
        ) : (
          <div className="no-image">No Image</div>
        )}
        <div>
          <div className="hamburger">
            <Header />
          </div>
          <div className="p-2">
            {!showMenu ? (
              <>
                <div className="text-white mt-3">{location.name}</div>
                <hr className="hr" />
                <p className="description-style">{description}</p>
                <button
                  className="btn btn-v"
                  onClick={() => {
                    if (outlet?.is_venue_active) {
                      if (!filtered_menu[0].outlet_category) {
                        setState((state) => ({
                          ...state,
                          showMenu: true,
                          outlet_category: null,
                          currentLevel: "level2",
                        }));
                      } else {
                        setState((state) => ({
                          ...state,
                          showMenu: true,
                          currentLevel: "level1",
                        }));
                      }
                    }
                  }}
                >
                  {outlet?.is_venue_active ? (
                    <span>View Menu</span>
                  ) : (
                    <p className="m-0 lh-1">
                      Inactive Menu
                      <br />
                      <small>Please contact restaurant manager</small>
                    </p>
                  )}
                </button>
              </>
            ) : (
              <>
                <div className="d-block w-100">
                  {
                    {
                      level1: (
                        <Level1
                          outlet_menu={outlet_menu}
                          setState={setState}
                          state={state}
                        />
                      ),
                      level2: (
                        <Level2
                          product_menu={product_menu}
                          setState={setState}
                          state={state}
                        />
                      ),
                      level3: (
                        <Level3
                          filtered_menu={filtered_menu}
                          menu_category={menu_category}
                          setState={setState}
                          state={state}
                          items_list={items_list}
                        />
                      ),
                    }[currentLevel]
                  }
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return { auth: state.auth, outlet: state.outlet };
}
export default withRouter(connect(mapStateToProps)(Index));
