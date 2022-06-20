import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from 'mutations/clientMutations';
import { GET_CLIENTS } from 'queries/clientQueries';
import { Client } from 'types/Client.type';
import { GET_PROJECTS } from 'queries/projectQueries';

const ClientRow: React.FC<{ client: Client }> = ({ client }) => {
  const { name, email, phone, id } = client;
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }]
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS }) as { clients: Client[] };
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: { clients: clients.filter(client => client.id !== deleteClient.id) }
    //   })
    // },
  });

  const onClickHandler = () => {
    deleteClient().then(() => console.log('Client deleted!'))
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={onClickHandler}>
          x
        </button>
      </td>
    </tr>
  )
}

export default ClientRow;
