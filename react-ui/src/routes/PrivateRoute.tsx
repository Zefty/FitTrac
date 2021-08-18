import {
    Route,
    Redirect,
} from "react-router-dom";
import { useAuth } from "../contexts/FirebaseContext";

export default function PrivateRoute({ children, ...rest }: any) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}