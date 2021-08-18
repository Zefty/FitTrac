import { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebasecontext } from '../types/types';

try {
    console.info("Initializing Firebase Connection ...")
    firebase.initializeApp({
        apiKey: process.env.REACT_APP_APIKEY,
        authDomain: process.env.REACT_APP_AUTHDOMAIN,
        projectId: process.env.REACT_APP_PROJECTID,
        storageBucket: process.env.REACT_APP_STORAGEBUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
        appId: process.env.REACT_APP_APPID,
        measurementId: process.env.REACT_APP_MEASUREMENTID
    });
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack);
    }
}

const AuthContext = createContext({} as firebasecontext);

export const useAuth = () => {
    return useContext(AuthContext);
};

export default function AuthProvider(props: any) {
    const [user, setUser] = useState({} as any);

    const signIn = (email: string, password: string) => {
        return firebase.auth().signInWithEmailAndPassword(email, password).then((response: any) => {
            setUser(response.user);
            return response;
        });
    };

    const signUp = (email: string, password: string) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((response: any) => {
            setUser(response.user);
            return response;
        });
    };

    const signOut = () => {
        return firebase.auth().signOut().then(() => setUser(undefined));
    };

    const sendPasswordResetEmail = (email: string) => {
        return firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                return true;
            });
    };

    const confirmPasswordReset = (code: string, password: string) => {
        return firebase
            .auth()
            .confirmPasswordReset(code, password)
            .then(() => {
                return true;
            });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user: any) => {
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
        });
        return () => unsubscribe();
    }, []);

    const fireBaseContext = {
        user,
        signIn,
        signUp,
        signOut,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
    return <AuthContext.Provider value={fireBaseContext}>{props.children}</AuthContext.Provider>;
}