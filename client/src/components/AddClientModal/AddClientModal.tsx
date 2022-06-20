import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from 'mutations/clientMutations';
import { GET_CLIENTS } from 'queries/clientQueries';
import { Client } from 'types/Client.type';

const AddClientModal: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: formData,
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS }) as { clients: Client[] };

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] }
      })
    }
  })

  const onChangeInputHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;

    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  const onSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    addClient();
  }

  return (<>
    <button
      type="button"
      className="btn btn-secondary"
      data-bs-toggle="modal"
      data-bs-target="#addClientModal"
    >
      Add Client
    </button>

    <div className="modal fade" id="addClientModal" tabIndex={-1} aria-labelledby="addClientModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addClientModalLabel">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmitHandler}>
              {
                Object.keys(formData).map((key: string) => <div className="mb-3" key={key}>
                  <label className="form-label">{key.toUpperCase()}</label>
                  <input type="text" className="form-control" name={key} onChange={onChangeInputHandler}/>
                </div>)
              }
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!formData.name || !formData.email || !formData.phone}
                >Add Client</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>);
}

export default AddClientModal;
