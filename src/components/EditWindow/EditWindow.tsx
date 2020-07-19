// import react components
import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as Types from '../Types/Types'

// setup props and states
interface IProps {
    openEditWindow: boolean,
    handleClose: any,
    updateWorkout: any,
    isDarkMode: boolean,
    workoutData: Types.IWorkout,
}

export default function EditWindow(props: IProps) {
    // Setup states 
    const [workoutData, setWorkoutData] = useState(props.workoutData)
    
    const newExercise: Types.IExercise = { exerciseId: 0, exerciseName: "", exerciseReps: 0, exerciseSets: 0, workoutId: 0 }

    const classes = useStyles();

    const handleChange = (e: any, index: number) => {
        console.log(e.target.name); // Logs correctly
        console.log(e.target.value); // Logs correctly
        const { name, value } = e.target;
        let exercises;
        switch (name) {
            case "workoutName":
                setWorkoutData({ ...workoutData, workoutName: value });
                break;
            case "workoutDescription":
                setWorkoutData({ ...workoutData, workoutDescription: value });
                break;
            case "exerciseName":
                exercises = workoutData.exercises
                exercises[index].exerciseName = value
                setWorkoutData({ ...workoutData, exercises: exercises });
                break;
            case "exerciseReps":
                exercises = workoutData.exercises
                exercises[index].exerciseReps = value
                setWorkoutData({ ...workoutData, exercises: exercises });
                break;
            case "exerciseSets":
                exercises = workoutData.exercises
                exercises[index].exerciseSets = value
                setWorkoutData({ ...workoutData, exercises: exercises });
                break;
        }
    };

    // update existing workout or upload new workout 
    const uploadWorkout = () => {
        // workout id = 0 is defined as creating new workout, otherwise put request to edit existing workout 
        if (workoutData.workoutId === 0) {
            fetch('https://localhost:5000/api/Workouts', {
                body: JSON.stringify(workoutData),
                headers: {
                    Accept: "text/plain",
                    "Content-Type": "application/json-patch+json"
                },
                method: 'POST'
            }).then((response: any) => {
                if (response.ok) {
                    props.handleClose()
                    props.updateWorkout()
                } else {

                }
            })
        } else {
            console.log(workoutData)
            // using own edit workout method that edits workouts and exercises at the same time 
            fetch('https://localhost:5000/api/Workouts/EditWorkout?id=' + workoutData.workoutId, {
                body: JSON.stringify(workoutData),
                headers: {
                    Accept: "text/plain",
                    "Content-Type": "application/json-patch+json"
                },
                method: 'PUT'
            }).then((response: any) => {
                if (response.ok) {
                    props.updateWorkout()
                    props.handleClose()
                } else {

                }
            })
        }
    }

    return (
        <div>
            {/* parent components will invoke the edit window/dialog */}
            <Dialog
                maxWidth={"md"}
                fullWidth
                open={props.openEditWindow}
                onEnter={() => {setWorkoutData(props.workoutData)}}
                TransitionComponent={Transition}
                onClose={() => {setWorkoutData(props.workoutData); props.handleClose()}}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >

                {/* workout name */}
                <DialogTitle id="alert-dialog-slide-title">
                    <TextField
                        name='workoutName'
                        id="outlined-full-width"
                        value={workoutData.workoutName}
                        onChange={(e) => handleChange(e, 0)}
                        placeholder="New Workout"
                        helperText="Enter Name of Workout"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                </DialogTitle>

                {/* exercises as body of edit window */}
                <DialogContent>
                    <div>
                        {/* workout description */}
                        <TextField
                            name='workoutDescription'
                            id="outlined-Exercise"
                            value={workoutData.workoutDescription}
                            onChange={(e) => handleChange(e, 0)}
                            label={"Description"}
                            placeholder={"Description"}
                            fullWidth
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            multiline
                        />
                        {/* use mapping to display all exercises */}
                        {workoutData.exercises.map((exerciseData: any, index: number) =>
                            <div className="row" key={index}>
                                {/* exercise name */}
                                <div className="col-sm-8">
                                    <TextField
                                        name="exerciseName"
                                        id="outlined-Exercise"
                                        value={exerciseData.exerciseName}
                                        onChange={(e) => handleChange(e, index)}
                                        label={"Exercise Name"}
                                        placeholder={"Exercise Name"}
                                        fullWidth
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </div>

                                {/* exercise reps */}
                                <div className="col-sm-2">
                                    <TextField
                                        name="exerciseReps"
                                        id="outlined-Reps"
                                        value={exerciseData.exerciseReps}
                                        onChange={(e) => handleChange(e, index)}
                                        label="Reps"
                                        placeholder="Reps"
                                        fullWidth
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </div>

                                {/* exercise sets */}
                                <div className="col-sm-2">
                                    <TextField
                                        name="exerciseSets"
                                        id="outlined-Sets"
                                        value={exerciseData.exerciseSets}
                                        onChange={(e) => handleChange(e, index)}
                                        label="Sets"
                                        placeholder="Sets"
                                        fullWidth
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>

                {/* buttons for adding removing and finishing changes to workout */}
                <DialogActions>
                    <div className="container" style={{ padding: 0, margin: 0 }}>
                        <Button onClick={() => setWorkoutData({ ...workoutData, exercises: [...workoutData.exercises, newExercise] })}>
                            Add
                        </Button>
                        <Button onClick={() => {
                            if (workoutData.exercises.length > 1)
                                setWorkoutData({ ...workoutData, exercises: workoutData.exercises.slice(0, workoutData.exercises.length - 1) })
                        }}>
                            Remove
                        </Button>
                    </div>
                    <Button onClick={uploadWorkout}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

// transition animation 
const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


// Use material ui theming 
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(0),
            marginRight: theme.spacing(0),
        },
        dense: {
            marginTop: 0,
        },
        // menu: {
        // //   width: 200,
        // },
    }),
);