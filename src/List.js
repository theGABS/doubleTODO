import _ from 'lodash'
import React from 'react';

import {Link} from 'react-router-dom'

const sortList = (list) => {
    return _.sortBy(list, 'isComplete');
}


export class List extends React.Component {

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

    renderList = (list) => {
        const partOfList = sortList(list.cards);

        const cards = _.map(partOfList, card => {
            const cardIndex = list.cards.indexOf(card)
            return <div className="card">
                <input value={card.title} onChange={(e) => {
                    this.props.onChange({propName: 'title', cardIndex, index: this.props.index, value: e.target.value})
                }} />
                <input type="checkbox" value={card.isComplete} onChange={(e) => {
                    this.props.onChange({propName: 'isComplete', cardIndex, index: this.props.index, value: !card.isComplete})
                }} />
            </div>
        })
        return <div className="list">
            <h2>{list.title}</h2>
            {cards}
        </div>
    }

    render() {
        // return <span>{JSON.stringify(this.props)}</span>
        return (
            <div className="App">
                <h1>One list view</h1>
                <Link to="/">Back</Link>
                <div className="lists">
                    {this.renderList(this.props.data)}
                </div>
            </div>
        );
    }
}
