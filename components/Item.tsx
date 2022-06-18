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
  onDelete: () => void;
};

const Item = ({ className, task, onDelete }: Props) => {
  const [taskData, setTaskData] = useState<TaskItem>(task);

  return (
    <div
      className={`p-2 w-1/2 flex divide-x-2 divide-black bg-white rounded-2xl backdrop-filter backdrop-blur-xl bg-opacity-30 filter drop-shadow-lg ${className}`}
    >
      <span className="pr-2">
        <input
          type="checkbox"
          className="h-7 w-7 border-2 rounded-xl"
          checked={taskData.completed}
          onClick={() => {
            fetch("/api/todo", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: taskData.id,
                completed: !taskData.completed,
              }),
            }).then((res) => {
              res.json().then((data) => {
                setTaskData(data.task);
              });
            });
          }}
        />
      </span>
      <span className="flex-1 px-2">{task.name}</span>
      <span className="pl-2">
        <button
          className="hover:font-bold text-red-500"
          onClick={() => {
            fetch("/api/todo", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: taskData.id,
              }),
            }).then((res) => {
              if (res.ok) {
                onDelete();
              }
            });
          }}
        >
          DELETE
        </button>
      </span>
    </div>
  );
};

export default Item;
