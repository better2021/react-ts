import React, { useRef, FC, ReactElement, useEffect } from "react";
import { ITodo } from "./types";

/**
 * FC 为函数类型
 * addTodo{
 *  id:number  new Date().getTime()
 *  content:string
 *  completed:boolean
 * }
 * @returns
 */

interface Iprops {
  addTodo: (todo: ITodo) => void;
  todoList: ITodo[];
}

const TdInput: FC<Iprops> = ({ addTodo, todoList }): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null); // HTMLInputElement 是个泛型

  useEffect(() => {
    document.onkeyup = (e) => {
      if (e.keyCode === 13) {
        addItem();
      }
    };
  });

  const addItem = (): void => {
    const val: string = inputRef.current?.value.trim() ?? "";

    if (val?.length) {
      const isExist = todoList.find((todo) => todo.content === val);

      if (isExist) {
        alert("已存在该项");
        return;
      }

      addTodo({
        id: new Date().getTime(),
        content: val,
        completed: false,
      });

      inputRef.current!.value = "";
    }
  };

  return (
    <div className="todo-input">
      <input type="text" placeholder="请输入待办项" ref={inputRef} />
      <button onClick={addItem}>增加</button>
    </div>
  );
};

export default TdInput;
