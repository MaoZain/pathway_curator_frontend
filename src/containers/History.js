import React, { Component } from 'react'
import { Typography,Divider, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ThreeSixtySharp } from '@material-ui/icons';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


const rows = [
createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
createData('Eclair', 262, 16.0, 24, 6.0),
createData('Cupcake', 305, 3.7, 67, 4.3),
createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const BOX_STYLE={
    background:'rgb(255, 255, 255)', 
    minHeight:'10vh', 
    boxShadow:'rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px',
    borderRadius:'6px',
    padding:'2vh'
}

export default class History extends Component {
    constructor(props){
        super(props);
        this.state={
            historyInfo:[],
        }
    }

    componentDidMount = () => {
        this.fetch_getHistoryInfo()
    }

    fetch_getHistoryInfo = () => {
        var raw = JSON.stringify({"user_name":localStorage.pathway});
        // console.log(raw)
        let user = "123"
        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:raw,
            // 'mode':'no-cors'
        };
        fetch("/back/get_history_info", requestOptions)
        .then(response => response.json())
        .then(info => this.fn_getHistoryInfo(info))
        .catch(error => console.log('error', error));
    }

    fn_getHistoryInfo = (info) => {
        console.log(info)
        this.setState({
            historyInfo:info
        })
    }

    fn_history_showFiureInfo = (figId) => {
        // console.log(index);
        this.props.fn_history_showFigureInfo(figId);
    }

    test = (pp) =>{
        console.log(pp)
    }
    
    render() {
        // const classes = useStyles();
        // console.log(rows)
        let history_list = (
            <div >
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Created time</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.historyInfo.map((e, i) => (
                                <TableRow key={e.name}>
                                <TableCell width='10%'>
                                    {i+1}
                                </TableCell>
                                <TableCell width='40%' align="left">{e.fig_name}</TableCell>
                                <TableCell align="left" width='25%'>{e.fig_id}</TableCell>
                                <TableCell align="center" width='25%'>
                                    <Button variant='contained' 
                                        size='small' 
                                        style={{background:'rgb(47, 101, 203)', color:'white'}} 
                                        id={e.fig_id} 
                                        onClick={this.fn_history_showFiureInfo.bind(this, e.fig_id)} >Show</Button>
                                    <Button variant='contained' 
                                        size='small' 
                                        color='secondary' 
                                        id={e.fig_id} 
                                        onClick={()=>this.test(i)} 
                                        style={{marginLeft:'10px'}}>Delete</Button>       
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )

        return (
            <div>
                <Typography style={{fontWeight:'600', fontSize:'1.5rem', marginTop:'3vw', marginLeft:'4vh'}}>History</Typography>
                <Divider style={{marginLeft:'2vw', width:'78vw', marginTop:'4vh'}}></Divider>
                <div style={{width:'78vw', marginLeft:'2vw', marginTop:'3vh'}}>
                    {history_list}
                </div>
            </div>
        )
    }
}
