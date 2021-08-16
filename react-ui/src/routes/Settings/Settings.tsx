import FitTracHeader from '../../components/FitTracHeader/FitTracHeader';
import { useAuth } from '../../api/firebase';
import { Button } from '@material-ui/core';

export default function Settings(props: any) {
    const { signOut } = useAuth();

    const searchFilter = () => {
    }

    return (
        <div>
            <FitTracHeader
                toggleDarkMode={props.toggleDarkMode}
                darkMode={props.darkMode}
                searchFilter={searchFilter}
                toggleDrawer={() => props.toggleDrawer()}
            />
            <Button variant="contained" color="primary" onClick={signOut}>
                Logout
            </Button>
        </div>
    );
}