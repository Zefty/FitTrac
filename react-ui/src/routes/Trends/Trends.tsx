// import react components 
import { useEffect, useState } from 'react';
import { apiWorkouts } from '../../api/FitTracAPI';
import { workout } from '../../types/types';
import TrendCard from './TrendCard'
import WeightCard from './WeightCard';
import { useAuth } from "../../contexts/FirebaseContext";
import FitTracBase from '../../components/FitTracBase/FitTracBase';

export default function Trends(props: any) {
    const [workoutData, setWorkoutData] = useState<workout[]>([]);

    const auth = useAuth();

    useEffect(() => {
        apiWorkouts.GetWorkouts(auth.user.uid).then(setWorkoutData)
    }, [auth.user.uid])


    return (
        <FitTracBase>
            <TrendCard data={workoutData} />
            <WeightCard data={workoutData} />
        </FitTracBase>
    );

}