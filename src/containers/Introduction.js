import { Typography, Divider } from "@material-ui/core";
import React, { Component } from "react";
import IntroductionToG2PDeep from "../components/IntroductionToPathway/IntroductionToPathway";


/**
 * @description
 * @author MaoZane
 * @export Main
 * @class Introduction
 * @extends {Component}
 */
export default class Introduction extends Component {
  render() {
    return (
      <div>
        <Typography
          style={{
            fontWeight: "600",
            fontSize: "1.5rem",
            marginTop: "3vw",
            marginLeft: "4vh",
          }}
        >
          Introduction
        </Typography>
        <Divider
          style={{ marginLeft: "4vh", width: "80vw", marginTop: "4vh" }}
        ></Divider>
        <IntroductionToG2PDeep />
      </div>
    );
  }
}
