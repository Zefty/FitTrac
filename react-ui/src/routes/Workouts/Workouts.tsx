import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from "../../api/firebase";
import WorkoutCard from './WorkoutCard';
import AddWorkoutButton from '../../components/AddWorkoutButton/AddWorkoutButton';
import FitTracHeader from '../../components/FitTracHeader/FitTracHeader';
import EditWindow from '../../components/EditWindow/EditWindow';
import { apiWorkouts } from '../../api/api'
import { workout } from '../../types/types'
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

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
        <div className={classes.root}>
            <FitTracHeader
                toggleDarkMode={props.toggleDarkMode}
                darkMode={props.darkMode}
                searchFilter={searchFilter}
                toggleDrawer={() => props.toggleDrawer()}
            />
            <div className={clsx(classes.workoutcards, { [classes.progress]: callingAPI })}>
                {callingAPI && <CircularProgress/>}
                {workoutData.filter((workout: any) =>
                    workout.workoutName.toLowerCase().includes(filterWord.toLowerCase())
                ).sort((a: any, b: any) =>
                    Number(b.isFavourite) - Number(a.isFavourite)
                ).map((workout: any) =>
                    <WorkoutCard
                        key={workout._id}
                        workout={workout}
                        isDarkMode={props.darkMode}
                        openEditWindow={openEditWindow}
                        workoutData={workoutData}
                        setWorkoutData={setWorkoutData}
                        setEditWindowData={setEditWindowData}
                    />
                )}
            </div>
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
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            // flexWrap: 'wrap',
            // flexGrow: 1,
            // alignItems: 'center',
            // justifyContent: 'center',
        },
        progress: {
            display: 'flex',
            height: 'calc(100vh - 64px)',
            alignItems: 'center',
            justifyContent: 'center',
        },
        workoutcards: {
            // alignItems: 'center',
            // flexGrow: 1,
            
            // position: 'absolute',
            // zIndex: 9999
        }
    }),
);
