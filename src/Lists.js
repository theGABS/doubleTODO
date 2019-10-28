import _ from 'lodash'
import React from 'react';

import {Link} from 'react-router-dom'

const sortList = (list) => {
    return _.sortBy(list, 'isComplete');
}


export class Lists extends React.Component {

    

    renderList = (list, index) => {
        const partOfList = _.take(sortList(list.cards), 3);

        const cards = _.map(partOfList, card => {
            return <div className="card">111{card.title}</div>
        })
        return <div  className="list">
            <Link to={`list/${index}`}>Go to</Link>
            <h2>{list.title}</h2>
            <button onClick={() => this.props.removeList(list)}>remove</button>
            {cards}
        </div>
    }

    render() {
        return (
            <div className="App">
                <h1>MultiListView</h1>
                <div className="lists">
                    {_.map(this.props.data, (list, index) => {
                        return this.renderList(list, index)
                    })}
                    <button onClick={this.props.createNewList}>create new</button>
                </div>
            </div>
        );
    }
}

