import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import logo from './Dumbbell.png';
import IconButton from '@material-ui/core/IconButton';
import LightbulbOutline from './LightbulbOutline';
import LightbulbFull from './LightbulbFull';

interface IProps{
  darkModeToggle: any,
  isDarkMode: boolean,
}

interface IState{  
}

export default class FitTracHeader extends React.Component<IProps, IState>{
  constructor(props: any) {
    super(props)
    this.state = {
    }
  } 

  public render() {
    return(
      <div>
        <this.Header/>
      </div> 
    )
  }

  private Header = () => {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{background: '#4355a5'}}>
          <Toolbar disableGutters={true} style={{marginLeft: '16px', marginRight: '8px'}}>
            <img src={logo} alt="Logo" width='50' height='50'/>
    
            <Typography className={classes.title} variant="h5" noWrap>
              FitTrac
            </Typography>
  
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
              />
            </div>

            <div style={{marginLeft: '8px'}}>
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
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      margin: theme.spacing(1)
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

    button: {
        margin: theme.spacing(1),
      },
      input: {
        display: 'none',
      },
  }),
);