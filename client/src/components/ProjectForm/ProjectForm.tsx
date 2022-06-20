import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Client } from 'types/Client.type';

const statuses = [
  { name: 'Not Started', value: 'new' },
  { name: 'In Progress', value: 'progress' },
  { name: 'Completed', value: 'completed' }
];

type ProjectDataType = {
  name: string;
  description: string;
  clientId?: string;
  status: 'new' | 'progress' | 'completed' | string;
}

const ProjectForm: React.FC<{
  initialData: ProjectDataType,
  clients?: Client[],
  actionType?: string,
  onSubmit: (data: ProjectDataType) => void
}> = ({ initialData, onSubmit, clients, actionType= 'Create' }) => {
  const [formData, setFormData] = useState(initialData);

  const onChangeInputHandler: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = ({ target }) => {
    const { name, value } = target;

    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  const onSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit(formData);
  }

  return <form onSubmit={onSubmitHandler}>
    <div className="mb-3">
      <label className="form-label">Name</label>
      <input
        required type="text" value={formData.name}
        className="form-control" name='name' onChange={onChangeInputHandler}
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Description</label>
      <textarea
        required className="form-control" value={formData.description}
        name='description' onChange={onChangeInputHandler}
      />
    </div>
    { clients && <div className="mb-3">
		<label className="form-label">Client</label>
		<select
			className="form-select"
			name='clientId'
			value={formData.clientId}
			onChange={onChangeInputHandler}
			required
		>
			<option value="" disabled>Select client</option>
      { clients?.map(({ name, id}) => <option key={id} value={id}>{name}</option>) }
		</select>
	</div> }
    <div className="mb-3">
      <label className="form-label">Status</label>
      <select
        className="form-select"
        name='status'
        value={formData.status}
        onChange={onChangeInputHandler}
        required
      >
        { statuses.map(({ name, value }) => <option key={name} value={value}>{name}</option>) }
      </select>
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={Object.values(formData).some(value => !value)}
        data-bs-dismiss="modal"
      >{actionType} Project</button>
    </div>
  </form>
};

export default ProjectForm;
