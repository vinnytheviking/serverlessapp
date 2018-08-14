import createReducer from './createReducer';
import { Action, ActionType, Todo } from '../model/model';

export type ListTodos = Todo[];

export interface TodoState {
    todos: ListTodos;
    loading: boolean;
    error: boolean;
}

export const todoList = createReducer([], {
    [ActionType.GET_TODOS](state: Array<Todo>, action: Action<Array<Todo>>) {
        state = action.payload;
        return state;        
    },
    [ActionType.ADD_TODO](state: Array<Todo>, action: Action<Todo>) {
        return [...state, action.payload];
    },
    [ActionType.COMPLETE_TODO](state: Array<Todo>, action: Action<number>) {
        // search after todo item with the given id and set completed to true
        return state.map(t => t.id === action.payload ? { ...t, completed: true } : t);
    },
    [ActionType.UNCOMPLETE_TODO](state: Array<Todo>, action: Action<number>) {
        // search after todo item with the given id and set completed to false
        return state.map(t => t.id === action.payload ? { ...t, completed: false } : t);
    },
    [ActionType.DELETE_TODO](state: Array<Todo>, action: Action<number>) {
        // remove all todos with the given id
        return state.filter(t => t.id !== action.payload);
    },
});
