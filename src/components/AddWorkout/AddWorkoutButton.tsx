/* 
AddWorkoutButton:

FAB button for creating a new workout 
*/
import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditWindow from '../EditWindow/EditWindow';
import * as Types from '../Types/Types'

interface IProps {
  updateWorkout: any,
  isDarkMode: boolean,
}

export default function AddWorkoutButton(props: IProps) {
  // Setup states
  const [openEditWindow, setOpenEditWindow] = useState(false)
  const classes = useStyles();

  const newExercise: Types.IExercise = {exerciseId: 0, exerciseName: "", exerciseReps: 0, exerciseSets: 0, workoutId: 0}
  const newWorkoutData: Types.IWorkout = { workoutId: 0, workoutName: "", workoutDescription: "", isFavourite: false, exercises: [newExercise] }
  return (
    <div>
      {EditWindow(
        {
          openEditWindow: openEditWindow,
          handleClose: () => setOpenEditWindow(!openEditWindow),
          updateWorkout: props.updateWorkout,
          isDarkMode: props.isDarkMode,
          workoutData: newWorkoutData
        }
      )}

      <Fab style={{ background: '#B01D39', zIndex: 9999 }} aria-label="add" className={classes.fab} onClick={() => setOpenEditWindow(!openEditWindow)}>
        <AddIcon style={{ color: 'white' }} />
      </Fab>
    </div>
  )
}

// Material ui theming 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: 8,
      right: 0,
      bottom: 0,
      position: 'fixed',

    },
    extendedIcon: {
      marginRight: theme.spacing(1),

    },
  }),
);
