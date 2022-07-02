import React from "react";
import './Loader.css'

function Loader() {
  return (
    <div>
       <div class="all">
        <div class="containerLoading">
          <div class="top"></div>
          <div class="inner-oval">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
          </div>
          <center>
            <h3>Loading...</h3>
          </center>
        </div>
      </div> 

      
    <div className="mt-5">
      <div className="spinner-border text-dark mt-5" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    
    
    </div>
  );
}

export default Loader;
