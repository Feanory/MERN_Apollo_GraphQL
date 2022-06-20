import { Client } from 'types/Client.type';

export type Project = {
  id: string;
  name: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  client: Client;
}
