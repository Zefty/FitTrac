import * as React from 'react';
import Header from './components/Header/Header';
import SearchAppBar from './components/SearchAppBar/SearchAppBar';
import Drawer from './components/Drawer/Drawer';
import AddRoutineButton from './components/SearchAppBar/AddRoutineButton';

class App extends React.Component {
  public render() {
    return (
      <div>
        {/* <Header/> */}
        <SearchAppBar/>
        {/* <Drawer/> */}
        <div className="container">
          <div className="row">
            <div className="col">
              
            </div>
          </div>
        </div>

        <AddRoutineButton/>
        
      </div>
    );
  }
}

export default App;
