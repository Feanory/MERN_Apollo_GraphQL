import React from 'react';
import AddClientModal from 'components/AddClientModal/AddClientModal';
import Projects from 'components/Projects/Projects';
import Clients from 'components/Clients/Clients';
import AddProjectModal from 'components/AddProjectModal/AddProjectModal';

const Home: React.FC = () => {
  return (
     <>
       <div className="d-flex gap-3 mb-4">
         <AddClientModal />
         <AddProjectModal />
       </div>
       <Projects />
       <hr/>
       <Clients />
     </>
  );
}

export default Home;
