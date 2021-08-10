export type workout = {
    _id: string,
    workoutName: string,
    workoutDescription: string,
    isFavourite: string,
    exercises: exercise[]
}

export type exercise = {
    exerciseName: string,
    exerciseReps: string,
    exerciseSets: string,
    exerciseWeight: string
}