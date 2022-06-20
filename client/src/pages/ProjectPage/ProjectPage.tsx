import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { Project } from 'types/Project.type';
import { DELETE_PROJECT } from 'mutations/projectMutation';
import { GET_PROJECT, GET_PROJECTS } from 'queries/projectQueries';
import Spinner from 'components/Spinner/Spinner';
import ClientInfo from 'components/ClientInfo/ClientInfo';
import UpdateProjectModal from 'components/UpdateProjectModal/UpdateProjectModal';

const ProjectPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(GET_PROJECT, {
    variables: { id }
  });
  const project: Project = data?.project;

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }]
  });

  const deleteProjectHandler = () => {
    deleteProject()
  };

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong</p>

  return (<>
    { !loading && !error && <div className="mx-auto w-75 card p-5">
        <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
          Back
        </Link>


        <h1>{ project?.name }</h1>
        <p>{ project?.description }</p>

        <h5 className="mt-3">Project Status</h5>
        <p className="lead">{project.status}</p>

        { project?.client && <ClientInfo client={project.client}/> }

        <div className="mt-3 w-50">
			    <UpdateProjectModal project={project} />
          <button
            type="button"
            className="btn btn-danger mt-3 m-3"
            onClick={deleteProjectHandler}
          >Delete Project</button>
        </div>

    </div>}
  </>);
}

export default ProjectPage;
