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
    workoutId: number,
    workoutName: string,
    workoutDescription: string,
    handleOpen: any, 
    handleClose: any,
}

interface IState{
    workoutName: string,
    workoutDescription: string,
    exerciseData: any,
    exerciseName: string,
    exerciseReps: number,
    exerciseSets: number,
    
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

var numRow:number[] = [1]

export default class EditWindow extends React.Component<IProps, IState> {
    public constructor(props:any) {
        super(props);
        this.state = {
            workoutName: "",
            workoutDescription: "",
            exerciseData: [],
            exerciseName: "",
            exerciseReps: 0,
            exerciseSets: 0,
            
        }
        
        
    }

    public updateWorkoutContents = () => {
        fetch('https://fittracapi.azurewebsites.net/api/Exercises/FilterdExercise?WorkoutId='+this.props.workoutId, {
            method:'GET'
        }).then((ret:any) => {
            return ret.json();
        }).then((output:any) => {
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

    private openWorkoutDialog = () => {
        this.updateWorkoutContents()
        this.setState({workoutName: this.props.workoutName})
        this.setState({workoutDescription: this.props.workoutDescription})
    }

    public render() {
        
        
        return (
            <div>
                
                {/* <Button variant="outlined" color="primary" onClick={this.props.handleOpen}>
                Slide in alert dialog
                </Button> */}
                
                <Dialog
                maxWidth={"md"}
                // fullWidth
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
                    
                    <Button onClick={this.addRoutine} color="primary">
                        Done
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        );
    }

    private addRoutine = () => {
        this.props.handleClose()   
    }

    private incrCounter = () => {
        numRow.push(numRow[numRow.length-1]+1) 
        console.log(numRow)
        this.forceUpdate()
    }

    private decrCounter = () => {
        if (numRow.length > 1) {
            numRow.pop()
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
                            value={exerciseData.exerciseName}
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