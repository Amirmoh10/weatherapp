import React, { useContext } from "react";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import DispatchContext from "../dispatchContext";
import StateContext from "../stateContext";

import { ACTION } from "../App";

import "../App.css";

// const imageBackGround = {
//   backgroundPosition: "center",
//   backgroundSize: "cover",
//   backgroundRepeat: "no-repeat",
//   width: "115%",
//   marginBottom: "33px",
// };



const imageStyle = {
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "234px",
  width: "202px",
};

const exploreIconStyle = {
  position: "relatiove",
  right: "40%",
};

function SideNav() {
  const sideNavDispatch = useContext(DispatchContext);
  const sideNavState = useContext(StateContext);

  function onChange(event) {
    sideNavDispatch({
      type: ACTION.PLACE_TYPING,
      value: event.target.value,
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    sideNavDispatch({
      type: ACTION.PLACE_SUBMITT,
    });
  }

  return (
    <div className="sideNav">
      <div className="sideNavHeader">
        <form className="sideNavSearchForm" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Seach for places"
            className="searchInput"
            value={`${sideNavState.typedPlace}`}
            onChange={onChange}
          />
        </form>
        
      </div>


      {sideNavState.placeData[0] ? (
        <div>
          <div className="weatherTypeImage">
            <img
              alt=""
              src={require(`../img/${sideNavState.placeData[0].weather_state_name}.png`)}
              style={imageStyle}
            />
          </div>
          <div className="tempDateLocInfoBox">
            <div className="temperatureBox">
              <span className="temperatureText">
                {sideNavState.placeData[0].the_temp.toFixed(0)}
              </span>
              <span className="temperatureIcon">℃</span>
            </div>
            <div>
              <p className="weatherType">
                {sideNavState.placeData[0].weather_state_name}
              </p>
            </div>

            <div className="dateLocationBox">
              <div className="dateBox">
                <TempDate date={sideNavState.placeData[0].applicable_date} />
                <span>•</span>
                <p>
                  <span className="todayTempWeekDay">
                    {new Date(sideNavState.placeData[0].applicable_date)
                      .toDateString()
                      .slice(0, 3)}
                    ,
                  </span>
                  <span className="todayTempNumberDay">
                    {new Date(sideNavState.placeData[0].applicable_date)
                      .toDateString()
                      .slice(8, 10)}
                  </span>
                  <span>
                    {new Date(sideNavState.placeData[0].applicable_date)
                      .toDateString()
                      .slice(4, 7)}
                  </span>
                </p>
              </div>
            </div>
            <div className="locationBox">
              <LocationOnRoundedIcon style={exploreIconStyle} />
              <span className="locationText">
                {sideNavState.submittedPlace}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SideNav;

function TempDate({ date }) {
  let dateTime = null;

  if (Math.abs(new Date().getDate() - new Date(date).getDate()) === 0) {
    dateTime = (
      <div>
        <p>Today</p>
      </div>
    );
  }
  return dateTime;
}



// <Avatar style={avatarStyle}>
//   <MyLocationRoundedIcon variant="rounded" style={locationIconStyle} />
// </Avatar>;

// import MyLocationRoundedIcon from "@material-ui/icons/MyLocationRounded";
// import Avatar from "@material-ui/core/Avatar";
// const avatarStyle = {
//   backgroundColor: "rgba(255, 255, 255, 0.2)",
//   boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
//   width: 40,
//   height: 40,
// };
// const locationIconStyle = {
//   fill: "#E7E7EB",
//   width: 22,
//   height: 22,
// };