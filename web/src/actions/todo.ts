import { ActionPayload, ActionType, Todo } from '../model/model';
import { Action, Dispatch } from 'redux';

export type TodoList = Todo[];

export interface TodoAction extends Action {
  todos: TodoList;
}

const todoFetchSuccess = (todos: TodoList) => {
  return {
    type: ActionType.TODO_FETCH_COMPLETE,
    todos: todos
  };
};

const todoAddSuccess = (todo: Todo) => {
  return {
    type: ActionType.TODO_ADD_COMPLETE,
    todos: todo
  };
};

export const todoFetch = () => (dispatch: Dispatch<TodoAction>) => {
  let url = process.env.REACT_APP_TODO_GETALL_URL;
  fetch(
    url, {
      method: 'get'
    })
    .then(response => response.json())
    .then(json => {
      return dispatch(todoFetchSuccess(json));
    })
    .catch(error => {
      console.log(`Api Error fetching documents : ${error}`);
    });
};

export const addTodo = (todo: Todo) => (dispatch: Dispatch<TodoAction>) => {
  let url = process.env.REACT_APP_TODO_ADD_URL;
  fetch(
    url, {
      method: 'post',
      body: JSON.stringify(todo)
    })
    .then(response => response.json())
    .then(json => {
      return dispatch(todoAddSuccess(json));
    })
    .catch(error => {
      console.log(`Api Error adding document : ${error}`);
    });

};

// Async Function expample with redux-thunk
export function completeTodo(todoId: number) {
  // here you could do API eg

  return (dispatch: Function, getState: Function) => {
    dispatch({ type: ActionType.COMPLETE_TODO, payload: todoId });
  };
}

export function uncompleteTodo(todoId: number): ActionPayload<number> {
  return {
    type: ActionType.UNCOMPLETE_TODO,
    payload: todoId
  };
}

export function deleteTodo(todoId: number): ActionPayload<number> {
  return {
    type: ActionType.DELETE_TODO,
    payload: todoId
  };
}