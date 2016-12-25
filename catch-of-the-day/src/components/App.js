import React from 'react';
import Header from './Header';
// need to import components that we've referenced below
// leave off components from the path as we're referencing something in the same folder
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  render() {
    return (
        <div className="catch-of-the-day">
          <div className="menu">
            <Header />
          </div>
          <Order />
          <Inventory />
        </div>
      )
  }
}

export default App;
