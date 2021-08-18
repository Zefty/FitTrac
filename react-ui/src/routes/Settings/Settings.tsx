import { useAuth } from '../../contexts/FirebaseContext';
import { Button } from '@material-ui/core';
import FitTracBase from '../../components/FitTracBase/FitTracBase';

export default function Settings(props: any) {
    const { signOut } = useAuth();

    return (
        <FitTracBase>
            <Button variant="contained" color="primary" onClick={signOut}>
                Logout
            </Button>
        </FitTracBase>
    );
}