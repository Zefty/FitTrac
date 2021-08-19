import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from "../../contexts/FirebaseContext";
import WorkoutCard from './WorkoutCard';
import AddWorkoutButton from '../../components/AddWorkoutButton/AddWorkoutButton';
import EditWindow from '../../components/EditWindow/EditWindow';
import { apiWorkouts } from '../../api/FitTracAPI'
import { workout } from '../../types/types'
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import FitTracBase from '../../components/FitTracBase/FitTracBase';

export default function Workouts(props: any) {
    const [workoutData, setWorkoutData] = useState<workout[]>([]);
    const [filterWord, searchFilter] = useState('');

    const [editWindow, openEditWindow] = useState(false);
    const [editWindowData, setEditWindowData] = useState<workout>();

    const [callingAPI, setCallingAPI] = useState(true);

    const classes = useStyles();
    const auth = useAuth();

    useEffect(() => {
        console.log("Getting workout data")
        if (!auth.user.uid) {
            console.error("auth.user.uid is empty")
            return;
        }
        console.log(auth.user.uid)
        apiWorkouts.GetWorkouts(auth.user.uid).then((data: any) => {
            setWorkoutData(data)
            setCallingAPI(false)
        })
    }, [auth.user.uid])

    return (
        <FitTracBase searchFilter={searchFilter}>
            <Grid container className={clsx(classes.workoutcards, { [classes.progress]: callingAPI })}>
                {callingAPI && <CircularProgress />}
                {workoutData.filter((workout: any) =>
                    workout.workoutName.toLowerCase().includes(filterWord.toLowerCase())
                ).sort((a: any, b: any) =>
                    Number(b.isFavourite) - Number(a.isFavourite)
                ).map((workout: any) =>
                    <Grid item xs={12} sm={6} md={4}>
                        <WorkoutCard
                            key={workout._id}
                            workout={workout}
                            isDarkMode={props.darkMode}
                            openEditWindow={openEditWindow}
                            workoutData={workoutData}
                            setWorkoutData={setWorkoutData}
                            setEditWindowData={setEditWindowData}
                        />
                    </Grid>
                )}
            </Grid>
            <EditWindow
                editWindow={editWindow}
                openEditWindow={openEditWindow}
                editWindowData={editWindowData}
                workoutData={workoutData}
                setWorkoutData={setWorkoutData}
            />
            <AddWorkoutButton
                openEditWindow={openEditWindow}
                setEditWindowData={setEditWindowData}
            />
        </FitTracBase>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        workoutcards: {
            [theme.breakpoints.up('md')]: {
                width: '85%',
            },
            paddingLeft: 32,
            paddingTop: 32,
        },
        progress: {
            display: 'flex',
            height: 'calc(100vh - 65px)',
            alignItems: 'center',
            justifyContent: 'center',
        }  
    }),
);
