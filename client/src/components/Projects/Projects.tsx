import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from 'queries/projectQueries';
import Spinner from 'components/Spinner/Spinner';
import ProjectCard from 'components/ProjectCard/ProjectCard';

const Projects: React.FC = () => {
  const { loading, data, error } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      { data.projects?.length > 0 ? <div className="row mt-4">
        { data.projects.map(project => <ProjectCard key={project.id} project={project} />) }
      </div> : <p>No Projects</p> }
    </>
  );
}

export default Projects;
