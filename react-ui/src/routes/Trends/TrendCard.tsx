// import react components 
import { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Line from 'react-chartjs-2';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';




// // define props and states
// interface IProps{
//   data: any,
// }

// interface IState{
//   exercise: string,
// }

export default function TrendCard(props: any) {
  const [exercise, setExercise] = useState(Object);

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
  // use mat ui theming
  const classes = useStyles();
  const data = {
    labels: [0, 1, 2, 3, 4, 5],
    datasets: [
      {
        label: exercise,
        data: [] as any,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ]
  };
  let uniqueExercises = props.data.map((w: any) => {
    return w.exercises.map((e: any) => {
      return e.exerciseName
    })
  }).flat()
  uniqueExercises = [...new Set(uniqueExercises)]

  if (props.data.length > 0 && exercise !== '') {
    data.datasets[0].data = props.data.map((w: any) => {
      return w.exercises.filter((e: any) => {
        return e.exerciseName.includes(exercise)
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
              value={exercise}
              onChange={(event) => setExercise(event.target.value)}
              className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'Exercises' }}
            >
              {uniqueExercises.map((e: any) => <MenuItem value={e} key={e}>{e}</MenuItem>)}
            </Select>
          </FormControl>
          <Line type='line' data={data} options={options} />
        </CardContent>
      </Card>
    </div>
  )
}

