import Rebase from 're-base';

// connecting our app to Firebase - any changes made on either end will be updated
// api key is safe
const base = Rebase.createClass({
    apiKey: "AIzaSyBdqpLGdvR2ocIGgRDL1WUDwIfe5iSOHuI",
    authDomain: "catch-of-the-day-laura-ayala.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-laura-ayala.firebaseio.com",
});

export default base;
