// import react components 
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Line from 'react-chartjs-2';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';




// define props and states
interface IProps{
  data: any,
}

interface IState{
  exercise: string,
}

export default class TrendCard extends React.Component<IProps, IState>{
  constructor(props: any) {
      super(props)
      this.state = {
        exercise: ""
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
    // use mat ui theming
    const classes = useStyles();
    const data = {
        labels: [0, 1, 2, 3, 4, 5],
        datasets: [
            {
                label: this.state.exercise,
                data: [] as any,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ]
    };
    let uniqueExercises = this.props.data.map((w: any) => {
      return w.exercises.map((e: any) => {
        return e.exerciseName
      })
    }).flat()
    uniqueExercises = [...new Set(uniqueExercises)]

    if (this.props.data.length > 0 && this.state.exercise !== '') {
      data.datasets[0].data = this.props.data.map((w: any) => {
        return w.exercises.filter((e: any) => {
          return e.exerciseName.includes(this.state.exercise)
        }).map((e: any) => e.exerciseWeight)
      }).flat()
      if (data.datasets[0].data.length > 5)
        data.labels = Array.from(Array(data.datasets[0].data.length).keys())
    }

    const options = {
      scales: {
          yAxes: [
              {
                  ticks: {
                      beginAtZero: true,
                  },
              },
          ],
      },
  };

    return (
      <div className="container col-md-6 col-lg-4"> 
        <Card className={classes.card}>
          <CardContent>
              <Typography className={classes.title}>
                Progress
              </Typography>
              {/* <Typography className={classes.description}>

              </Typography> */}
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Exercises</InputLabel>
                  <Select
                    value={this.state.exercise}
                    onChange={this.handleChange}
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Exercises' }}
                  >
                  {uniqueExercises.map((e: any) => <MenuItem value={e} key={e}>{e}</MenuItem>)}
                  </Select>
                </FormControl>
              <Line type='line' data={data} options={options}/>
          </CardContent>
        </Card> 
      </div>
    );
  }

  private handleChange = (event: any) => {
    this.setState({exercise: event.target.value})
  }

  
}

const useStyles = makeStyles(
  createStyles({
    card: {
      marginBottom: 30,
    //   maxHeight: 500,
    //   maxWidth: 500
    },
    bullet: {
      display: 'inline-block',
      margin: '0px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      minHeight: 30,
    },
    description: {
      // minHeight: 100,
    },
    formControl: {
      minWidth: 100
    },
    selectEmpty: {

    }
  }),
);


