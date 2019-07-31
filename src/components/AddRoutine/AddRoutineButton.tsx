import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: 10,
      right: 30,
      bottom: 30,  
      position: 'fixed'
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

export default function AddRoutineButton() {
  const classes = useStyles();

  return (
    <div>
      <Fab color="secondary" aria-label="add" className={classes.fab} onClick={() => { console.log('onClick'); }}>
        <AddIcon />
      </Fab>
    </div>
  );
}