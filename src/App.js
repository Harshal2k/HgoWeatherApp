import React from "react";
import Search from "./components/search";
import { useSelector, useDispatch } from 'react-redux'
import Weather from "./components/weatherComponents/weather";
import Pollution from "./components/airPollutionComponents/pollutionDetails";
import { setProgress } from '../src/actions'
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LoadingBar from 'react-top-loading-bar'


function App() {
  const progress = useSelector(state => state.progress);
  const dispatch = useDispatch();
  // React.useEffect(() => {
  //   lottie.loadAnimation({
  //     container: document.querySelector("#earthAnim"),
  //     animationData: em06,
  //   });
  // }, []);
  return (
    <Router>
    <div className="App">
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))} />
      <div>
        <Link to="/">Home</Link>
        <Link to="/pollution">Pollution</Link>
      </div>
      <div className="AppDiv">
        <h1 className="App-h1">HGO Weather App</h1>
        <Search />
        <Routes>
          <Route path="/" element={<Weather/>}></Route>
          <Route path="/pollution" element={<Pollution/>}></Route>
        </Routes>
      </div>
      {/* <div id="earthAnim" className="lottieAnim"/> */}
    </div>
    </Router>

  );
}

export default App;
