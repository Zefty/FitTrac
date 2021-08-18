import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useFitTracTheme } from '../../contexts/FitTracThemeContext';
import Drawer from '../Drawer/Drawer';
import FitTracHeader from '../FitTracHeader/FitTracHeader';
import clsx from 'clsx';

export default function FitTracBase(props: any) {
    const { deviceMode, toggleDeviceMode } = useFitTracTheme();
    const [drawer, toggleDrawer] = useState(window.innerWidth >= 1200 ? true : false);

    const classes = useStyles()

    useEffect(() => {
        const handleWindowSizeChange = () => {
            toggleDrawer(window.innerWidth >= 1200);
            if (window.innerWidth >= 1200) toggleDeviceMode(true);
        };
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, [toggleDeviceMode]);

    return (
        <React.Fragment>
            <Drawer drawer={drawer} toggleDrawer={() => toggleDrawer(!drawer)} />
            <div className={clsx(classes.app, { [classes.appShift]: drawer && deviceMode })}>
                <FitTracHeader searchFilter={props.searchFilter ? props.searchFilter : () => console.log() } toggleDrawer={() => toggleDrawer(!drawer)}/>
                {props.children}
            </div>
        </React.Fragment>
    )
}

const useStyles = makeStyles((theme) => (
    {
        app: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appShift: {
            marginLeft: 300,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }
    }
));