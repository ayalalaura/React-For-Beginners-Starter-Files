import React from 'react';
// goes at the top of every component file
import { getFunName } from '../helpers';
// function exported from helpers file two levels up; add 2 dots

class StorePicker extends React.Component {
  render() {
    // return <p>Hello</p>;
    return (
      <form className="store-selector">
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} />
        <button type="submit">Visit Store </button>
      </form>
      )
  }
  // every component needs at least one method - the render()
}

export default StorePicker;
