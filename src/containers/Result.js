import React, { PureComponent } from 'react'
import { Typography,Divider, Button,IconButton,Select, MenuItem } from '@material-ui/core'
import { Graph, DataUri } from '@antv/x6'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

// const data = {
//     // 节点
//     nodes: [
//       {
//         id: 'node1',
//         x: 0,
//         y: 0,
//         width: 80,
//         height: 40,
//         label: 'Hello',
//       },
//       {
//         id: 'node2',
//         x: 160,
//         y: 180,
//         width: 80,
//         height: 40,
//         label: 'word',
//       },
//     ],
//     // 边
//     edges: [
//       {
//         source: 'node1',
//         target: 'node2',
//       },
//     ],
//   }

const rowsPerPage = 10;
var graph = null

const BOX_STYLE1={
    background:'rgb(255, 255, 255)', 
    height:'64vh', 
    width:'38.25vw',
    float:'left',
    marginTop:'3vh',
    boxShadow:'rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px',
    borderRadius:'6px',
    padding:'1vw',
}
const BOX_STYLE2={
    background:'rgb(255, 255, 255)', 
    height:'64vh', 
    boxShadow:'rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px',
    borderRadius:'6px',
    display:'inline-block',
    width:'38.25vw',
    marginLeft:'1.5vw',
    padding:'1vw',
    marginTop:'3vh',
    overflowY:'auto',
    overflowX:'auto',
}
const BOX_STYLE3={
    background:'rgb(255, 255, 255)', 
    minHeight:'30vh', 
    boxShadow:'rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px',
    borderRadius:'6px',
    marginTop:'2vh',
    float:'left',
    // padding:'2vh',
    width:'38.25vw'
}
const BOX_STYLE4={
    background:'rgb(255, 255, 255)', 
    minHeight:'30vh', 
    boxShadow:'rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px',
    borderRadius:'6px',
    marginLeft:'1.5vw',
    display:'inline-block',
    // padding:'2vh',
    marginTop:'2vh',
    width:'38.25vw'
}

export default class Result extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            onlinDicionary:"genecard",
            page_gene:0,
            page_relation:0,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            sizeOfFigure:36.25 //figure width vw
        }
    }

    componentDidMount() {
        //get the width of the current window to change the width of the simulate figure
        setInterval(() => {
            var innerWidthNow = window.innerWidth;
            var innerHeightNow = window.innerHeight
            if(this.state.innerWidth != innerWidthNow || this.state.innerHeight != innerHeightNow) {
                this.setState({
                    innerWidth: innerWidthNow,
                    innerHeight:innerHeightNow
                })
            }
        }, 500);
        
        //create simulate figure 
        if (this.props.figureInfo.length > 0) {
            let graphWidth = this.state.innerWidth * 0.3625
            let graphHeight = this.state.innerHeight * 0.6
            let scale = graphWidth / this.props.figureInfo[0].width //scale of the showed image

            let data = {
                nodes:[],
                edges:[]
            }

            //generate node info
            this.props.geneInfo.forEach((element, index) => {
                let X = element.gene_BBox.split(",")[0] //
                let Y = element.gene_BBox.split(",")[1]

                data.nodes.push(
                    {
                        id: 'node'+ element.gene_id,
                        x: X * scale,
                        y: Y * scale,
                        width: 50,
                        height: 20,
                        // label: element.gene_name,
                        attrs: { 
                            body: {
                            fill: '#2ECC71', // 背景颜色
                            stroke: '#000',  // 边框颜色
                            },
                            label: {
                            text: element.gene_name,    // 文本
                            fill: '#333',               // 文字颜色
                            fontSize: 11,               // 文字大小
                            },
                        },
                    }
                )
            });

            //generate arrow
            this.props.relationInfo.forEach(e => {
                console.log(e)
                data.edges.push(
                    {
                        source: 'node' + e.activator,
                        target: 'node' + e.receptor,
                    }
                )
            })

            //generate a graph
            graph = new Graph({
                container: document.getElementById('container'),
                selecting: {
                    enabled: true,
                    showNodeSelectionBox: true,
                },
                width:graphWidth,
                height:graphHeight,
                background: {
                    color: '#fffbe6', // 设置画布背景颜色
                },
                grid: {
                size: 10,      // 网格大小 10px
                visible: true, // 渲染网格背景
                },
                scroller: {
                    enabled: true,
                    pannable: true,
                    pageVisible: true,
                    pageBreak: false,
                },
                mousewheel: {
                    enabled: true,
                    modifiers: ['ctrl', 'meta'],
                },
            });

            graph.fromJSON(data) // load data to graph

            // graph.toPNG((dataUri) => {
            //     // 下载
            //     DataUri.downloadDataUri(dataUri, 'chart.png')
            //   })

            // graph.on('node:selected', (Node) => { 
            //     console.log(Node)
            //     window.open("https://www.google.com/")
            // })
        }
    }

    handleChangePage = (event, newPage) => {
        console.log(newPage)
        this.setState({
            page_gene:newPage
        })
    }

    handleChangeRelationPage = (event, newPage) => {
        console.log(newPage)
        this.setState({
            page_relation:newPage
        })
    }

    fn_zoomInfigure = () => {
        //zoomin 5vw
        this.setState({
            sizeOfFigure:this.state.sizeOfFigure+5
        })
    }

    fn_zoomOutfigure = () => {
        //zoomout 5vw
        this.setState({
            sizeOfFigure:this.state.sizeOfFigure-5
        })
    }

    fn_selectDictionary = (e) => {
        console.log(e.target.value  )
        this.setState({
            onlinDicionary:e.target.value
        })
    }

    fn_reviseResult = () => {
        this.props.fn_reviseResult();
    }

    render() {
        //Genecard
        if(this.state.onlinDicionary == "genecard"){
            var url_dic = "https://www.genecards.org/cgi-bin/carddisp.pl?gene="
        }else if(this.state.onlinDicionary == "uniprot"){
            url_dic  = "https://www.uniprot.org/uniprot/?query=" 
        }
       
   
        // console.log(graph)
        if(graph != null){
            console.log("resize")
            graph.resize(this.state.innerWidth * 0.3625, this.state.innerHeight*0.6)
        }
        // console.log(document.getElementById("node1"))
        let simulatedFigure = (
            <div  style={BOX_STYLE1}>
                <div id = "container"></div>
            </div>
        )

        let realFigure = (
            <div style={BOX_STYLE2}>
                <IconButton onClick={this.fn_zoomInfigure}
                   color="primary" aria-label="upload picture" component="span" size='small'>
                    <ZoomInIcon />
                </IconButton>
                <IconButton onClick={this.fn_zoomOutfigure}
                   color="primary" aria-label="upload picture" component="span" size='small'>
                    <ZoomOutIcon />
                </IconButton>
                <div style={{position:'relative', width:'38.25vw', height:'64vh' }}>

                    <img style={{width:this.state.sizeOfFigure+"vw"}} 
                     src = {this.props.base64_figure}></img>

                    {
                        //gene bbox
                        this.props.geneInfo.map((value, index) => {
                            // console.log(value)
                            let scaleofbbox = (this.state.sizeOfFigure * this.state.innerWidth / 100) / this.props.figureInfo[0].width 
                            let geneBbox = {
                                position:'absolute',
                                top:value.gene_BBox.split(",")[1] * scaleofbbox - 2.5 + "px",
                                left:value.gene_BBox.split(",")[0] * scaleofbbox - 2.5 + "px",
                                width:value.gene_BBox.split(",")[2] * scaleofbbox + 5 + "px",
                                height:value.gene_BBox.split(",")[3] * scaleofbbox + 5 + "px",
                                border:'2px solid blue',
                            }
                            return <a id={index} style = {geneBbox}
                            href={url_dic + value.gene_name} target="view_window"></a>
                        })
                    }
                    
                    {
                        //relation bbox
                        this.props.relationInfo.map((value, index) => {
                            console.log(value)
                            let scaleofbbox = (this.state.sizeOfFigure * this.state.innerWidth / 100) / this.props.figureInfo[0].width 
                            let relationBbox = {
                                position:'absolute',
                                top:value.relation_Bbox.split(",")[1] * scaleofbbox + "px",
                                left:value.relation_Bbox.split(",")[0] * scaleofbbox + "px",
                                width:value.relation_Bbox.split(",")[2] * scaleofbbox + "px",
                                height:value.relation_Bbox.split(",")[3] * scaleofbbox + "px",
                                border:'2px solid red',
                            }
                            return <a id={index} style = {relationBbox} ></a>
                        })
                    }
                </div>
            </div>
        )

        let tableOfGene = (
            <div style={BOX_STYLE3}>
                <Paper>
                    <TableContainer style={{height:'50vh'}}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Info in the Gene dictionary</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.geneInfo.slice(this.state.page_gene * rowsPerPage, this.state.page_gene * rowsPerPage + rowsPerPage).map((e, i) => (
                                    <TableRow key={this.state.page * rowsPerPage+i+1}>
                                        <TableCell width='10%'>
                                            {this.state.page_gene * rowsPerPage+i+1}
                                        </TableCell>
                                        <TableCell width='30%' align="left">{e.gene_name}</TableCell>
                                        <TableCell align="left" width='60%'>
                                            <a href={url_dic + e.gene_name} target="view_window">
                                            More detail</a>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                       rowsPerPageOptions={rowsPerPage}
                       component="div"
                       count={this.props.geneInfo.length}
                       rowsPerPage={rowsPerPage}
                       page={this.state.page_gene}
                       onChangePage={this.handleChangePage}
                    />
                </Paper>
            </div>
        )

        let tableOfRelation = (
            <div style={BOX_STYLE4}>
              
                <Paper>
                    <TableContainer style={{height:'50vh'}}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="left">Activator</TableCell>
                                    <TableCell align="left">Relation type</TableCell>
                                    <TableCell align="left">Receptor</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.relationInfo.slice(this.state.page_relation * rowsPerPage, this.state.page_relation * rowsPerPage + rowsPerPage).map((e, i) => (
                                    <TableRow key={this.state.page_relation * rowsPerPage+i+1}>
                                        <TableCell width='10%'>
                                            {this.state.page_relation * rowsPerPage+i+1}
                                        </TableCell>
                                        <TableCell width='30%' align="left">{e.activator_name}</TableCell>
                                        <TableCell align="left" width='30%'>{e.relation_type}</TableCell>
                                        <TableCell align="left" width='30%'>{e.receptor_name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                       rowsPerPageOptions={rowsPerPage}
                       component="div"
                       count={this.props.relationInfo.length}
                       rowsPerPage={rowsPerPage}
                       page={this.state.page_relation}
                       onChangePage={this.handleChangeRelationPage}
                    />
                </Paper>
            </div>
        )
        return (
            <div>
                <Typography style={{fontWeight:'600', fontSize:'1.5rem', marginTop:'3vw', marginLeft:'4vh'}}>Result</Typography>
                <Divider style={{marginLeft:'4vh', width:'78vw', marginTop:'4vh'}}></Divider>
                <div style={{width:'78vw', marginLeft:'2vw', marginTop:'3vh'}}>
                    <p style={{display:'inline', fontSize:'16px', fontWeight:'600' ,color:'#f50057'}}>Choose the online dictionary:</p>
                    <Select
                      style={{width:'7vw', marginLeft:"1vw"}}
                      defaultValue={"genecard"}
                      onChange={this.fn_selectDictionary}
                    >
                        <MenuItem value={"genecard"}>Genecard</MenuItem>
                        <MenuItem value={"uniprot"}>Uniprot</MenuItem>
                    </Select>
                    <Button variant="contained" color="secondary" size="medium"
                        onClick={this.fn_reviseResult}
                        style={{ marginLeft:'2.5vw', float:'right'}}>Revise the result</Button>
                    <div>
                        {tableOfGene}
                        {tableOfRelation}
                    </div>
                    <div>
                        {simulatedFigure}
                        {realFigure}
                    </div> 
                </div>
                <div style={{height:'10vh'}}></div>
                {/* <div id = "container"></div> */}
            </div>
        )
    }
}
