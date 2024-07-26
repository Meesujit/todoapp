import React, { useState, useRef } from 'react'
import TodoForm from './TodoForm'

import { IoCloseCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdDownloading } from "react-icons/md";

import { Reorder } from 'framer-motion'


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {



  const [edit, setEdit] = useState({
    id: null,
    value: ''
  })
  const [item, setItem] = useState({ todos })

  const pdfRef = useRef(null);

  const handleGeneratePdf = async () => {
    const inputData = pdfRef.current;

    try {
      const canvas = await html2canvas(inputData);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: 'a4'
      })
      
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0 , 0, width, height);
      pdf.save('Document.pdf')
    } catch (error) {
      console.log('Error while creating the pdf: '+error)
    }
  }

  const submitUpdate = (value) => {
    updateTodo(edit.id, value)
    setEdit({
      id: null,
      value: ''
    })
  }

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />
  }




  return (
    <div ref={pdfRef}>
      <Reorder.Group
        values={item}
        onReorder={setItem}
        axis='y'
      >
        {todos.map((todo, index) => (
          <Reorder.Item
            item={item}
            key={item}>

              {/* CARD CONTENT  */}
              <div className='todo-container'>

              <div
                className={`${todo.isComplete ? 'todo-row complete' : 'todo-row'} shadow-md shadow-slate-700`}
                key={index}
                >
                <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                  <p className='font-mono text-lg' >
                  {todo.text}
                  </p>
                </div>
                <div className='icons'>
                  <IoCloseCircleOutline
                    onClick={() => removeTodo(todo.id)}
                    className='icon-image '
                    />
                  <CiEdit
                    onClick={() => setEdit({ id: todo.id, value: todo.text })}
                    className='icon-image'
                    />
                  <MdDownloading className='icon-image' onClick={handleGeneratePdf}/>
                </div>
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>

  )
}

export default Todo