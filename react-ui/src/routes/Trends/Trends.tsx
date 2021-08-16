// import react components 
import { useEffect, useState } from 'react';
import { apiWorkouts } from '../../api/api';
import FitTracHeader from '../../components/FitTracHeader/FitTracHeader';
import { workout } from '../../types/types';
import TrendCard from './TrendCard'
import WeightCard from './WeightCard';
import { useAuth } from "../../api/firebase";

export default function Trends(props: any) {
    const [workoutData, setWorkoutData] = useState<workout[]>([]);

    const auth = useAuth();

    useEffect(() => {
        apiWorkouts.GetWorkouts(auth.user.uid).then(setWorkoutData)
    }, [auth.user.uid])

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