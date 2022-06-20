import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from 'mutations/projectMutation';
import { GET_PROJECTS } from 'queries/projectQueries';
import { Project } from 'types/Project.type';
import ProjectForm from 'components/ProjectForm/ProjectForm';
import { GET_CLIENTS } from 'queries/clientQueries';
import { Client } from 'types/Client.type';

const initialData = {
  name: '',
  description: '',
  clientId: '',
  status: 'new'
}

const AddProjectModal: React.FC = () => {
  const { loading, data, error } = useQuery(GET_CLIENTS);
  const [addProject] = useMutation(ADD_PROJECT);
  const clients: Client[] = data?.clients;

  const onSubmitHandler = (data) => {
    addProject({
      variables: data,
      update(cache, { data: { addProject } }) {
        const { projects } = cache.readQuery({ query: GET_PROJECTS }) as { projects: Project[] };

        cache.writeQuery({
          query: GET_PROJECTS,
          data: { projects: [...projects, addProject] }
        })
      }
    });
  }

  if (loading) return null
  if (error) return <p>Something went wrong</p>;

  return <>
    <button
      type="button"
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#addProjectModal"
    >
      Add Project
    </button>

    <div className="modal fade" id="addProjectModal" tabIndex={-1} aria-labelledby="addProjectModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addProjectModalLabel">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <ProjectForm initialData={initialData} onSubmit={onSubmitHandler} clients={clients}/>
          </div>
        </div>
      </div>
    </div>
  </>;
}

export default AddProjectModal;
