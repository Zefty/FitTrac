import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FavoriteIconUnclicked from '@material-ui/icons/FavoriteBorder';
import FavoriteIconClicked from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Clear';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { apiWorkouts } from '../../api/FitTracAPI'
import { useAuth } from '../../contexts/FirebaseContext';


export default function WorkoutCard(props: any) {
    const [del, setDel] = React.useState(false);
    const classes = useStyles();
    const auth = useAuth();

    const deleteWorkout = () => {
        const postDelete = (res: any) => {
            if (res.ok) {
                if (!auth.user.uid) {
                    console.error("auth.user.uid is empty")
                    return;
                }
                apiWorkouts.GetWorkouts(auth.user.uid).then(props.setWorkoutData)
                console.log("***WORKOUT DELETED (SHOULD DO SNACKBAR TBH)***")
            }
        }

        if(del) {
            setDel(false)
            props.setWorkoutData(props.workoutData.filter((workout: any) => workout._id !== props.workout._id))
            console.log("delete")
            console.log(props.workout)
            apiWorkouts.DeleteWorkout(props.workout.uid, props.workout._id).then(postDelete)
        } else {
            setDel(true)
        }
    }

    const toggleFavourite = () => {
        props.setWorkoutData(props.workoutData.map((workout: any) => {
            if (workout._id === props.workout._id) {
                return { ...workout, isFavourite: !workout.isFavourite }
            }
            return workout
        }))
        const {_id = null, ...workoutData} = { ...props.workout, isFavourite: !props.workout.isFavourite }
        apiWorkouts.PutWorkout(props.workout.uid, _id, workoutData)
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.workoutName} gutterBottom>
                    {props.workout.workoutName}
                </Typography>
                <Typography className={classes.workoutDescription}>
                    {props.workout.workoutDescription}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="medium" onClick={() => {
                    props.openEditWindow(true)
                    props.setEditWindowData(props.workout)
                }}>
                    View & Edit
                </Button>
                <IconButton size="medium" onClick={() => toggleFavourite()} style={{ marginLeft: 'auto' }}>
                    {props.workout.isFavourite ? <FavoriteIconClicked /> : <FavoriteIconUnclicked />}
                </IconButton>
                <IconButton size="medium" onClick={() => deleteWorkout()} onBlur={() => setDel(false)}>
                    {del ? <DeleteForeverIcon/> : <Delete/>}
                </IconButton>
            </CardActions>
        </Card>
    )
}

const useStyles = makeStyles({
    card: {
        marginBottom: 0,
    },
    bullet: {
        display: 'inline-block',
        margin: '0px',
        transform: 'scale(0.8)',
    },
    workoutName: {
        fontSize: 20,
        fontWeight: "bold",
        minHeight: 30,
    },
    workoutDescription: {
        minHeight: 100,
    },
});




