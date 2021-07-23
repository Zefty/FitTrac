// import react components
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// setup props and states
interface IProps{
    openWindow: boolean,
    handleClose: any,
    updateWorkout: any,
    _id: string,
    workoutName: string,
    workoutDescription: string, 
    exerciseData: any,
    isDarkMode: boolean,
}

interface IState{
    workoutName: string,
    workoutDescription: string,
    exerciseData: any,
}

export default class EditWindow extends React.Component<IProps, IState> {
    public constructor(props:any) {
        super(props);
        this.state = {
            workoutName: "",
            workoutDescription: "",
            exerciseData: [{exerciseName: "", exerciseSets: "", exerciseReps: "", exerciseWeight: ""}]
        }
    }

    public render() {
        return (
            <div>
                {/* parent components will invoke the edit window/dialog */}
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
                
                {/* workout name */}
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

                </DialogTitle>

                {/* exercises as body of edit window */}
                <DialogContent>
                    <this.body/>
                </DialogContent>

                {/* buttons for adding removing and finishing changes to workout */}
                <DialogActions>
                    <div className="container" style={{padding: 0, margin: 0}}>
                        <Button onClick={() => this.incrCounter()}>
                        Add
                        </Button>
                        <Button onClick={() => this.decrCounter()}>
                        Remove
                        </Button>
                    </div>
                    <Button onClick={this.uploadWorkout}>
                        Done
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        );
    }

    private body = () => {
        // uyse mat ui theming 
        const classes = useStyles();
        return (
            <div>
                {/* workout description */}
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
                {/* use mapping to display all exercises */}
                {this.state.exerciseData.map((exerciseData: any, index: number) =>
                    <div className="row" key={index}>
                        {/* exercise name */}
                        <div className="col-sm-6">
                            <TextField
                            id="outlined-Exercise"
                            value={exerciseData.exerciseName}
                            onChange={(event) => {this.changeExerciseName(event, index)}}
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
                            id="outlined-Reps"
                            value={exerciseData.exerciseReps}
                            onChange={(event) => {this.changeExerciseReps(event, index)}}
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
                            id="outlined-Sets"
                            value={exerciseData.exerciseSets}
                            onChange={(event) => {this.changeExerciseSets(event, index)}}
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
                            id="outlined-Weight"
                            value={exerciseData.exerciseWeight}
                            onChange={(event) => {this.changeExerciseSets(event, index)}}
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
            </div>
        );
    }

    // initial opening of edit window either calls for exercises 
    // of existing workout or sets state for creating new workout/exercises
    private openWorkoutDialog = () => {
        if (this.props._id === null) {
            this.setState({exerciseData: [{
                "exerciseName": "",
                "exerciseReps": "",
                "exerciseSets": "",
                "exerciseWeight": ""
                }]})
        }
        this.setState({workoutName: this.props.workoutName})
        this.setState({workoutDescription: this.props.workoutDescription})
        this.setState({exerciseData: JSON.parse(JSON.stringify(this.props.exerciseData))})
    }

    // update existing workout or upload new workout 
    private uploadWorkout = () => {
        const workoutData = {
            "workoutName": this.state.workoutName,
            "workoutDescription": this.state.workoutDescription,
            "isFavourite": false,
            "exercises": this.state.exerciseData
        }
        // workout id = 0 is defined as creating new workout, otherwise put request to edit existing workout 
        if (this.props._id === "") {
            fetch('https://fittracr.herokuapp.com/workouts', {
                body: JSON.stringify(workoutData),
                headers: {
                    "Content-Type": "application/json"
                },
                method:'POST'
            }).then((response: any) => {
                if (response.ok) {
                    this.props.handleClose()   
                    this.props.updateWorkout()
                } else {
                    
                }
            })
        } else {
            // using own edit workout method that edits workouts and exercises at the same time 
            fetch('https://fittracr.herokuapp.com/workouts', {
                body: JSON.stringify({_id: this.props._id, ...workoutData}),
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'PUT'
            }).then((response : any) => {
                if (response.ok) {
                    this.props.updateWorkout()
                    this.props.handleClose()   
                } else {

                }
            })
        }
        
    }

    // add new exercises when add button clicked 
    private incrCounter = () => {
        this.state.exerciseData.push({
            "exerciseName": undefined,
            "exerciseReps": undefined,
            "exerciseSets": undefined,
            "exerciseWeight": undefined,
            }) 
        this.forceUpdate()
    }

    // delete exercises when delete button clicked
    private decrCounter = () => {
        if (this.state.exerciseData.length > 1) {
            this.state.exerciseData.pop()
            console.log(this.state.exerciseData)
        }
        this.forceUpdate()
    }

    // methods to change textfields 
    private changeWorkoutName = (event: any) => { 
        this.setState({workoutName: event.target.value})
    }

    private changeWorkoutDescription = (event: any) => { 
        this.setState({workoutDescription: event.target.value})
    }

    private changeExerciseName = (event: any, index: number) => {
        var newExerciseData = this.state.exerciseData
        newExerciseData[index].exerciseName = event.target.value
        this.setState({exerciseData: newExerciseData})
    }

    private changeExerciseReps = (event: any, index: number) => { 
        const newExerciseData = this.state.exerciseData
        newExerciseData[index].exerciseReps = event.target.value
        this.setState({exerciseData: newExerciseData})
    }

    private changeExerciseSets = (event: any, index: number) => { 
        const newExerciseData = this.state.exerciseData
        newExerciseData[index].exerciseSets = event.target.value
        this.setState({exerciseData: newExerciseData})
    }

    private changeExerciseWeight = (event: any, index: number) => { 
        const newExerciseData = this.state.exerciseData
        newExerciseData[index].exerciseWeight = event.target.value
        this.setState({exerciseData: newExerciseData})
    }
}

// transition animation 
const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// mat ui theming 
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