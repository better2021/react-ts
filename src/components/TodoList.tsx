import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useReducer,
} from "react";

import TdInput from "./Input";
import TdList from "./List/index";
import { todoReducer } from "./reducer";
import { ACTION_TYPE, IState, ITodo } from "./types";

const initialState: IState = {
  todoList: [],
};

const TodoList: FC = (): ReactElement => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    console.log(state.todoList);
    const todoList = JSON.parse(localStorage.getItem("todoList") || "[]");

    dispatch({
      type: ACTION_TYPE.INIT_TODOLIST,
      payload: todoList,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(state.todoList));
  }, [state.todoList]);

  const addTodo = useCallback((todo: ITodo): void => {
    console.log(todo);
    dispatch({
      type: ACTION_TYPE.ADD_TODO,
      payload: todo,
    });
  }, []);

  const removeTodo = useCallback((id: number): void => {
    dispatch({
      type: ACTION_TYPE.REMOVE_TODO,
      payload: id,
    });
  }, []);

  const toggleTodo = useCallback((id: number): void => {
    dispatch({
      type: ACTION_TYPE.TOGGLE_TODO,
      payload: id,
    });
  }, []);

  return (
    <div className="todo-list">
      <TdInput addTodo={addTodo} todoList={state.todoList} />
      <TdList
        todoList={state.todoList}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  );
};

export default TodoList;
