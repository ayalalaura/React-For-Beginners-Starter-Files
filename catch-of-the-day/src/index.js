import React from 'react';
// will load info from react library into React variable to be used throughout the application
import { render } from 'react-dom';
// we only want the render method from the ReactDOM package
import './css/style.css';
// importing our custom stylesheet, which webpack will compile for us and add a style tag into the html
import App from './components/App';

import StorePicker from './components/StorePicker';
// have to refer to StorePicker using a regular path so that React will recognize it as such and not think it's an npm package
// .js not necessary; it's assumed

render(<App/>, document.querySelector('#main'));
// will render the StorePicker component to the page, where we told it to (div with id of main)
