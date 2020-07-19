// import react components
import React, { useState, useEffect } from 'react'
// import WorkoutCard from './WorkoutCard';
import AddWorkoutButton from '../AddWorkout/AddWorkoutButton';

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
// import Delete from '@material-ui/icons/Clear';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';

import * as Types from '../Types/Types'

interface IProps {
  isDarkMode: boolean,
}

// state containing the workout data from dbo.Workouts 
interface IState {
  workoutData: any
}

export default function Workouts(props: IProps) {
  // constructor(props: any) {
  //   super(props)
  //   this.state = {
  //     workoutData: [],
  //   }
  //   // always update workout data 
  //   this.updateWorkouts();
  // }
  const newExercise: Types.IExercise = { exerciseId: 0, exerciseName: "", exerciseReps: 0, exerciseSets: 0, workoutId: 0 }
  const newWorkoutData: Types.IWorkout = { workoutId: 0, workoutName: "", workoutDescription: "", isFavourite: false, exercises: [newExercise] }

  const [workoutData, setWorkoutData] = useState([])
  const [currentWorkoutData, setCurrentWorkoutData] = useState(newWorkoutData)
  const [openEditWindow, setOpenEditWindow] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [openDeleteWorkoutWindow, setOpenDeleteWorkoutWindow] = useState(false)

 


  // get reqest for all the workouts in database
  const updateWorkouts = () => {
    fetch('https://localhost:5000/api/Workouts/WorkoutsAndExercises', {
      method: 'GET'
    }).then((ret: any) => {
      return ret.json();
    }).then((output: any) => {
      console.log(output)
      setWorkoutData(output)
    })
  }

  // updateWorkouts()

  useEffect(updateWorkouts, [])

  const classes = useStyles();
  return (
    <div>
      {/* use imported add workout button */}
      <AddWorkoutButton {... { updateWorkout: updateWorkouts, isDarkMode: props.isDarkMode }} />
      <div className="container" style={{ paddingBottom: '3rem' }}>
        <div className="row">

          {workoutData.map((workoutData: Types.IWorkout, index: number) =>
            <div className="col-md-6 col-lg-4" key={index}>
              {/* <WorkoutCard workoutData={workoutData} updateWorkout={this.updateWorkouts} isDarkMode={this.props.isDarkMode}/> */}
              <div>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} gutterBottom>
                      {workoutData.workoutName}
                    </Typography>
                    <Typography className={classes.pos}>
                      {workoutData.workoutDescription}
                    </Typography>
                  </CardContent>

                  {/* create buttons for viewing/editing workouts as well as delete and favourite */}
                  <CardActions>
                    <Button size="medium" onClick={() => {setCurrentWorkoutData(workoutData); setOpenEditWindow(!openEditWindow)}}>
                      View & Edit
                    </Button>

                    {/* <IconButton size="medium" onClick={this.toggleFavourite} style={{ marginLeft: 'auto' }}>
                      {this.props.workoutData.isFavourite ? <FavoriteIconClicked /> : <FavoriteIconUnclicked />}
                    </IconButton>

                    <IconButton size="medium" onClick={this.openDeleteWorkoutWindow}>
                      <Delete />
                    </IconButton> */}
                  </CardActions>
                </Card>

                {/* if delete button pressed open confirm dialog */}
                {/* <Dialog
          open={this.state.openDeleteWorkoutWindow}
          onClose={this.closeDeleteWorkoutWindow}
          >
          <DialogContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom >
              Are you sure you want to delete "{this.props.workoutData.workoutName}" ?
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
           */}
              </div>
            </div>
          )}
        </div>
      </div>
      {EditWindow(
            {
              openEditWindow: openEditWindow,
              handleClose: () => setOpenEditWindow(!openEditWindow),
              updateWorkout: updateWorkouts,
              isDarkMode: props.isDarkMode,
              workoutData: currentWorkoutData
            }
          )}
    </div>
  );


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
