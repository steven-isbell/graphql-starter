import React from 'react';

const cardStyle = {
  height: '300px',
  width: '250px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  border: '3px solid black',
  margin: '5px',
  padding: '10px',
  borderRadius: '3px'
};

const Card = props => (
  <div style={cardStyle}>
    <p>Product:</p>
    <h1>{props.name}</h1>
    <p>{props.price}</p>
    <br />
    <p>{props.color}</p>
    {/* MUTATION COMPONENT */}
  </div>
);

export default Card;
