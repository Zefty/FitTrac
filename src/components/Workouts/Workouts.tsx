// import react components 
import * as React from 'react';
import WorkoutCard from './WorkoutCard';
import AddWorkoutButton from '../AddWorkout/AddWorkoutButton';

interface IProps{
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
        return(
            <div>
                {/* use imported add workout button */}
                <AddWorkoutButton updateWorkout={this.updateWorkouts} isDarkMode={this.props.isDarkMode}/>
                <div className="container" style={{paddingBottom: '3rem'}}>
                    <div className="row">
                        {/* use mapping to display all the workouts 
                        WIP: mapping order based on favourite*/}
                            {this.state.workoutData.map((workoutData: object, index: number) =>
                            <div className="col-md-6 col-lg-4" key={index}>
                                {/* pass in already get data so do not need to get request again upon opening workout */}
                                <WorkoutCard data={workoutData} updateWorkout={this.updateWorkouts} isDarkMode={this.props.isDarkMode}/>
                            </div>
                            )}  
                    </div>    
                </div>
            </div>
        );
    }

    // get reqest for all the workouts in database
    public updateWorkouts = () => {
        fetch('https://fittracapi.azurewebsites.net/api/Workouts', {
            method:'GET'
        }).then((ret:any) => {
            return ret.json();
        }).then((output:any) => {
            this.setState({workoutData: output})
        })
    }
}