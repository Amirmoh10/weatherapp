import React, { useContext } from "react";
import "../App.css";
import NavigationRoundedIcon from "@material-ui/icons/NavigationRounded";
import Avatar from "@material-ui/core/Avatar";

import StateContext from "../stateContext";
import styled from "styled-components";

const Rectangle = styled.div`
  width: 229px;
  height: 8px;
  background: #e7e7eb;
  border-radius: 80px;
  &::after {
    content: "";
    width: ${(props) => props.recWidth};
    height: 8px;
    position: absolute;
    background-color: yellow;
  }
`;

const navAvatarStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  width: 30,
  height: 30,
  marginRight: "5.71px",
};

const tempImageStyle = {
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "56.44px",
  Height: "62px",
};

function Content() {
  const contentContext = useContext(StateContext);
  return (
    <div className="content">
      {contentContext.placeData[0] ? (
        <div className="contentBox">
          <CardsList contentContext={contentContext} />
          <div className="highlightTitle">
            <span>Today’s Hightlights </span>
          </div>
          <div className="highlightCardsBox">
            <div className="highLightLeftCards">
              <div className="windCard">
                <span className="windStatusText">Wind status</span>
                <div>
                  <span className="windStatusNumber">
                    {contentContext.placeData[0].wind_speed.toFixed(0)}
                  </span>
                  <span className="windStatusUnit">mph</span>
                </div>
                <div className="windStatusLocBox">
                  <Avatar style={navAvatarStyle}>
                    <NavigationRoundedIcon
                      style={{
                        fill: "#E7E7EB",
                        transform: `rotate(${contentContext.placeData[0].wind_direction}deg)`,
                      }}
                    />
                  </Avatar>

                  <p className="windStatusLocText">
                    {contentContext.placeData[0].wind_direction_compass}
                  </p>
                </div>
              </div>
              <div className="visibilityCard">
                <span className="visibiltyText">Visibility</span>
                <div>
                  <span className="visibilityNumber">
                    {contentContext.placeData[0].visibility.toFixed(0)}
                  </span>
                  <span className="visibilityUnit">miles</span>
                </div>
              </div>
            </div>
            <div className="highLightLeftCards">
              <div className="humidityCard">
                <span className="humidityText">Humidity</span>
                <div className="humitdityPercentageBox">
                  <span className="humidityNumber">
                    {contentContext.placeData[0].humidity.toFixed(0)}
                  </span>
                  <span className="humidityUnit">%</span>
                </div>
                <div className="humidityPercentageNumbers">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
                {console.log(
                  (
                    (contentContext.placeData[0].humidity / 100) *
                    229
                  ).toString() + "px"
                )}
                <Rectangle
                  recWidth={
                    (
                      (contentContext.placeData[0].humidity / 100) *
                      229
                    ).toString() + "px"
                  }
                />
                <div className="rectanglePercentage">
                  <span>%</span>
                </div>
              </div>
              <div className="airPressureCard">
                <span className="airPressureText">Air Pressure</span>
                <div>
                  <span className="airPressureNumber">
                    {contentContext.placeData[0].air_pressure.toFixed(0)}
                  </span>
                  <span className="airPressureUnit">mb</span>
                </div>
              </div>
            </div>
            ;
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Content;

function CardsList({ contentContext }) {
  let cardsList = null;
  cardsList = (
    <div className="tempCardsBox">
      {contentContext.placeData
        .slice(1, contentContext.placeData.length)
        .map((placeObject, index) => {
          return (
            <div className=" tempCard" key={index}>
              {new Date().getDate() -
                new Date(placeObject.applicable_date).getDate() ===
              -1 ? (
                <p className="cardDate"> Tomorrow </p>
              ) : (
                <p className="cardDate">
                  <span className="todayTempWeekDay ">
                    {new Date(placeObject.applicable_date)
                      .toDateString()
                      .slice(0, 3)}
                    ,
                  </span>
                  <span className="todayTempNumberDay">
                    {new Date(placeObject.applicable_date)
                      .toDateString()
                      .slice(8, 10)}
                  </span>
                  <span>
                    {new Date(placeObject.applicable_date)
                      .toDateString()
                      .slice(4, 7)}
                  </span>
                </p>
              )}
              <div className="tempImage">
                <img
                  alt=""
                  src={require(`../img/${placeObject.weather_state_name}.png`)}
                  style={tempImageStyle}
                />
              </div>
              <div className="tempDegree">
                <span className="firstDegree">
                  {placeObject.max_temp.toFixed(0)}°C
                </span>
                <span className="secondDegree">
                  {placeObject.min_temp.toFixed(0)}°C
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
  return cardsList;
}

//   <div className="tempCFbox">
//     <span className="tempCbox">℃</span>
//     <span className="tempFbox">℉</span>
//   </div>;



