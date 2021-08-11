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

export default function FitTracDrawer(props: any) {
    const classes = useStyles();
    return (
        <Drawer classes={{ paper: classes.drawer }} variant={props.desktopMode ? 'persistent' : 'temporary'} open={props.drawer} onClose={props.toggleDrawer}>
            <Typography className={classes.title} variant="h1" noWrap>
                <img src='./dumbbell.png' alt='logo' className={classes.logo} />
                FitTrac
            </Typography>
            <List className={classes.body} onClick={() => {if(!props.desktopMode) props.toggleDrawer()}}>
                <ListItem button key='Home' component={Link} to="/">
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
            <List>
                <ListItem button key='Settings' component={Link} to="/settings">
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary={'Settings'} />
                </ListItem>
            </List>
        </Drawer>
    );
}

const useStyles = makeStyles((theme: any) => {
    return {
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
});