import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FavoriteIconUnclicked from '@material-ui/icons/FavoriteBorder';
import FavoriteIconClicked from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditWindow from '../EditWindow/EditWindow';
import Delete from '@material-ui/icons/Clear';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

interface IProps{
  data: any,
  updateWorkout: any,
  isDarkMode: boolean,
}

interface IState{
  openWindow: boolean,
  favorite: boolean,
  openDeleteWorkoutWindow: boolean
}

export default class WorkoutCard extends React.Component<IProps, IState>{
  constructor(props: any) {
      super(props)
      this.state = {
        openWindow: false,
        favorite: false,
        openDeleteWorkoutWindow: false 
      }
  }

  public render() {
    return(
      <div>
        <this.Card/>
      </div> 
    )
  }

  private Card = () => {
    const classes = useStyles();
    return (
      <div>
        <EditWindow
        openWindow={this.state.openWindow} 
        handleClose={this.handleClose}
        updateWorkout={this.props.updateWorkout}
        workoutId={this.props.data.workoutId} 
        workoutName={this.props.data.workoutName}
        workoutDescription={this.props.data.workoutDescription} 
        isDarkMode={this.props.isDarkMode}
        />
        <Card className={classes.card}>

          <CardContent>
            <Typography className={classes.title} gutterBottom>
              {this.props.data.workoutName}
            </Typography>
            <Typography className={classes.pos}>
              {this.props.data.workoutDescription} 
            </Typography>
          </CardContent>

          <CardActions>
            <Button size="medium" onClick={this.viewEdit}>
              View & Edit
            </Button>

            <IconButton size="medium" onClick={this.toggleFavourite}  style={{marginLeft: 'auto'}}>
              {this.props.data.isFavourite ? <FavoriteIconClicked/> : <FavoriteIconUnclicked/> }
            </IconButton>

            <IconButton size="medium" onClick={this.openDeleteWorkoutWindow}> 
              <Delete/>
            </IconButton>
          </CardActions>
        </Card>

        <Dialog
        open={this.state.openDeleteWorkoutWindow}
        onClose={this.closeDeleteWorkoutWindow}
        >
        <DialogContent>
          <Typography className={classes.title} color="textPrimary" gutterBottom >
            Are you sure you want to delete "{this.props.data.workoutName}" ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.deleteWorkoutConfirm}>
          Yes
          </Button>
          <Button onClick={this.closeDeleteWorkoutWindow}>
          No
          </Button>
        </DialogActions>
        </Dialog>
        
      </div>
    );
  }

  public viewEdit = () => {
    this.setState({openWindow: true})
  }

  public handleClose = () => {
    this.setState({openWindow: false})
  }

  private openDeleteWorkoutWindow = () => {
    this.setState({openDeleteWorkoutWindow: true})
  }

  private closeDeleteWorkoutWindow = () => {
    this.setState({openDeleteWorkoutWindow: false})
  }

  private deleteWorkoutConfirm = () => {
    fetch('https://fittracapi.azurewebsites.net/api/Workouts/'+this.props.data.workoutId, {
      method: 'DELETE'
    }).then((response : any) => {
      if (response.ok) {
          console.log("ok")
          this.props.updateWorkout()
          this.closeDeleteWorkoutWindow()
      }
    })
  }

  public toggleFavourite = () => {
    const addWorkoutData = {
      "workoutId": this.props.data.workoutId,
      "workoutName": this.props.data.workoutName,
      "workoutDescription": this.props.data.workoutDescription,
      "isFavourite": !this.props.data.isFavourite,
      "exercises": []
    }
    fetch('https://fittracapi.azurewebsites.net/api/Workouts/'+this.props.data.workoutId, {
      body: JSON.stringify(addWorkoutData),
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json-patch+json"},
      method: 'PUT'
    }).then((response : any) => {
      if (response.ok) {
          console.log("ok")
          this.props.updateWorkout()
      }
    })
  }
  
}

const useStyles = makeStyles(
  createStyles({
    card: {
      // minWidth: 350,
      // maxWidth: 550,
      marginBottom: 30,
    },
    bullet: {
      display: 'inline-block',
      margin: '0px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    pos: {
      minHeight: 100,
    },
  }),
);


