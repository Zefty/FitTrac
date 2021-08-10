import { workout } from '../types/types'

export const apiWorkouts = {
    GetWorkouts: async(): Promise<workout[]> => {
        return await fetch('https://fittracr.herokuapp.com/workouts', {
            method: 'GET'
        }).then((response: any) => {
            return response.json();
        });
    },
    PostWorkout: async(workoutData: any) => {
        const {_id, ...data} = workoutData;
        return await fetch('https://fittracr.herokuapp.com/workouts', {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST'
        }).then((response: any) => {
            return response;
        });
    },
    PutWorkout: async(workoutData: any) => {
        return await fetch('https://fittracr.herokuapp.com/workouts', {
            body: JSON.stringify(workoutData),
            headers: {
                "Content-Type": "application/json"
            },
            method: 'PUT'
        }).then((response: any) => {
            return response;
        });
    },
    DeleteWorkout: async(workoutData: any) => {
        return await fetch('https://fittracr.herokuapp.com/workouts', {
            body: JSON.stringify(workoutData),
            headers: {
                "Content-Type": "application/json"
            },
            method: 'DELETE'
        }).then((response: any) => {
            return response;
        });
    }
}