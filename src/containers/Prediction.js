import React, { Component } from 'react'
import { Typography,Divider,Grid, TextField, Input, Button, List, ListItem,ListItemAvatar,Avatar,ListItemText, ListItemSecondaryAction,IconButton } from '@material-ui/core'
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ImageIcon from '@material-ui/icons/Image';
import DeleteIcon from '@material-ui/icons/Delete';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'rgb(47, 101, 203)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'rgb(47, 101, 203)',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#9e9e9e',
            },
            '&:hover fieldset': {
                borderColor: '#212121',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgb(47, 101, 203)',
            },
        },
    },
})(TextField);

const BOX_STYLE={
    background:'rgb(255, 255, 255)', 
    minHeight:'10vh', 
    boxShadow:'rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px',
    borderRadius:'6px',
    padding:'2vh',
    width:'78vw'
}
export default class Prediction extends Component {
    constructor(props){
        super(props);
        this.state = {
            list_imageBase64 : [],
            list_imageName:[],
            a:111,
            uploadType:"image",
        }
    }
    test = (e) =>{
        console.log(e.target.value)
    }

    generate(element) {
        let e = this.state.list_imageName.map((value) =>
          React.cloneElement(element, {
            key: value,
          }),
        );
        return e
        // console.log(e[0].key)
    }

    uploadImage = (e) => {
        // console.log(111)
        let list_base64 = this.state.list_imageBase64;
        let list_name = this.state.list_imageName;
        // console.log(e.target.files)
        var file = e.target.files[0];
        // console.log(file.name)
        let name = file.name
        list_name.push(name)
        var reader = new FileReader();
        reader.onload = e => {
            // console.log(e.target)
            list_base64.push(e.target.result)
            this.setState({
                list_imageBase64: list_base64,
                list_imageName: list_name
            })
        };
        reader.readAsDataURL(file);
    }

    deleteImage = (index) => {
        // console.log(e)
        let name = this.state.list_imageName;
        let list_base64 = this.state.list_imageBase64;
        name.splice(index, 1)
        list_base64.splice(index, 1)
        this.setState({
            list_imageName:name,
            list_imageBase64:list_base64,
        })
    }

    fn_prediction = () => {
        console.log(this.state.list_imageBase64)
    }

    handleChange = (event) => {
        this.setState({
            uploadType:event.target.value

        })
      };

    render() {
        console.log(this.state.list_imageName)

        let upload_image = (
            <div style={BOX_STYLE}>
                <p style={{display:'inline', fontWeight:'500', fontSize:'1.1rem'}}>Figure<span style={{color:'#dd2c00'}}>*</span>:</p>
                <div style={{float:'right', textAlign:'center', marginRight:'1vw', width:'3vw',height:'3vh', background:'rgb(71, 130, 218)', borderRadius:'8px', color:'white', lineHeight:'3vh', fontSize:'11px'}}>
                    Required
                </div>
                <br></br>
                <br></br>
                <FormControl component="fieldset">
                    {/* <FormLabel component="legend">Gender</FormLabel> */}
                    <RadioGroup aria-label="gender" name="gender1" value={this.state.uploadType} onChange={this.handleChange}>
                        <FormControlLabel value="image" control={<Radio />} label="upload uncompressed files" />
                        <FormControlLabel value="compressed" control={<Radio />} label="Upload compressed file" />
                    </RadioGroup>
                </FormControl>
                <br></br>
                <div style={{display:this.state.uploadType=="image" ? "block":"none"}}>
                <Button 
                    component = "label" 
                    size='medium' 
                    variant='contained' 
                    color="secondary" 
                    startIcon={<CloudUploadIcon />} 
                    style={{marginTop:'4vh'}}>
                UPLOAD Images
                <input
                    id = 'input'
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    multiple
                    onChange={(e) => this.uploadImage(e)}
                    onClick={(event)=> { console.log(event.target.value); event.target.value = null }} 
                />
                </Button>
                </div>
                <div style={{display:this.state.uploadType=="compressed" ? "block":"none"}}>
                <Button 
                    component = "label" 
                    size='medium' 
                    variant='contained' 
                    color="secondary" 
                    startIcon={<CloudUploadIcon />} 
                    style={{marginTop:'4vh' }}>
                UPLOAD Compressed File
                <input
                    id = 'input'
                    accept=".zip, .rar"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => this.uploadImage(e)}
                    onClick={(event)=> { console.log(event.target.value); event.target.value = null }} 
                />
                </Button>
                </div>
                <div style={{marginTop:'2vh'}}>
                    <List dense={false}>
                        {
                        
                        this.state.list_imageName.map((e,i) => {
                            // console.log(e)
                          return (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary = {e}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={this.deleteImage.bind(this, i)} aria-label="delete">
                                    <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                          )

                        })
                            
                        }
                    </List>
                </div>
            </div>
        )

        let figure_metedata = (
            <div style={BOX_STYLE}>
                <div style = {{height:'3vh'}}>
                    <p style={{display:'inline',fontWeight:'500', fontSize:'1.1rem'}}>Figure's matedata:</p>
                    <span style={{float:'right', textAlign:'center', lineHeight:'3vh',marginRight:'1vw',width:'3vw',height:'3vh', background:'rgb(71, 130, 218)', borderRadius:'8px', color:'white', fontSize:'11px'}}>
                    Optional
                    </span>
                </div>
                <br></br>
                
             
                <CssTextField onChange={this.test} size ='small' id="outlined-basic" label="Title" variant="standard" style={{width:'37vw'}} />
                <CssTextField size ='small' id="outlined-basic" label="Link" variant="standard" style={{marginLeft:'1vw', width:'37vw'}} />

               

                <CssTextField size ='small' multiline rows={3} id="outlined-basic" label="Description" variant="standard" style={{width:'75vw', marginTop:'2vh'}} />
            </div>
        )

        let paper_metedata = (
            <div style={BOX_STYLE}>
                {/* <p style={{display:'inline',fontWeight:'500', fontSize:'1.1rem'}}>Paper's metedata:</p> */}
                <div style = {{height:'3vh'}}>
                    <p style={{display:'inline',fontWeight:'500', fontSize:'1.1rem'}}>Paper's matedata:</p>
                    <span style={{float:'right', textAlign:'center', lineHeight:'3vh',marginRight:'1vw',width:'3vw',height:'3vh', background:'rgb(71, 130, 218)', borderRadius:'8px', color:'white', fontSize:'11px'}}>
                    Optional
                    </span>
                </div>
                <br></br>

                <CssTextField onChange={this.test} size ='small' id="outlined-basic" label="Title" variant="standard" style={{width:'18vw', marginTop:'3vh'}} />
                <CssTextField size ='small' id="outlined-basic" label="Link" variant="standard" style={{marginLeft:'1vw', width:'18vw', marginTop:'3vh'}} />
                <CssTextField size ='small' id="outlined-basic" label="Publication year" variant="standard" style={{marginLeft:'1vw', width:'18vw', marginTop:'3vh'}} />
                <CssTextField size ='small' id="outlined-basic" label="First Author's name" variant="standard" style={{marginLeft:'1vw', width:'18vw', marginTop:'3vh'}} />
                <CssTextField size ='small' id="outlined-basic" label="Journal's name" variant="standard" style={{width:'18vw', marginTop:'2vh'}} />
                <CssTextField size ='small' id="outlined-basic" label="PM ID" variant="standard" style={{marginLeft:'1vw', width:'18vw', marginTop:'2vh'}} />
                <CssTextField size ='small' id="outlined-basic" label="PMC ID" variant="standard" style={{marginLeft:'1vw', width:'18vw', marginTop:'2vh'}} />
                <CssTextField size ='small' id="outlined-basic" label="Keywords" variant="standard" style={{marginLeft:'1vw', width:'18vw', marginTop:'2vh'}} />

                {/* <CssTextField size ='small' id="outlined-basic" label="Key words" variant="standard" style={{marginLeft:'1vw', width:'56vw', marginTop:'2vh'}} /> */}
                <CssTextField size ='small' multiline rows={3} id="outlined-basic" label="Abstract" variant="standard" style={{width:'75vw', marginTop:'2vh'}} />
            </div>
        )
        
        return (
            <div style={{width:'84vw'}}>
                <Typography style={{fontWeight:'600', fontSize:'1.5rem', marginTop:'3vw', marginLeft:'4vh'}}>Prediction</Typography>
                <Divider style={{marginLeft:'2vw', width:'78vw', marginTop:'4vh'}}></Divider>
                <div style={{width:'78vw', marginLeft:'2vw', marginTop:'3vh'}}>
                    {upload_image}
                </div>
                <div style={{width:'78vw', marginLeft:'2vw', marginTop:'3vh'}}>
                    {figure_metedata}
                </div>
                <div style={{width:'78vw', marginLeft:'2vw', marginTop:'3vh'}}>
                    {paper_metedata}
                </div>

                <Button variant="contained" onClick={this.fn_prediction} style={{background:'rgb(47, 101, 203)', color:'white', marginLeft:'2.5vw', marginTop:'6vh'}}>Predict</Button>
                <div style={{height:'10vh'}}></div>
               
            </div>
        )
    }
}
