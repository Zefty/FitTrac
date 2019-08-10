import * as React from 'react';
import WorkoutCard from './WorkoutCard';

interface IProps{
    handleOpen: any,
    workoutData: any
}

interface IState{
    // workoutData: any
    // exerciseData: any
}

// const data = [{workoutName: "Yoyo", workoutDescription: "testing"}, {workoutName: "Yoyoyo", workoutDescription: "testing 123"}]

export default class Workouts extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            // workoutData: [],
            // exerciseData: []
        }
    }

    public render() {
        return(
            // style={{display: "flex", flexWrap: "wrap"}}
            <div className="container">
                <div className="row">
                        {this.props.workoutData.map((workoutData: object, index: number) =>
                        <div className="col-md-6 col-lg-4" key={index}>
                            <WorkoutCard handleOpen={this.props.handleOpen} data={workoutData}/>
                        </div>
                        )}  




                </div>
                
            </div>
        );
    }



}