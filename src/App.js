import React, { Component } from "react";

import {

  BrowserRouter,

  Route,

  Switch,

 // withRouter,

 // NavLink

} from "react-router-dom";

import apiKey from "./components/config.js";



//App components

import Header from "./components/Header";

import Home from "./components/Home";

import SearchForm from "./components/SearchForm";

import Gallery from "./components/Gallery";

import NotFound from "./components/NotFound";


export default class App extends Component {

  constructor() {

    super();

    //Set state

    this.state = {

      images: [],

      cats: [],

      dogs: [],

      computers: [],

      loading: true

    };

  }



  //Load images for the topics, to have them there for use

  componentDidMount() {

    this.performSearch();

    this.performSearch("cats");

    this.performSearch("dogs");

    this.performSearch("computers");

  }



  //function for searching flickr through API

  performSearch = topic => {

    this.setState({ loading: true });

    fetch(

      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${topic}&per_page=24&format=json&nojsoncallback=1`

    )

      .then(response => response.json())

      .then(responseData => {

        if (topic === "cats") {

          this.setState({ cats: responseData.photos.photo, loading: false });

        } else if (topic === "dogs") {

          this.setState({ dogs: responseData.photos.photo, loading: false });

        } else if (topic === "computers") {

          this.setState({

            computers: responseData.photos.photo,

            loading: false

          });

        } else {

          this.setState({

            images: responseData.photos.photo,

            loading: false

          });

        }

      })

      .catch(error => {

        console.log("Error fetching and parsing data", error);

      });

  };

  render() {

    return (

      //Add Browser Router and the routes

      <BrowserRouter>

        <div className="container">

         

          <SearchForm onSearch={this.performSearch} />
          <Header />
          <Switch>

            <Route exact path="/" component={Home} />

            {this.state.loading ? (

              <p>Loading...</p>

            ) : (

              <Route

                path="/cats"

                render={() => <Gallery topic="cat" data={this.state.cats} />}

              />

            )}



            {this.state.loading ? (

              <p>Loading...</p>

            ) : (

              <Route

                path="/dogs"

                render={() => <Gallery topic="dog" data={this.state.dogs} />}

              />

            )}



            {this.state.loading ? (

              <p>Loading...</p>

            ) : (

              <Route

                path="/computers"

                render={() => <Gallery topic="computer" data={this.state.computers} />}

              />

            )}

            {this.state.loading ? (

              <p>Loading...</p>

            ) : (

              <Route

                path="/search/:topic"

                render={({match}) => <Gallery topic={match.params.topic} data={this.state.images} />}

              />
              
            )}

            <Route component={NotFound} />

          </Switch>

        </div>

      </BrowserRouter>

    );

  }

}




//export default App;
