import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type TaskItem = {
  id: string;
  name: string;
  completed: boolean;
};

type Inputs = {
  name: string;
};

type Props = {
  className?: string;
  task: TaskItem;
  onDelete: () => void;
  onUpdate: (task: TaskItem) => void;
};

const Item = ({ className, task, onDelete, onUpdate }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [taskData, setTaskData] = useState<TaskItem>(task);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: task,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("/api/todo", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: taskData.id,
        name: data.name,
      }),
    }).then((res) => {
      res.json().then((data) => {
        setTaskData(data.task);
        onUpdate(data.task);
        setEditMode(false);
      });
    });
  };

  return (
    <div
      className={`p-2 w-1/2 flex items-center divide-x-2 divide-black bg-white rounded-2xl backdrop-filter backdrop-blur-xl bg-opacity-30 filter drop-shadow-lg ${className}`}
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
      {editMode ? (
        <form
          className="px-2 flex-1 flex items-center space-x-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Task"
            className="rounded-2xl w-full"
            {...register("name", { required: true })}
          />
          <button className="hover:font-bold text-green-500" type="submit">
            SAVE
          </button>
        </form>
      ) : (
        <>
          <span className="flex-1 px-2">{task.name}</span>
          <span className="pl-2 flex space-x-2 items-center">
            <button
              className="hover:font-bold"
              onClick={() => {
                setEditMode(true);
              }}
            >
              EDIT
            </button>
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
        </>
      )}
    </div>
  );
};

export default Item;
