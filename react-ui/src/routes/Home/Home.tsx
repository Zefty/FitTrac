import FitTracHeader from '../../components/FitTracHeader/FitTracHeader';

export default function Home(props: any) {

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
        </div>
    );
}