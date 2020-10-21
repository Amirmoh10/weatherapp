import React, { useEffect, useReducer } from "react";
import axios from "axios";
import SideNav from "./components/sideNav";
import Content from "./components/content";
import StateContext from "./stateContext";
import DispatchContext from "./dispatchContext";
import "./App.css";

const initialState = {
  typedPlace: "",
  submittedPlace: "",
  placeData: [],
  woeid: 0,
};

// "title": "Berlin",
//         "location_type": "City",
//         "woeid": 638242,
//         "latt_long": "52.516071,13.376980"

export const ACTION = {
  PLACE_TYPING: "PLACE_TYPING",
  PLACE_SUBMITT: "PLACE_SUBMITT",
  PLACE_CLEAR: "PLACE_CLEAR",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.PLACE_TYPING:
      return {
        ...state,
        typedPlace: action.value,
      };

    case ACTION.PLACE_SUBMITT:
      return {
        ...state,
        submittedPlace: state.typedPlace,
      };

    case ACTION.PLACE_CLEAR:
      return {
        ...state,
        submittedPlace: " ",
      };

    case ACTION.FETCH_DATA_SUCCESS:
      return {
        ...state,
        placeData: action.value,
      };

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (state.submittedPlace) {
      const fetchData = async () => {
        try {
          const result1 = await axios(
            `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${state.submittedPlace}`
          );

          const result2 = await axios(
            `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${result1.data[0].woeid}`
          );

          dispatch({
            type: ACTION.FETCH_DATA_SUCCESS,
            value: result2.data["consolidated_weather"],
          });
        } catch (error) {
          console.log("erro fetching");
        }
      };
      fetchData();
    }
  }, [state.submittedPlace]);

  console.log(state.submittedPlace)
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className="App">
          <SideNav />
          <Content />
        </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
