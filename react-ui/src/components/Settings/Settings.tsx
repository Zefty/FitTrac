// import react components 
import * as React from 'react';
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