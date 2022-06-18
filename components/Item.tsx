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
    <div
      className={`p-2 w-1/2 flex divide-x-2 divide-black bg-white rounded-2xl backdrop-filter backdrop-blur-xl bg-opacity-30 ${className}`}
    >
      <span className="pr-2">Checklist</span>
      <span className="flex-1 px-2">{task.name}</span>
      <span className="pl-2">Control buttons</span>
    </div>
  );
};

export default Item;
