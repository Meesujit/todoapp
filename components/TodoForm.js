import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  try {
    useEffect(() => {
      inputRef.current.focus();
    });
    
  } catch (error) {
    console.log(error);
  }

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form flex justify-center items-center gap-2'>
      {props.edit ? (
        <>
          <Input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit rounded-[5px]'
          />
          <Button onClick={handleSubmit} className='todo-button edit'>
            Update
          </Button>
        </>
      ) : (
        <>
          <Input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <Button onClick={handleSubmit} className='todo-button'>
            Submit
          </Button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
