import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT } from 'mutations/projectMutation';
import { GET_PROJECT } from 'queries/projectQueries';
import { Project } from 'types/Project.type';
import ProjectForm from 'components/ProjectForm/ProjectForm';

const projectStatus = {
  'Not started': 'new',
  'In Progress': 'progress',
  'Completed': 'completed',
}

const UpdateProjectModal: React.FC<{ project: Project }> = ({ project }) => {
  const { name, description, status, id } = project;
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const initialData = {
    name,
    description,
    status: projectStatus[status]
  }

  const onSubmitHandler = (data) => {
    updateProject({
      variables: {
        ...data,
        id
      },
      refetchQueries: [{ query: GET_PROJECT, variables: { id } }]
    });
  }

  return <>
    <button
      type="button"
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#addProjectModal"
    >
      Update Project
    </button>

    <div className="modal fade" id="addProjectModal" tabIndex={-1} aria-labelledby="addProjectModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addProjectModalLabel">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            { project && <ProjectForm initialData={initialData} onSubmit={onSubmitHandler} actionType="Update" /> }
          </div>
        </div>
      </div>
    </div>
  </>;
}

export default UpdateProjectModal;
