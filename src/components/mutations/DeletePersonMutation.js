import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { GET_PEOPLE } from "../queries/PeopleQuery";

export const DELETE_PERSON = gql`
  mutation deletePerson($id: Int!) {
    deletePerson(id: $id)
  }
`;

const DeletePersonMutation = ({ id }) => (
  <Mutation
    mutation={DELETE_PERSON}
    update={(cache, { data: { deletePerson } }) => {
      let { people } = cache.readQuery({ query: GET_PEOPLE });
      const updated = people.filter(val => val.id !== deletePerson);
      cache.writeQuery({
        query: GET_PEOPLE,
        data: { people: updated }
      });
    }}
  >
    {(deletePerson, { loading, error }) => (
      <div>
        <button onClick={() => deletePerson({ variables: { id } })}>
          Delete
        </button>
        {loading && <p>Loading...</p>}
        {error && <p>Error :(</p>}
      </div>
    )}
  </Mutation>
);

export default DeletePersonMutation;
