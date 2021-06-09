import React from "react";
import {Router} from "react-router-dom";
import history from "./browser-history";
import {connect} from "react-redux";
import CommonInner from "./components/common-inner/common-inner";

function App({isPopup}) {
  return (
    <Router history={history}>
      <div className={!isPopup ? `wrapper` : `wrapper--popup-active`}>
        <CommonInner />
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  isPopup: state.isPopup,
});

export default connect(mapStateToProps)(App);
