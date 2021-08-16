import { makeStyles } from "@material-ui/core";
import clsx from 'clsx';


export default function Resizer(props: any) {
    const classes = useStyles()
    return (
        <div className={clsx(classes.app, { [classes.appShift]: props.drawer && props.desktopMode })}>
            {props.children}
        </div>
    )
    
}

const useStyles = makeStyles((theme) => (
    {
        app: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appShift: {
            marginLeft: 300,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }
    }
))
