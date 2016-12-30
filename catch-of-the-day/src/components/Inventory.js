import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
  // function to render the current inventory. In the render function below, iterate over the fishes and calling renderInventory
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  // using a React life cycle to remember that we are logged in, even after refreshing the page
  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user });
      }
    });
  }

  // taking in event and key
  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // take a copy of that fish and update it with the new data
    // the "name" comes from the name attribute from the input fields below
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    }
    this.props.updateFish(key, updatedFish);
    // console.log(updatedFish);
  }

  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  authHandler(err, authData) {
    console.log(authData);
    if (err) {
      console.error(err);
      return;
    }

    // grab the current store info from Firebase
      // ref allows us to grab part of our state
    const storeRef = base.database().ref(this.props.storeId);

    // query the Firebase database once for the store data (get back a 'snapshot', which is the Firebase data object)
    storeRef.once('value', (snapshot) => {
      // data is the actual store
      const data = snapshot.val() || {};
      // .val() to get the actual data or else it will be set equal to an empty object

      // claim it as our own if there is no owner
      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid // uid is unique, coming from the provider
        })
      }
      // set state locally in our app, so fish data will be available upon login
      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });

  }

  // buttons to render logins, which we enabled with oauth on Firebase
  renderLogin() {
    return (
          <nav className="login">
              <h2>Inventory</h2>
              <p>Sign in to manage your store's inventory</p>
              <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
              <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
              <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In with Twitter</button>
          </nav>
      )
  }

  // onChange handler triggers when someone types into the input field to update values
  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
        <div className="fish-edit" key={key}>
          <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)} />
          <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)} />
          <select type="text" name="status" value={fish.status} placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)} >
              <option value="available">Fresh!</option>
              <option value="unavailable">Sold Out!</option>
          </select>
          <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)} ></textarea>
          <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)} />
          <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
        </div>
      )
  }
  render(){
    const logout = <button onClick={this.logout}>Log Out</button>;

    // store logged in person and (in state) the application owner - check if they are the same person

    // check if they are not logged in at all (uid is user id)
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // check if they are the owner of the current store
    if(this.state.uid !== this.state.owner) {
      return (
          <div>
              <p>Sorry, you aren't the owner of this store!</p>
              {logout}
          </div>
        )
    }

    return (
        <div>
          <h2>Inventory</h2>
          {logout}
          {Object.keys(this.props.fishes).map(this.renderInventory)}
          <AddFishForm addFish={this.props.addFish} />
          <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
        </div>
      )
  };
  // using property initializer for passing proptypes (again, may or may not be incorporated into JS language in the future)
  //
    // static propTypes = {
    //   fishes: React.PropTypes.object.isRequired,
    //   updateFish: React.PropTypes.func.isRequired,
    //   removeFish: React.PropTypes.func.isRequired,
    //   addFish: React.PropTypes.func.isRequired,
    //   loadSamples: React.PropTypes.func.isRequired,
    //   storeId: React.PropTypes.string.isRequired
    // };
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
};

export default Inventory;
