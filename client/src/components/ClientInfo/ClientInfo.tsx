import React from 'react';
import { Client } from 'types/Client.type';

const ClientInfo: React.FC<{ client: Client }> = ({ client }) => {
  const {
    name,
    email,
    phone
  } = client

  return <>
    <h5 className="mt-5">Client Information</h5>
    <ul className="list-group">
      <li className="list-group-item">Name: { name }</li>
      <li className="list-group-item">Email: { email }</li>
      <li className="list-group-item">Phone: { phone }</li>
    </ul>
  </>;
}

export default ClientInfo;
