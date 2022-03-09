import React from "react";
import Search from "./components/search";
import lottie from 'lottie-web';
import { useSelector, useDispatch } from 'react-redux'
import Weather from "./components/weather";
import { setProgress } from '../src/actions'
import './App.css';
import sun from "../src/static/sun.json"
import earth from '../src/static/earth.json'

import LoadingBar from 'react-top-loading-bar'


function App() {
  const progress = useSelector(state => state.progress);
  const dispatch = useDispatch();
  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#earthAnim"),
      animationData: earth,
    });
  }, []);
  return (
    <div className="App">
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))} />
      <div className="AppDiv">
        <h1 className="App-h1">HGO Weather App</h1>
        <Search />
        <Weather />
      </div>
      <div id="earthAnim" className="lottieAnim"/>
    </div>
  );
}

export default App;
