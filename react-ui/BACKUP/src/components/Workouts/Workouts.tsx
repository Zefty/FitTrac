// import react components 
import * as React from 'react';
import WorkoutCard from './WorkoutCard';
import AddWorkoutButton from '../AddWorkout/AddWorkoutButton';
import FitTracHeader from '../FitTracHeader/FitTracHeader';

interface IProps{
    theme: any,
    darkModeToggle: any,
    isDarkMode: boolean,
}

// state containing the workout data from dbo.Workouts 
interface IState{
    workoutData: any
    workoutDataUnfiltered: any
}

export default class Workouts extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            workoutData: [],
            workoutDataUnfiltered: []
        }
        // always update workout data 
        this.updateWorkouts();
    }

    public render() {
        return(

            <div>
                {/* use imported add workout button */}
                <FitTracHeader darkModeToggle={this.props.darkModeToggle} isDarkMode={this.props.isDarkMode} searchFilter={this.filterWorkouts}/>
                <AddWorkoutButton updateWorkout={this.updateWorkouts} isDarkMode={this.props.isDarkMode}/>
                <div className="container" style={{paddingBottom: '3rem'}}>
                    <div className="row">
                        {/* use mapping to display all the workouts 
                        WIP: mapping order based on favourite*/}
                            {this.state.workoutData.sort((a: any, b: any) => Number(b.isFavourite) - Number(a.isFavourite)).map((workoutData: object, index: number) =>
                            <div className="col-md-6 col-lg-4" key={index}>
                                {/* pass in already get data so do not need to get request again upon opening workout */}
                                <WorkoutCard 
                                data={workoutData} 
                                updateWorkout={this.updateWorkouts} 
                                isDarkMode={this.props.isDarkMode}/>
                            </div>
                            )}  
                    </div>    
                </div>
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
            this.setState({workoutDataUnfiltered: JSON.parse(JSON.stringify(output))})
        })
    }

    public filterWorkouts = (search: string) => {
        if (search === "") {
            this.setState({workoutData: JSON.parse(JSON.stringify(this.state.workoutDataUnfiltered))})
        } else {
            this.setState({workoutData: this.state.workoutData.filter((workout: any) => workout.workoutName.toLowerCase().includes(search.toLowerCase()))});
        }
    }
}