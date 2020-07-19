export interface IExercise {
    exerciseId: number,
    exerciseName: string,
    exerciseReps: number,
    exerciseSets: number,
    workoutId: number
}

export interface IWorkout {
    workoutId: number,
    workoutName: string,
    workoutDescription: string,
    isFavourite: boolean,
    exercises: Array<IExercise>
}

