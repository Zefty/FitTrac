import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface IProps{
  handleOpen: any
}

interface IState{
  // setOpen: boolean
}

const useStyles = makeStyles(
  createStyles({
    card: {
      minWidth: 275,
      maxWidth: 550,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    pos: {
      // marginBottom: 1,
    },
  }),
);

export default class RoutineCard extends React.Component<IProps, IState>{
  constructor(props: any) {
      super(props)
      this.state = {
        // setOpen: false
      }
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
      <Card className={classes.card}>
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
            Name of workout
          </Typography>
  
          <Typography className={classes.pos} color="textSecondary">
            Exercises 
          </Typography>
  
        </CardContent>
        <CardActions>
          <Button size="small" onClick={this.props.handleOpen}>
          View & Edit
          </Button>
        </CardActions>
      </Card>
    );
  }
}


