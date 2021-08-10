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
import { apiWorkouts } from '../../api/api'

export default function WorkoutCard(props: any) {
    const [del, setDel] = React.useState(false);
    const classes = useStyles();

    const deleteWorkout = () => {
        const postDelete = (res: any) => {
            if (res.ok) {
                apiWorkouts.GetWorkouts().then(props.setWorkoutData)
                console.log("***WORKOUT DELETED (SHOULD DO SNACKBAR TBH)***")
            }
        }

        if(del) {
            setDel(false)
            props.setWorkoutData(props.workoutData.filter((workout: any) => workout._id !== props.workout._id))
            console.log("delete")
            console.log(props.workout)
            apiWorkouts.DeleteWorkout(props.workout).then(postDelete)
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
        apiWorkouts.PutWorkout({ ...props.workout, isFavourite: !props.workout.isFavourite })
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




