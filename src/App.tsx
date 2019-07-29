import * as React from 'react';
import Header from './components/Header/Header';
import SearchAppBar from './components/SearchAppBar/SearchAppBar';
import Drawer from './components/Drawer/Drawer';

class App extends React.Component {
  public render() {
    return (
      <div>
        {/* <Header/> */}
        <SearchAppBar/>
        {/* <Drawer/> */}
      </div>
    );
  }
}

export default App;
