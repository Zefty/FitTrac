import { Theme } from "@material-ui/core"

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

export type firebasecontext = {
    user: any,
    signIn: (email: string, password: string) => Promise<any>,
    signUp: (email: string, password: string) => Promise<any>,
    signOut: () => Promise<any>,
    sendPasswordResetEmail: (email: string) => Promise<any>,
    confirmPasswordReset: (code: string, password: string) => Promise<any>,
}

export type fittracthemecontext = {
    fitTracTheme: Theme,
    darkMode: boolean,
    toggleDarkMode: React.Dispatch<React.SetStateAction<boolean>>,
    deviceMode: boolean,
    toggleDeviceMode: React.Dispatch<React.SetStateAction<boolean>>,
}