import React from 'react';
import Header from './Header';
// need to import components that we've referenced below
// leave off components from the path as we're referencing something in the same folder
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor() {
    super();

    // bind method addFish to the component
    this.addFish = this.addFish.bind(this);

    // binding 'this' keyword again to the new method loadSamples
    this.loadSamples = this.loadSamples.bind(this);

    // getinitialState
    this.state = {
      fishes: {},
      order: {}
    };
  }

  addFish(fish){
    // update our state
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now();
    fishes['fish-${timestamp}'] = fish;
    // set state
    // this.setState({ fishes: fishes });
    // same as below
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  render() {
    return (
        <div className="catch-of-the-day">
          <div className="menu">
            <Header tagline="Fresh Seafood Market"/>
            <ul className="list-of-fishes">
              {
                Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} details={this.state.fishes[key]}/>)
              }
            </ul>
          </div>
          <Order />
        {/*Below, we are passing data downstream (to state) via props*/}
          <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
        </div>
      )
  }
}

export default App;
