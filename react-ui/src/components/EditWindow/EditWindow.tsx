import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { apiWorkouts } from '../../api/api'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditWindow(props: any) {
    const [workoutName, setWorkoutName] = useState('');
    const [workoutDescription, setWorkoutDescription] = useState('');
    const [exercises, setExercises] = useState([] as any);

    const newExercise = {
        "exerciseName": undefined,
        "exerciseReps": undefined,
        "exerciseSets": undefined,
        "exerciseWeight": undefined,
    }

    const onEnter = {
        onEnter: () => {
            setWorkoutName(props.editWindowData.workoutName);
            setWorkoutDescription(props.editWindowData.workoutDescription);
            setExercises(props.editWindowData.exercises)
        }
    }

    const classes = useStyles();


    const exerciseInput = (event: any, index: number, exerciseComponent: string) => {
        const exe = exercises.map((e: any, idx: number) => {
            if (idx === index) {
                return { ...e, [exerciseComponent]: event.target.value }
            }
            return e
        })
        setExercises(exe)
    }

    const upsertWorkout = () => {
        const postUpsert = (res: any) => {
            if (res.ok) {
                apiWorkouts.GetWorkouts().then(props.setWorkoutData)
                console.log("***WORKOUT UPDATED (SHOULD DO SNACKBAR TBH)***")
            }
        }

        const editWindowData = { ...props.editWindowData, workoutName, workoutDescription, exercises }
        if (props.editWindowData._id) {
            apiWorkouts.PutWorkout(editWindowData).then(postUpsert);
            props.setWorkoutData(props.workoutData.map((workout: any) => {
                if (workout._id === props.editWindowData._id) {
                    return editWindowData;
                }
                return workout;
            }));
        } else {
            apiWorkouts.PostWorkout(editWindowData).then(postUpsert);
            props.setWorkoutData([...props.workoutData, editWindowData]);
        }
        props.openEditWindow(false);
    }

    return (
        <Dialog
            maxWidth={"md"}
            fullWidth
            open={props.editWindow}
            TransitionProps={onEnter}
            onClose={() => props.openEditWindow(false)}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
                <TextField
                    value={workoutName}
                    onChange={(event: any) => setWorkoutName(event.target.value)}
                    placeholder="New Workout"
                    helperText="Enter Name of Workout"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
            </DialogTitle>
            <DialogContent>
                <TextField
                    value={workoutDescription}
                    onChange={(event: any) => setWorkoutDescription(event.target.value)}
                    label={"Description"}
                    placeholder={"Description"}
                    fullWidth
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    multiline
                />
                {exercises.map((exerciseData: any, index: number) =>
                    <div className="row" key={index}>
                        <div className="col-sm-6">
                            <TextField
                                value={exerciseData.exerciseName}
                                onChange={(event: any) => exerciseInput(event, index, 'exerciseName')}
                                label={"Exercise Name"}
                                placeholder={"Exercise Name"}
                                fullWidth
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div className="col-sm-2">
                            <TextField
                                value={exerciseData.exerciseReps}
                                onChange={(event: any) => exerciseInput(event, index, 'exerciseReps')}
                                label="Reps"
                                placeholder="Reps"
                                fullWidth
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div className="col-sm-2">
                            <TextField
                                value={exerciseData.exerciseSets}
                                onChange={(event: any) => exerciseInput(event, index, 'exerciseSets')}
                                label="Sets"
                                placeholder="Sets"
                                fullWidth
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div className="col-sm-2">
                            <TextField
                                value={exerciseData.exerciseWeight}
                                onChange={(event: any) => exerciseInput(event, index, 'exerciseWeight')}
                                label="Weight"
                                placeholder="Weight"
                                fullWidth
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <div className="container" style={{ padding: 0, margin: 0 }}>
                    <Button onClick={() => setExercises([...exercises, newExercise])}>
                        Add
                    </Button>
                    <Button onClick={() => setExercises(exercises.filter((e: any, i: number) => i < exercises.length - 1))}>
                        Remove
                    </Button>
                </div>
                <Button onClick={upsertWorkout}>
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}

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