import React, { PureComponent } from "react";
import Introduction from "./containers/Introduction";
import Prediction from "./containers/Prediction";
import History from "./containers/History";
import Result from "./containers/Result";
import Edit from "./containers/Edit";
import "./Main.css";
import { Grid, Typography } from "@material-ui/core";
import { Menu } from "antd";
import {
  CrownFilled,
  UserOutlined,
  ApartmentOutlined,
  AreaChartOutlined,
  BulbOutlined,
  CloudSyncOutlined,
} from "@ant-design/icons";

//css
const SYMBOL = {
  color: "white",
  fontWeight: "500",
  fontSize: "1.2rem",
  marginLeft: "2.5vw",
  display: "inline",
  width: "20vw",
};

const USER_INFO = {
  color: "white",
  fontWeight: "500",
  fontSize: "1.1rem",
  float: "right",
  marginRight: "2.5vw",
  // width:'20vw',
  display: "inline",
};

/**
 * @description Integrate all components
 * @author MaoZane
 * @export Index
 * @class Main
 * @extends {PureComponent}
 */

export default class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current_page: "introduction",
      base64_figure: null,
      figureInfo: [],
      geneInfo: [],
      relationInfo: [],
      resultStatus: "none",
    };
  }

  setUserId = () => {
    let randomId = Number(Math.random().toString().substr(2)).toString(36);
    let time = new Date().toISOString();
    let userId = time + randomId;
    localStorage.setItem("pathway", userId);
  };

  handleClickMenu = (e) => {
    // console.log('click ', e);
    this.setState({
      current_page: e.key,
    });
  };

  componentDidMount = () => {
    // this.setUserId();
    if (!localStorage.getItem("pathway")) {
      this.setUserId();
    }
    // console.log(localStorage)
  };

  fn_showResult = async (info) => {
    this.setState({
      figureInfo: [info.figure[0]], // [info, base64]: info:width height fig_id fig_name fig_path
      base64_figure: info.figure[1], // base64:figure's base64
      geneInfo: info.gene, // [obj]: obj:dict_id gene_id gene_name gene_BBox("left top width height")
      relationInfo: info.relation, // [obj]: obj:activator(gene_id) receptor(gene_id) activator_name receptor_name relation_BBox relation_id relation_type
    });
    this.fn_changePredictionStatus("end");
  };

  fn_showHistoryResult = async (index) => {
    // console.log(index);
    this.fn_changePage("result");
    this.fn_changePredictionStatus("start");
    let info = await this.fetch_historyResult(index);
    // console.log(info)
    this.setState({
      figureInfo: [info.figure[0]], // [info, base64]: info:width height fig_id fig_name fig_path
      base64_figure: info.figure[1], // base64:figure's base64
      geneInfo: info.gene, // [obj]: obj:dict_id gene_id gene_name gene_BBox("left top width height")
      relationInfo: info.relation, // [obj]: obj:activator(gene_id) receptor(gene-id) activator_name receptor_name relation_BBox relation_id relation_type
    });
    this.fn_changePredictionStatus("end");
  };

  fn_reviseResult = () => {
    // console.log("revise")
    this.setState({
      current_page: "edit",
    });
  };

  fetch_historyResult = (figId) => {
    return new Promise((resolve, reject) => {
      // console.log(figId);
      var requestOptions = {
        method: "get",
      };
      fetch(
        process.env.REACT_APP_API + "/get_result/?figId=" + figId,
        requestOptions
      )
        .then((response) => response.json())
        .then((info) => resolve(info))
        .catch((error) => console.log("error", error));
    });
  };

  fn_changePredictionStatus = (status) => {
    this.setState({
      resultStatus: status,
    });
    this.fn_changePage("result");
  };

  fn_changePage = (page) => {
    // console.log(page)
    this.setState({
      current_page: page,
    });
  };

  render() {
    // console.log( process.env.REACT_APP_API )
    // console.log(localStorage)
    let menu = (
      <div style={{ width: "16vw" }}>
        <Menu
          onClick={this.handleClickMenu}
          style={{
            width: "100%",
            height: "92vh",
            background: "rgb(255,255,255)",
            borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
          }}
          defaultSelectedKeys="introduction"
          selectedKeys={this.state.current_page}
          mode="inline"
        >
          <Typography
            variant="subtitle2"
            style={{ marginTop: "3vh", marginLeft: "1vw" }}
          >
            Menu
          </Typography>
          <Menu.Item
            key="introduction"
            icon={<BulbOutlined />}
            style={{ marginTop: "1vh" }}
          >
            Introduction
          </Menu.Item>
          <Menu.Item
            key="prediction"
            icon={<ApartmentOutlined />}
            style={{ marginTop: "1vh" }}
          >
            Prediction
          </Menu.Item>
          <Menu.Item
            key="history"
            icon={<CloudSyncOutlined />}
            style={{ marginTop: "vh" }}
          >
            History
          </Menu.Item>
          <Menu.Item
            key="result"
            icon={<AreaChartOutlined />}
            style={{ marginTop: "vh" }}
          >
            Result
          </Menu.Item>
          {/* <Menu.Item key="edit" icon={<EditOutlined />} style={{marginTop:'vh'}}>Edit</Menu.Item> */}
        </Menu>
      </div>
    );
    let head = (
      <div
        style={{
          background: "rgb(47, 101, 203)",
          width: "100vw",
          lineHeight: "8vh",
        }}
      >
        <div style={SYMBOL}>
          <CrownFilled style={{ marginRight: "8px", fontSize: "25px" }} />
          Pathway Curator
        </div>
        <div style={USER_INFO}>
          User Name:{localStorage.pathway}{" "}
          <UserOutlined style={{ marginLeft: "8px", fontSize: "20px" }} />
        </div>
      </div>
    );

    //content page
    let content = (
      <div>
        <Introduction></Introduction>
      </div>
    );
    if (this.state.current_page === "introduction") {
      content = (
        <div>
          <Introduction></Introduction>
        </div>
      );
    } else if (this.state.current_page === "prediction") {
      content = (
        <div>
          <Prediction
            fn_showResult={this.fn_showResult}
            changePredictionStatus={this.fn_changePredictionStatus}
          />
        </div>
      );
    } else if (this.state.current_page === "history") {
      content = (
        <div>
          <History fn_showHistoryResult={this.fn_showHistoryResult} />
        </div>
      );
    } else if (this.state.current_page === "result") {
      content = (
        <div>
          <Result
            geneInfo={this.state.geneInfo}
            base64_figure={this.state.base64_figure}
            relationInfo={this.state.relationInfo}
            fn_reviseResult={this.fn_reviseResult}
            figureInfo={this.state.figureInfo}
            resultStatus={this.state.resultStatus}
            fn_changePage={this.fn_changePage}
          />
        </div>
      );
    } else if (this.state.current_page === "edit") {
      content = (
        <div>
          <Edit />
        </div>
      );
    }
    return (
      <div>
        <container maxwidth="100vw">
          <Grid
            container
            direction="column"
            style={{ background: "white", height: "100vh" }}
          >
            <Grid
              container
              style={{ height: "8vh", width: "100vw", background: "yellow" }}
            >
              {head}
            </Grid>
            <Grid container style={{ width: "100vw", height: "92vh" }}>
              <Grid container style={{ background: "red", width: "16vw" }}>
                {menu}
              </Grid>
              <Grid
                container
                direction="column"
                style={{ background: "blue", width: "84vw" }}
              >
                <Grid
                  style={{
                    display: "inline-block",
                    overflowY: "auto",
                    overflowX: "hidden",
                    width: "84vw",
                    height: "82vh",
                    background: "rgb(247, 249, 252)",
                  }}
                >
                  <div style={{ width: "84vw" }}>{content}</div>
                </Grid>
                <Grid
                  style={{
                    padding: "0 3vw",
                    width: "84vw",
                    height: "10vh",
                    background: "rgb(247, 249, 252)",
                    lineHeight: "10vh",
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                  }}
                >
                  @DBL
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </container>
      </div>
    );
  }
}
