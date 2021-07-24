// import react components 
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Line from 'react-chartjs-2';



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

// define props and states
interface IProps{
    data: any,
}

interface IState{
}

export default class TrendCard extends React.Component<IProps, IState>{
  constructor(props: any) {
      super(props)
      this.state = {
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
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ]
    };
    console.log(this.props.data)
    return (
      <div className="container col-md-6 col-lg-4"> 
        <Card className={classes.card}>
            <Line type='line' data={data} options={options}/>
        </Card> 
      </div>
    );
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
    workoutName: {
      fontSize: 20,
      fontWeight: "bold",
      minHeight: 30,
    },
    workoutDescription: {
      minHeight: 100,
    },
  }),
);


