import * as React from 'react';
import RoutineCard from './RoutineCard';

interface IProps{
    handleOpen: any
}

interface IState{

}

const data = [{workoutName: "Yoyo", description: "testing"}, {workoutName: "Yoyoyo", description: "testing 123"}]

export default class Routines extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)

    }

    public render() {
        return(
            // style={{display: "flex", flexWrap: "wrap"}}
            <div className="container">
                <div className="row">
                    
                        {data.map((data: object, index: number) =>
                        <div className="col-md-6 col-lg-4" key={index}>
                            <RoutineCard handleOpen={this.props.handleOpen} data={data}/>
                        </div>
                        )}  




                </div>
                
            </div>
        );
    }



}