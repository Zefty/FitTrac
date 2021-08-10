// import react components
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import logo from './dumbbell.png';
import IconButton from '@material-ui/core/IconButton';
import LightbulbOutline from './LightbulbOutline';
import LightbulbFull from './LightbulbFull';
import Drawer from '../Drawer/Drawer';

// set up props for light and dark mode 
interface IProps{
  darkModeToggle: any,
  isDarkMode: boolean,
  searchFilter: any,
}

interface IState{  
  drawer: boolean
}

export default class FitTracHeader extends React.Component<IProps, IState>{
  constructor(props: any) {
    super(props)
    this.state = {
      drawer: false
    }
  } 

  public render() {
    // only rendering one part for header component
    // WIP: Side bar for more access to features 
    //      Search bar
    return(
      <div>
        <this.Header/>
        <Drawer openDrawer={this.state.drawer} closeDrawer={() => this.setState({drawer: !this.state.drawer})}/>
      </div> 
    )
  }

  private Header = () => {
    // use mat ui theme/styles
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{background: '#4355a5'}}>
          <Toolbar disableGutters={true} style={{marginLeft: '16px', marginRight: '8px'}}>

            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => this.setState({drawer: !this.state.drawer})}>
              <MenuIcon/>
            </IconButton>

            {/* logo left */}
            
    
            {/* title */}
            <Typography className={classes.title} variant="h1" noWrap onClick={() => window.location.reload()}>
              <img src={logo} alt="Logo" width='40' height='40'/>
              FitTrac
            </Typography>
  
            {/* search bar */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event) => {this.props.searchFilter(event.target.value)}}
              />
            </div>

            <div style={{marginLeft: '8px'}}>
              {/* dark mode toggle button */}
            <IconButton size="medium" onClick={this.props.darkModeToggle}>
              {this.props.isDarkMode ?  <LightbulbFull style={{fill: 'white'}}/> : <LightbulbOutline style={{fill: 'white'}}/> }
            </IconButton>
            </div>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: 30,
    },
    // menuButton: {
    //   marginRight: theme.spacing(2),
    // },
    title: {
      fontSize: 40,
      align: 'center',
      flexGrow: 1,
      // display: 'none',
      // [theme.breakpoints.up('sm')]: {
      //   display: 'block',
      // },
      // margin: theme.spacing(1),
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: theme.spacing(1),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
    menuButton: {

    },
    button: {
        margin: theme.spacing(1),
      },
      input: {
        display: 'none',
      },
  }),
);
