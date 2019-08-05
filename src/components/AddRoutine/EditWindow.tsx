import React from 'react';

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
    handleOpen: any, 
    handleClose: any 
}

interface IState{

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
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: 16,
    },
    menu: {
    //   width: 200,
    },
  }),
);

var numRow:number[] = [1]

export default class EditWindow extends React.Component<IProps, IState> {
    public constructor(props:any) {
        super(props);
        this.state = {
            
        }
    }

    public render() {
        
        
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.props.handleOpen}>
                Slide in alert dialog
                </Button>
                
                <Dialog
                maxWidth={"md"}
                // fullWidth
                open={this.props.openWindow}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                >

                <DialogTitle id="alert-dialog-slide-title">{"Add Workout Routine"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Add your workout routine. You can add exercises with the + button and 
                        type in the number of sets, time, and etc in the boxes. 
                    </DialogContentText>

                    <div className="routineInputs">
                        <this.body/>
                    </div>




                </DialogContent>
                <DialogActions>
                    <div className="container">
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
            <div className="container">
                {numRow.map(numRow =>
                    <div className="row">
                        <div className="col-sm-8">
                            <TextField
                            id="filled-textarea"
                            label="Exercise"
                            placeholder="Exercise"
                            multiline
                            fullWidth
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                            />
                        </div>

                        <div className="col-sm-2">
                            <TextField
                            id="filled-textarea"
                            label="Reps"
                            placeholder="Reps"
                            multiline
                            fullWidth
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                            />
                        </div>

                        <div className="col-sm-2">
                            <TextField
                            id="filled-textarea"
                            label="Sets"
                            placeholder="Sets"
                            multiline
                            fullWidth
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}