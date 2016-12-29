import React from 'react';
import Header from './Header';
// need to import components that we've referenced below
// leave off components from the path as we're referencing something in the same folder
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    // bind method addFish to the component
    this.addFish = this.addFish.bind(this);
    // binding 'this' keyword again to the new method loadSamples
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    // getinitialState
    this.state = {
      fishes: {},
      order: {}
    };
  }

  // componentWillMount is a React life cycle component hook that, before the app initially renders in the browser, will sync the component state with the Firebase state (invoked once on client and server side)
  // use back tick instead of single quote...weird ES6 syntax (upper right on keyboard below esc key)
  componentWillMount() {
    // this runs right before the <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`
      , {
        context: this,
        state: 'fishes'
    });

    // check if there is any order in localStorage (otherwise it will be overwritten when browser reloaded)
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    // if there is something in localStorage
    if(localStorageRef) {
      // update our App component's order state
      this.setState({
        // to turn the stored string back into an object, use JSON.parse
        order: JSON.parse(localStorageRef)
      });
    }

  }

  // use another React life cycle to ensure that if we switch to another store/page, syncing for the previous will stop
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

    // before rendering, invoked when new props or state is being received (changed). Ex. when order state is changed, will pass down that info via props and store it
  // pass in updated props and state
  // connect to Local Storage for localhost
  componentWillUpdate(nextProps, nextState) {
      // console.log('Something changed');
      // console.log({nextProps, nextState});
      // storing key, value pair in localStorage
      // local storage cannot store objects only strings, so you turn the object data into JSON data
      localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  addFish(fish){
    // update our state
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    // this.setState({ fishes: fishes }); or
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    // take a copy of our state
    // ... object spread - takes a copy of the existing state
    const order = {...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    // this.setState({ order: order }); or
    this.setState({ order });
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
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
              }
            </ul>
          </div>
          <Order
              fishes={this.state.fishes}
              order={this.state.order}
              params={this.props.params}
          />
        {/*Below, we are passing data downstream (to state) via props*/}
          <Inventory
              addFish={this.addFish}
              loadSamples={this.loadSamples}
          />
        </div>
      )
  }
}

export default App;
