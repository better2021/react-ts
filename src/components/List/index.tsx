import React, { FC, ReactElement } from "react";
import { ITodo } from "../types";
import TdItem from "./item";

interface Iprops {
  todoList: ITodo[];
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const TdList: FC<Iprops> = ({
  todoList,
  removeTodo,
  toggleTodo,
}): ReactElement => {
  return (
    <div className="td-list">
      {todoList.length &&
        todoList.map((todo: ITodo) => {
          return (
            <TdItem
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              toggleTodo={toggleTodo}
            />
          );
        })}
    </div>
  );
};

export default TdList;
