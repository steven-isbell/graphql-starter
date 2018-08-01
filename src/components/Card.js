import React from 'react';
import DeletePersonMutation from './mutations/DeletePersonMutation';

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
    <DeletePersonMutation>
      {(loading, err, deletePerson) => {
        return (
          <div>
            <button
              onClick={() => deletePerson({ variables: { id: props.id } })}
            >
              Delete
            </button>
            {loading && <p>Loading...</p>}
            {err && <p>Error :(</p>}
          </div>
        );
      }}
    </DeletePersonMutation>
    <p>{props.color}</p>
  </div>
);

export default Card;
