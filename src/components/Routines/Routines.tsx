import * as React from 'react';
import Card from './Card';

interface IProps{

}

interface IState{

}

var numRow:number[] = [1,2,3,4,5,6,7,8,9,10]

export default class Routines extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)

    }

    public render() {
        return(
            <div className="container" style={{display: "flex", flexWrap: "wrap"}}>
                {numRow.map(numRow =>
                    <div>
                        <Card/>
                    </div>
                )}  
            </div>
        );
    }



}