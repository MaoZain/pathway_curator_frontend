import * as React from 'react';
import styles from './Navbar.module.css'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';


export default function Navbar(props) {

  function update_pages(e) {
      props.update_pages(e.target.id)
  }

  return (
    <List onClick={update_pages}
      sx={{ width: '100%', maxWidth: 360, bgcolor:props.background_color,marginTop:'15px' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <span className={styles.item_section_title} style={{color:props.icon_color}}>PAGES</span>
      <ListItemButton id="Home" >
        <ListItemIcon className={styles.item_icon} style={{color:props.icon_color}}>
          <HomeOutlinedIcon id="Home"></HomeOutlinedIcon>
        </ListItemIcon>
        <p className={styles.nav_p} id="Home" >Home</p>
      </ListItemButton>
      
      <ListItemButton id ='Prediction'>
        <ListItemIcon className={styles.item_icon} style={{color:props.icon_color}}>
          <BuildOutlinedIcon id = 'Prediction'></BuildOutlinedIcon>
        </ListItemIcon>
        <p className={styles.nav_p} id ='Prediction' >Prediction</p>
      </ListItemButton>

      <ListItemButton id ='History'>
        <ListItemIcon className={styles.item_icon} style={{color:props.icon_color}}>
          <StorageRoundedIcon id ='History'></StorageRoundedIcon>
        </ListItemIcon>
        <p className={styles.nav_p} id ='History' >History</p>
      </ListItemButton>

      <ListItemButton id ='Result'>
        <ListItemIcon className={styles.item_icon} style={{color:props.icon_color}}>
          <AssessmentOutlinedIcon id ='Result'></AssessmentOutlinedIcon>
        </ListItemIcon>
        <p className={styles.nav_p} id ='Result' >Result</p>
      </ListItemButton>

    </List>
  );
}
