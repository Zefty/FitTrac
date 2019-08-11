import React from 'react';

// import material ui
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

interface IProps{
    openWindow: boolean,
    handleClose: any,
    updateWorkout: any,
    workoutId: number,
    workoutName: string,
    workoutDescription: string, 
}

interface IState{
    workoutName: string,
    workoutDescription: string,
    exerciseData: any,
    initialOpen: boolean,
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

const newExercise: any = {
"exerciseId": 0,
"workoutId": 0,
"exerciseName": "",
"exerciseReps": 0,
"exerciseSets": 0,
}

export default class EditWindow extends React.Component<IProps, IState> {
    public constructor(props:any) {
        super(props);
        this.state = {
            workoutName: "",
            workoutDescription: "",
            exerciseData: [],
            initialOpen: true,
            
        }
        
        
    }


    private openWorkoutDialog = () => {
        if (this.props.workoutId != 0) {
            this.updateWorkoutContents()
        } else if (this.state.initialOpen && this.props.workoutId == 0) {
            this.incrCounter()
            this.setState({initialOpen: false})
        }

        this.setState({workoutName: this.props.workoutName})
        this.setState({workoutDescription: this.props.workoutDescription})
    }

    public updateWorkoutContents = () => {
        fetch('https://fittracapi.azurewebsites.net/api/Exercises/FilterdExercise?WorkoutId='+this.props.workoutId, {
            method:'GET'
        }).then((ret:any) => {
            return ret.json();
        }).then((output:any) => {
            // console.log(output)
            this.setState({exerciseData: output})
            // console.log(this.state.exerciseData)
        })
    }

    private changeWorkoutName = (event: any) => { 
        this.setState({workoutName: event.target.value})
    }

    private changeWorkoutDescription = (event: any) => { 
        this.setState({workoutDescription: event.target.value})
    }

    private changeExerciseName = (event: any) => { 
        const newExerciseData = this.state.exerciseData
        console.log(newExerciseData)
        newExerciseData[0].exerciseName = event.target.value
        this.setState({exerciseData: newExerciseData})
    }

    private changeExerciseReps= (event: any) => { 
        const newExerciseData = this.state.exerciseData
        console.log(newExerciseData)
        newExerciseData[0].exerciseReps = event.target.value
        this.setState({exerciseData: newExerciseData})
    }

    private changeExerciseSets = (event: any) => { 
        const newExerciseData = this.state.exerciseData
        console.log(newExerciseData)
        newExerciseData[0].exerciseSets = event.target.value
        this.setState({exerciseData: newExerciseData})
    }



    public render() {
        
        
        return (
            <div>
                
                <Dialog
                maxWidth={"md"}
                fullWidth
                open={this.props.openWindow}
                onEnter={this.openWorkoutDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                >
            

                <DialogTitle id="alert-dialog-slide-title">
                
                    <TextField
                        id="outlined-full-width"
                        value={this.state.workoutName}
                        onChange={this.changeWorkoutName}
                        placeholder="New Workout"
                        helperText="Enter Name of Workout"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />

                    {/* <DialogContentText id="alert-dialog-slide-description">
                        Add your workout routine. You can add exercises with the + button and 
                        type in the number of sets, time, and etc in the boxes. 
                    </DialogContentText> */}

                </DialogTitle>
                <DialogContent>
                    <this.body/>
                </DialogContent>
                <DialogActions>
                    <div className="container" style={{padding: 0, margin: 0}}>
                        <Button onClick={() => this.incrCounter()} color="primary">
                        Add
                        </Button>
                        <Button onClick={() => this.decrCounter()} color="primary">
                        Remove
                        </Button>
                    </div>
                    
                    <Button onClick={this.addWorkout} color="primary">
                        Done
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        );
    }

    private addWorkout = () => {
        const addWorkoutData = {
            "workoutId": this.props.workoutId,
            "workoutName": this.state.workoutName,
            "workoutDescription": this.state.workoutDescription,
            "isFavourite": false,
            "exercises": this.state.exerciseData
        }
        console.log(addWorkoutData)
        fetch('https://fittracapi.azurewebsites.net/api/Workouts', {
            body: JSON.stringify(addWorkoutData),
            headers: {
                Accept: "text/plain",
                "Content-Type": "application/json-patch+json"
            },
            method:'POST'
        }).then((response: any) => {
            if (response.ok) {
                this.props.handleClose()   
                this.props.updateWorkout()
            } else {
                
            }
        })
    }

    private incrCounter = () => {
        this.state.exerciseData.push(newExercise) 
        console.log(this.state.exerciseData)
        this.forceUpdate()
    }

    private decrCounter = () => {
        if (this.state.exerciseData.length > 1) {
            this.state.exerciseData.pop()
            console.log(this.state.exerciseData)
        }
        this.forceUpdate()
    }

    private body = () => {
        const classes = useStyles();
        return (
            <div>
                <TextField
                id="outlined-Exercise"
                value={this.state.workoutDescription}
                onChange={this.changeWorkoutDescription}
                label={"Description"}
                placeholder={"Description"}
                fullWidth
                className={classes.textField}
                margin="normal"
                variant="outlined"
                multiline
                />
                {this.state.exerciseData.map((exerciseData: any, index: number) =>
                    <div className="row" key={index}>
                        {/* style={{margin: 0, padding: 0}} */}
                        <div className="col-sm-8">
                            <TextField
                            id="outlined-Exercise"
                            value={exerciseData.exerciseName || ''}
                            onChange={this.changeExerciseName}
                            label={"Exercise "}
                            placeholder={"Exercise "}
                            fullWidth
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                        </div>

                        <div className="col-sm-2">
                            <TextField
                            id="outlined-Reps"
                            value={exerciseData.exerciseReps}
                            onChange={this.changeExerciseReps}
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
                            id="outlined-Sets"
                            value={exerciseData.exerciseSets}
                            onChange={this.changeExerciseSets}
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
        );
    }
}