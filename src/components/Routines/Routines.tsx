import * as React from 'react';
import Card from './Card';

interface IProps{

}

interface IState{

}

export default class Routines extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)

    }

    public render() {
        return(
            <Card/>
            
        )
    }



}