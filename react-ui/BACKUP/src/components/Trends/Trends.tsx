// import react components 
import * as React from 'react';
import FitTracHeader from '../FitTracHeader/FitTracHeader';
import TrendCard from './TrendCard'
import WeightCard from './WeightCard';


interface IProps{
    theme: any,
    darkModeToggle: any,
    isDarkMode: boolean,
}

// state containing the workout data from dbo.Workouts 
interface IState{
    workoutData: any
}

  

export default class Workouts extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            workoutData: [],
        }
        // always update workout data 
        this.updateWorkouts();
    }

    public render() {
        return (

                    <div>
                        <FitTracHeader darkModeToggle={this.props.darkModeToggle} isDarkMode={this.props.isDarkMode} searchFilter={this.filterWorkouts}/>
                        <TrendCard data={this.state.workoutData}/>
                        <WeightCard data={this.state.workoutData}/>
                        
                    </div>


        );
    }

    // get reqest for all the workouts in database
    public updateWorkouts = () => {
        fetch('https://fittracr.herokuapp.com/workouts', {
            method:'GET'
        }).then((ret:any) => {
            return ret.json();
        }).then((output:any) => {
            this.setState({workoutData: output})
        })
    }

    public filterWorkouts = () => {

    }
}