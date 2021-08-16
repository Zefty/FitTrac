import { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebasecontext } from '../types/types';

try {
    console.info("Initializing Firebase Connection ...")
    firebase.initializeApp({
        apiKey: process.env.APIKEY,
        authDomain: process.env.AUTHDOMAIN,
        projectId: process.env.PROJECTID,
        storageBucket: process.env.STORAGEBUCKET,
        messagingSenderId: process.env.MESSAGINGSENDERID,
        appId: process.env.APPID,
        measurementId: process.env.MEASUREMENTID
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

export default function ProvideAuth(props: any) {
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