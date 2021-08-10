import { createStyles, makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function AddWorkoutButton(props: any) {
    const classes = useStyles();

    const emptyWorkout = {
        _id: "",
        workoutName: "",
        workoutDescription: "",
        exercises: [{ exerciseName: "", exerciseSets: "", exerciseReps: "", exerciseWeight: "" }]
    }

    return (
        <div>
            <Fab style={{ background: '#B01D39' }} aria-label="add" className={classes.fab} onClick={() => { props.openEditWindow(true); props.setEditWindowData(emptyWorkout) }}>
                <AddIcon style={{ color: 'white' }} />
            </Fab>
        </div>
    )
}

const useStyles = makeStyles((theme) =>
    createStyles({
        fab: {
            margin: 32,
            right: 0,
            bottom: 0,
            position: 'fixed',

        },
        extendedIcon: {
            marginRight: theme.spacing(1),

        },
    }),
);


