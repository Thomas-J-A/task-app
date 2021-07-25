import React from 'react';

const ListItem = (props) => {
  const { index, text, edit, id, removeTask, editTask } = props;
  let el, button;

  if (edit) {
    el = <input type='text' />;
    button = <button onClick={ editTask }>Update Task</button>
  } else {
    el = `${ index + 1} ${ text }`;
    button = <button id='edit-btn' onClick={ editTask }>Edit</button>;
  }

  return (
    <li data-id={ id }>
      { el }
      <i class="fas fa-trash-alt" onClick={ removeTask }></i>
      { button }
    </li>
  );
};

const Overview = (props) => {
  const { tasks, removeTask, editTask } = props;

  return (
    <ul>
      {tasks.map((task, index) => {
        return (
          <ListItem 
            key={ task.id } 
            index={ index }
            text={ task.text }
            edit= { task.edit }
            id={ task.id }
            removeTask={ removeTask }
            editTask={ editTask } />
        );
      })
      }
    </ul>
  );
};

export default Overview;
