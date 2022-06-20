import React from 'react';
import { useQuery } from '@apollo/client';
import { Client } from 'types/Client.type';
import { GET_CLIENTS } from 'queries/clientQueries';
import ClientRow from 'components/ClientRow/ClientRow';
import Spinner from 'components/Spinner/Spinner';

const Clients: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            data.clients.map((client: Client) => <ClientRow key={client.id} client={client} />)
          }
        </tbody>
      </table>
    </>
  )
}

export default Clients;
