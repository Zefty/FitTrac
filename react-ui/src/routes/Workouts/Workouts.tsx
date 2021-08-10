import { useState } from 'react';
import { useEffect } from 'react';
import WorkoutCard from './WorkoutCard';
import AddWorkoutButton from '../../components/AddWorkoutButton/AddWorkoutButton';
import FitTracHeader from '../../components/FitTracHeader/FitTracHeader';
import EditWindow from '../../components/EditWindow/EditWindow';
import { apiWorkouts } from '../../api/api'
import { workout } from '../../types/types'

export default function Workouts(props: any) {
    const [workoutData, setWorkoutData] = useState<workout[]>([]);
    const [filterWord, searchFilter] = useState('');

    const [editWindow, openEditWindow] = useState(false);
    const [editWindowData, setEditWindowData] = useState<workout>();

    useEffect(() => {
        apiWorkouts.GetWorkouts().then(setWorkoutData)
    }, [])

    return (
        <div>
            <FitTracHeader
                toggleDarkMode={props.toggleDarkMode}
                darkMode={props.darkMode}
                searchFilter={searchFilter}
                toggleDrawer={() => props.toggleDrawer()}
            />
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


