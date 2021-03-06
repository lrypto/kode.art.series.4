import React from "react";
import Header from "./Header";
import { ActionType } from "../common/Store";
import useAppContext from "../components/hooks/useAppContext";


export default function Main() {
  const { state, dispatch } = useAppContext();
 
  console.log("state", state);

  return (
      <React.Fragment>
        <div id="home">
          <Header />
        <div className="landing">
          <div className="home-wrap">
            <div className="home-inner">
            </div>
          </div>
        </div>
      </div>
      <div className="caption text-center">
        <h1>(k)ode.art</h1>
        <h3>Pulic works of art, expressed in code</h3>
        <a className="btn btn-outline-light btn-lg" href="#overview">See Rankings</a>
        <a className="btn btn-outline-light btn-lg" href="#overview">Submit Code</a>
      </div>
      <span><a href="" 
        onClick={() => {
          window.open("https://unsplash.com/photos/46dgbaKZTjk");
        }}
      >Photo credit: Axi Aimee</a></span>
      <div id="overview" className="offset">
        <div className="col-12 narrow text-center">
          <h1>(k)ode.art code rankings</h1>
          <p className="lead">
            kode.art...          
          </p>
          <a className="btn btn-secondary btn-md" 
            onClick={() => {
              dispatch({
                type: ActionType.SET_ETH_BALANCE,
                payload: "3.5"
              })
            }}
          >
          Submit some (k)ode</a>
        </div>
      </div>
      </React.Fragment>
  );
}
