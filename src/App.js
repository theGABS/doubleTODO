import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Lists} from './Lists'
import {List} from './List'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import _ from 'lodash'


class App extends React.Component {

  state = {
    lists: [
        { title: 'today', cards: [{ title: 'eat', isComplete: false }] },
        { title: 'tomorrow', cards: [{ title: 'eat tomorrow', isComplete: false }] }
    ]
  }

  removeList = (list) => {
      this.setState({
          lists: _.without(this.state.lists, list)
      })
  }

  createNewList = () => {
      this.setState({
          lists: this.state.lists.concat(
              { title: 'new list', cards: [{ title: 'test card', isComplete: false }] },
          )
      })
  }


  // This function overcomplecated, because it is hard to work with Array in immutable way in react.
  // In real life I use some helper for array (For example MapReplace; Another example MobX, where I shouldn't work in immutable way) 
  // or firebase DB where I use object and ID instead of array.
  onChange = ({propName, cardIndex, index, value}) => {
    console.log({propName, cardIndex, index, value})
    this.setState({
      lists: this.state.lists.map((item, _index) => {
        if (_index !== +index) {
          return item
        } else {
          return {
            ...item,
            cards: item.cards.map((card, _cardIndex) => {
              if (_cardIndex !== cardIndex) {
                return card
              } else {
                return {
                  ...card,
                  [propName]: value
                }
              }
            })
          }
        }
      })
    })
  }

  render () {
    return (
      <Router>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" >
            <Lists data={this.state.lists} removeList={this.removeList} createNewList={this.createNewList} />
          </Route>
          <Route path="/list/:id" render={(props) => <List data={this.state.lists[props.match.params.id]} onChange={this.onChange} index={props.match.params.id} /> }>
            
          </Route>
        </Switch>
    </Router>
    );
  }
}

export default App;
