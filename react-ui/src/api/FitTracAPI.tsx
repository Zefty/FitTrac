import { workout } from '../types/types'

export const apiWorkouts = {
    GetWorkouts: async(uid: string): Promise<workout[]> => {
        return await fetch(`https://fittracr.herokuapp.com/api/user/${uid}/workouts`, {
            method: 'GET',
        }).then((response: any) => {
            return response.json();
        });
    },
    PostWorkout: async(uid: string, workoutData: any) => {
        return await fetch(`https://fittracr.herokuapp.com/api/user/${uid}/workouts`, {
            body: JSON.stringify(workoutData),
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST'
        }).then((response: any) => {
            return response;
        });
    },
    PutWorkout: async(uid: string, _id: string, workoutData: any) => {
        return await fetch(`https://fittracr.herokuapp.com/api/user/${uid}/workouts?_id=${_id}`, {
            body: JSON.stringify(workoutData),
            headers: {
                "Content-Type": "application/json"
            },
            method: 'PUT'
        }).then((response: any) => {
            return response;
        });
    },
    DeleteWorkout: async(uid: string, _id: string) => {
        return await fetch(`https://fittracr.herokuapp.com/api/user/${uid}/workouts?_id=${_id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'DELETE'
        }).then((response: any) => {
            return response;
        });
    }
}