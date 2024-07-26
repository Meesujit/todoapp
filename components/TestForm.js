import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

function TodoForm(props) {
  const [formData, setFormData] = useState({
    firstName: props.edit ? props.edit.firstName : '',
    lastName: props.edit ? props.edit.lastName : '',
    bio: props.edit ? props.edit.bio : ''
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      ...formData
    });
    setFormData({ firstName: '', lastName: '', bio: '' });
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form flex flex-col items-center'>
      <Input
        placeholder='First Name'
        value={formData.firstName}
        onChange={handleChange}
        name='firstName'
        className='todo-input'
        ref={inputRef}
      />
      <Input
        placeholder='Last Name'
        value={formData.lastName}
        onChange={handleChange}
        name='lastName'
        className='todo-input'
      />
      <textarea
        placeholder='Bio'
        value={formData.bio}
        onChange={handleChange}
        name='bio'
        className='todo-input'
      />
      <Button type='submit' className='todo-button'>
        {props.edit ? 'Update Info' : 'Add Info'}
      </Button>
    </form>
  );
}

export default TodoForm;
