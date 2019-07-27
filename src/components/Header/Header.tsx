import * as React from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField'

interface IProps{
    
}

interface IState{
    
}

export default class Header extends React.Component<IProps,IState> {
    public constructor(props:any){
        super(props);
        this.state = {
            
        }
    }

    public render() {
        return (

            <React.Fragment>
                <div className="container">
                    <h1 className='headerText'>SiteHeader🤔</h1>
                    <p id='idk'>Helo</p>
                    <p className='Yo'>Yo</p>

                    <div className="button">
                        <Button variant="contained" color="primary">Hello World</Button>
                    </div>

                    <TextField></TextField>

                    <div className="col-2 justify-content-center align-self-center">
                        {/* <h1><span className="red-heading">Like</span>&amp;Scribr</h1> */}
                    </div>
                </div>

            </React.Fragment>

        )
    }
}