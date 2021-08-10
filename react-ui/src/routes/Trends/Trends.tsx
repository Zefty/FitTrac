// import react components 
import { useEffect, useState } from 'react';
import { apiWorkouts } from '../../api/api';
import FitTracHeader from '../../components/FitTracHeader/FitTracHeader';
import { workout } from '../../types/types';
import TrendCard from './TrendCard'
import WeightCard from './WeightCard';


export default function Trends(props: any) {
    const [workoutData, setWorkoutData] = useState<workout[]>([]);

    useEffect(() => {
        apiWorkouts.GetWorkouts().then(setWorkoutData)
    }, [])

    const searchFilter = () => {
    }

    return (
        <div>
            <FitTracHeader
                toggleDarkMode={props.toggleDarkMode}
                darkMode={props.darkMode}
                searchFilter={searchFilter}
                toggleDrawer={() => props.toggleDrawer()}
            />
            <TrendCard data={workoutData} />
            <WeightCard data={workoutData} />
        </div>
    );

}