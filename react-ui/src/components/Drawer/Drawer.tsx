import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';
import BookIcon from '@material-ui/icons/Book';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useFitTracTheme } from '../../contexts/FitTracThemeContext';

export default function FitTracDrawer(props: any) {
    const { fitTracTheme, deviceMode, toggleDeviceMode } = useFitTracTheme();
    const classes = useStyles();
    return (
        <Drawer 
            classes={{ paper: classes.drawer }} 
            variant={deviceMode ? 'persistent' : 'temporary'} 
            open={props.drawer} 
            onClose={props.toggleDrawer}
            SlideProps={{onExited: () => toggleDeviceMode(window.innerWidth >= fitTracTheme.breakpoints.values.lg)}}>
            <Typography className={classes.title} variant="h1" noWrap>
                <img src='./dumbbell.png' alt='logo' className={classes.logo} />
                FitTrac
            </Typography>
            <List className={classes.body} onClick={() => { if (!deviceMode) props.toggleDrawer() }}>
                <ListItem button key='Home' component={Link} to="/home">
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary={'Home'} />
                </ListItem>
                <ListItem button key='Workouts' component={Link} to="/workouts">
                    <ListItemIcon><BookIcon /></ListItemIcon>
                    <ListItemText primary={'Workouts'} />
                </ListItem>
                <ListItem button key='Trends' component={Link} to="/trends">
                    <ListItemIcon><AssessmentIcon /></ListItemIcon>
                    <ListItemText primary={'Trends'} />
                </ListItem>
            </List>
            <List onClick={() => { if (!deviceMode) props.toggleDrawer() }}>
                <ListItem button key='Settings' component={Link} to="/settings">
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary={'Settings'} />
                </ListItem>
            </List>
        </Drawer>
    );
}

const useStyles = makeStyles((theme: any) => (
    {
        drawer: {
            width: 300,
        },
        logo: {
            width: 40,
            height: 40,
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
        title: {
            fontSize: 50,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            // justifyContent: 'center'
        },
        body: {
            flexGrow: 1
        }
    }
));