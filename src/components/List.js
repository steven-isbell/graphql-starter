import React, { Component } from 'react';
import Card from './Card';

const listStyle = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
};

class List extends Component {
  render() {
    return (
      <div style={listStyle}>
        {/* data.products.map((val, i) => <Card {...val} key={i} />)*/}
        {/* Wrap the list on our Get Products Query and uncomment the map */}
      </div>
    );
  }
}

export default List;
