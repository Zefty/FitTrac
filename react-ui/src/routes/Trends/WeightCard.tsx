// import react components 
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Line from 'react-chartjs-2';

export default function WeightCard(props: any) {

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
        label: "Weight (Kg)",
        data: [78, 78] as any,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ]
  };

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
            Weight
          </Typography>
          <Line type='line' data={data} options={options} />
        </CardContent>
      </Card>
    </div>
  )

}

