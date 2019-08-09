import * as React from 'react';
import WorkoutCard from './WorkoutCard';

interface IProps{
    handleOpen: any
}

interface IState{
    workoutData: any
    
}

const data = [{workoutName: "Yoyo", workoutDescription: "testing"}, {workoutName: "Yoyoyo", workoutDescription: "testing 123"}]

export default class Workouts extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            workoutData: []
        }
        this.updateWorkouts();
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

    public render() {
        return(
            // style={{display: "flex", flexWrap: "wrap"}}
            <div className="container">
                <div className="row">
                    
                        {this.state.workoutData.map((workoutData: object, index: number) =>
                        <div className="col-md-6 col-lg-4" key={index}>
                            <WorkoutCard handleOpen={this.props.handleOpen} data={workoutData}/>
                        </div>
                        )}  




                </div>
                
            </div>
        );
    }



}