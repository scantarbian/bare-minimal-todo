import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type TaskItem = {
  id: string;
  name: string;
  completed: boolean;
};

type Props = {
  className?: string;
  task: TaskItem;
};

const Item = ({ className, task }: Props) => {
  return (
    <div className={` ${className}`}>
      <span>{task.name}</span>
    </div>
  );
};

export default Item;
