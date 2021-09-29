import React, { Component } from "react";
import { Typography, Divider, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

/**
 * @description History component, display history records.
 * @author MaoZane
 * @export
 * @class History
 * @extends {Component}
 */
export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyInfo: [],
    };
  }

  componentDidMount = () => {
    this.fetch_AllHistory();
  };

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  fetch_AllHistory = () => {
    // console.log(localStorage.pathway)
    var requestOptions = {
      method: "get",
    };
    fetch(
      process.env.REACT_APP_API +
        "/get_all_history_info/?user_name=" +
        localStorage.pathway,
      requestOptions
    )
      .then((response) => response.json())
      .then((info) => this.fn_getHistoryInfo(info))
      .catch((error) => console.log("error", error));
  };

  fn_getHistoryInfo = (info) => {
    // console.log(info)
    this.setState({
      historyInfo: info,
    });
  };

  fn_showHistoryResult = (figId) => {
    // console.log(figId);
    this.props.fn_showHistoryResult(figId);
  };

  test = (fig_id, job_id) => {
    // console.log(45455645)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");

    let formData = new FormData();
    formData.append("job_id", job_id);
    formData.append("fig_id", fig_id);

    var requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch(process.env.REACT_APP_API + "/delete_history", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);
        this.fetch_AllHistory();
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    // const classes = useStyles();
    // console.log(rows)
    let history_list = (
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">JobName</TableCell>
                <TableCell align="left">FigureName</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.historyInfo.map((e, i) => (
                <TableRow key={e.name}>
                  <TableCell width="10%">{i + 1}</TableCell>
                  <TableCell width="40%" align="left">
                    {e.job_name}
                  </TableCell>
                  <TableCell align="left" width="25%">
                    {e.fig_name}
                  </TableCell>
                  <TableCell align="center" width="25%">
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        background: "rgb(47, 101, 203)",
                        color: "white",
                      }}
                      id={e.fig_id}
                      onClick={this.fn_showHistoryResult.bind(this, e.fig_id)}
                    >
                      Show
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      id={e.fig_id}
                      onClick={() => this.test(e.fig_id, e.job_id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );

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
          History
        </Typography>
        <Divider
          style={{ marginLeft: "2vw", width: "78vw", marginTop: "4vh" }}
        ></Divider>
        <div style={{ width: "78vw", marginLeft: "2vw", marginTop: "3vh" }}>
          {history_list}
        </div>
      </div>
    );
  }
}
