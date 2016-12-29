import React from 'react';
// goes at the top of every component file
import { getFunName } from '../helpers';
// function exported from helpers file two levels up; add 2 dots

class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  //   // looks for goToStore method and binds it to this, so this keyword can be bound to the StorePicker component
  // }
  goToStore(event) {
    event.preventDefault();
    console.log('You changed the URL')
    // first grab the text from the box
    const storeId = this.storeInput.value;
    console.log('Going to ${storeId}')
    // second transition from / to /store/:storeId
    // use back ticks instead of single quotes for the URL (weird ES6 syntax...)
    this.context.router.transitionTo(`/store/${storeId}`)
  }
  // creating our own method for the onSubmit method we created

  render() {
    // return <p>Hello</p>;
    return (
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }} />
        <button type="submit">Visit Store </button>
      </form>
      )
  }
  // every component needs at least one method - the render()
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
