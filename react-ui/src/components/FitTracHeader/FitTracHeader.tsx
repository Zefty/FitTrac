import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
import { alpha, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import LightbulbOutline from './LightbulbOutline';
import LightbulbFull from './LightbulbFull';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

export default function FitTracHeader(props: any) {
    const classes = useStyles();

    return (
        <ElevationScroll {...props}>
            <AppBar position="sticky" color='inherit'>
                <Toolbar disableGutters={true} className={classes.toolbar}>
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu" onClick={() => props.toggleDrawer()}>
                        <MenuIcon />
                    </IconButton>
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
                            onChange={(event) => { props.searchFilter(event.target.value) }}
                        />
                    </div>
                    <div style={{ marginLeft: '8px' }}>
                        <IconButton size="medium" onClick={props.toggleDarkMode}>
                            {props.darkMode ? <LightbulbFull style={{ fill: 'white' }} /> : <LightbulbOutline classes={{ root: classes.inputRoot }}/>}
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    )
}

function ElevationScroll(props: any) {
    const { children } = props;
    const trigger = useScrollTrigger();

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        toolbar: {
            marginLeft: 16,
            marginRight: 8
        },
        root: {
            flexGrow: 1,
            marginBottom: 30,
        },
        search: {
            flexGrow: 1,
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
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
            color: 'inherit'
        },
        button: {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
        }
    }
});



