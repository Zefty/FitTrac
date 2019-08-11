import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FavoriteIconUnclicked from '@material-ui/icons/FavoriteBorder';
import FavoriteIconClicked from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditWindow from '../EditWindow/EditWindow';

interface IProps{
  // handleOpen: any,

  data: any,
  updateWorkout: any,
}

interface IState{
  openWindow: boolean,
  favorite: boolean
}

const useStyles = makeStyles(
  createStyles({
    card: {
      minWidth: 350,
      // maxWidth: 550,
      marginBottom: 30,
    },
    bullet: {
      display: 'inline-block',
      margin: '0px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    pos: {
      minHeight: 100,
      // marginBottom: 1,
    },
  }),
);

export default class WorkoutCard extends React.Component<IProps, IState>{
  constructor(props: any) {
      super(props)
      this.state = {
        openWindow: false,
        favorite: false
      }
  }

  public toggleFavourite = () => {
    this.setState((prevState: any) => {
      return {
        favorite: !prevState.favorite
      }
    })
  }


  public viewEdit = () => {
    this.setState({openWindow: true})
    // this.props.handleOpen(this.props.data.workoutId, this.props.data.workoutName, this.props.data.workoutDescription)  
  }

  public handleClose = () => {
    this.setState({openWindow: false})
  }


  public render() {
    return(
      <div>
        <this.Card/>
      </div> 
    )
  }

  private Card = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
  
    return (
      <div>
      <EditWindow
      openWindow={this.state.openWindow} 
      workoutId={this.props.data.workoutId} 
      workoutName={this.props.data.workoutName}
      workoutDescription={this.props.data.workoutDescription} 
      handleClose={this.handleClose}
      updateWorkout={this.props.updateWorkout}
      />
      <Card className={classes.card} >
        <CardContent>
          {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            be
            {bull}
            nev
            {bull}o{bull}
            lent
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography> */}
          
          <Typography className={classes.title} color="textPrimary" gutterBottom >
            {this.props.data.workoutName}
          </Typography>
  
          <Typography className={classes.pos} color="textSecondary">
          {this.props.data.workoutDescription} 
          </Typography>
  
        </CardContent>
        <CardActions>
          <Button size="small" onClick={this.viewEdit}>
          View & Edit
          </Button>

          <IconButton size="small" onClick={this.toggleFavourite}  style={{marginLeft: 'auto'}}>
            {this.state.favorite? <FavoriteIconClicked/> : <FavoriteIconUnclicked/> }
          </IconButton>
        </CardActions>
      </Card>
      </div>
    );
  }
  
}


