import * as React from 'react';
import WorkoutCard from './WorkoutCard';
import AddWorkoutButton from '../AddWorkout/AddWorkoutButton';

interface IProps{
    isDarkMode: boolean,
}

interface IState{
    workoutData: any
}

export default class Workouts extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            workoutData: [],
        }
        this.updateWorkouts();
    }

    public render() {
        return(
            <div>
                <AddWorkoutButton updateWorkout={this.updateWorkouts} isDarkMode={this.props.isDarkMode}/>
                <div className="container" style={{paddingBottom: '2rem'}}>
                    <div className="row">
                            {this.state.workoutData.map((workoutData: object, index: number) =>
                            <div className="col-md-6 col-lg-4" key={index}>
                                <WorkoutCard data={workoutData} updateWorkout={this.updateWorkouts} isDarkMode={this.props.isDarkMode}/>
                            </div>
                            )}  
                    </div>    
                </div>
            </div>
        );
    }

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