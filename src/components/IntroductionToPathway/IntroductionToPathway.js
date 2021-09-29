import React, { Component } from "react";
import { Typography } from "antd";
import { Steps } from "antd";
import { Row, Col } from "antd";
import step_img from "./step.png";

const { Step } = Steps;
const { Title } = Typography;

export default class InputData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_step: 0,
    };
  }

  // onChange = current => {
  //   console.log('onChange:', current);
  //   this.setState({ current });
  // };

  onChangeSteps = (current) => {
    this.setState({
      current_step: current,
    });
  };

  render() {
    const { current_step } = this.state;
    let step_comp = (
      <div>
        <Steps current={current_step} onChange={this.onChangeSteps}>
          <Step
            title="Input Pathway"
            // description="Workflow of G2PDeep."
          />
          <Step
            title="Gene Detection"
            // description="Upload and create dataset of SNP."
          />
          <Step
            title="Relation Detection"
            // description="Build, train, analysis state-of-the-art deep learning models."
          />
          <Step
            title="Result Filtering & Forming"
            // description="Predict quantitative phenotype trait and detect genotype markers."
          />
        </Steps>
      </div>
    );

    return (
      <div>
        <Title style={{ marginLeft: "4vh", marginTop: "2vh" }} level={4}>
          How Pathway Curator works?
        </Title>
        <div
          style={{ marginLeft: "4vh", marginTop: "2vh", textAlign: "center" }}
        >
          <br></br>
          <div style={{ width: "70vw" }}>
            <Row>
              <Col>
                {step_comp}
                {/* {step_content} */}
                <br></br>
                <br></br>
                <br></br>
                <img
                  alt="Introduction"
                  src={step_img}
                  style={{ width: "90%" }}
                ></img>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
