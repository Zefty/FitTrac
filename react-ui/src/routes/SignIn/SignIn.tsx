import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dumbbell from '../../icons/dumbbell.png';
import { useAuth } from '../../contexts/FirebaseContext';
import { useHistory, useLocation } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import LightbulbFull from '../../components/FitTracHeader/LightbulbFull';
import LightbulbOutline from '../../components/FitTracHeader/LightbulbOutline';
import { useFitTracTheme } from '../../contexts/FitTracThemeContext';
import React from 'react';

export default function SignIn() {
    const { darkMode, toggleDarkMode } = useFitTracTheme();
    const classes = useStyles();
    const { signIn } = useAuth();
    const history = useHistory();
    let location = useLocation();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        signIn(event.target.email.value, event.target.password.value).then(() => {
            let { from }: any = location.state || { from: { pathname: "/home" } };
            history.replace(from);
        })
    }

    return (
        <React.Fragment>
            <div className={classes.test}>
                <IconButton size="medium" onClick={() => toggleDarkMode(!darkMode)}>
                    {darkMode ? <LightbulbFull style={{ fill: 'white' }} /> : <LightbulbOutline />}
                </IconButton>
            </div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} alt="logo" src={Dumbbell}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            defaultValue='jaime.wu011@gmail.com'
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            defaultValue='123456'
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="." variant="body2" onClick={() => console.log("***** SENDING EMAIL RESET *****")}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </React.Fragment>
    );
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        // backgroundColor: theme.palette.secondary.main,
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    test: {
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: theme.spacing(1)
    }
}));


