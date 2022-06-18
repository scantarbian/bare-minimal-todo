import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSideProps,
} from "next";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// lib
import { prisma } from "../lib/prisma";
// components
import Head from "next/head";
import Item from "../components/Item";

type TaskItem = {
  id: string;
  name: string;
  completed: boolean;
};

type Inputs = {
  name: string;
};

const Home: NextPage = ({
  tasks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [tasksData, setTasksData] = useState<TaskItem[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        reset();
      }

      res.json().then((data) => {
        // append data.task to tasksData
        setTasksData((prevTasksData) => [...prevTasksData, data.task]);
      });
    });
  };

  useEffect(() => {
    const data = JSON.parse(tasks);
    setTasksData(data);
  }, [tasks]);

  return (
    <>
      <Head>
        <title>Tasker</title>
      </Head>
      <div className="">
        <header className="flex flex-col w-full items-center my-20">
          <h1 className="text-white font-bold text-5xl ">
            👋 Welcome to Tasker! ✅
          </h1>
          <span className="pt-4 text-xl text-gray-200 font-light">
            Minimalist To-Do List Web App w/ React and MySQL
          </span>
        </header>
        <main className="flex flex-col items-center w-full space-y-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 flex flex-col items-center bg-white rounded-2xl backdrop-filter backdrop-blur-xl bg-opacity-30 w-1/2 space-y-4 filter drop-shadow-lg"
          >
            <input
              type="text"
              placeholder="Task"
              className="rounded-2xl w-full"
              {...register("name", { required: true })}
            />
            <div className={`flex items-center space-x-10`}>
              <button
                type="submit"
                className="p-4 rounded-2xl bg-white font-light
                transform-gpu transition duration-500
                hover:bg-gray-100 hover:scale-110
                focus:scale-100 focus:bg-gray-100"
              >
                Add New Task
              </button>
            </div>
          </form>
          <div className="flex flex-col w-full items-center space-y-4">
            {tasksData?.map((task: TaskItem) => (
              <Item
                key={task.id}
                task={task}
                onDelete={() => {
                  setTasksData((prevTasksData) =>
                    prevTasksData.filter((t) => t.id !== task.id)
                  );
                }}
                onUpdate={(task) => {
                  setTasksData((prevTasksData) =>
                    prevTasksData.map((t) => (t.id === task.id ? task : t))
                  );
                }}
              />
            ))}
          </div>
        </main>
        <footer className="mt-20 w-full p-4 text-white text-center">
          <span>
            Made with ❤ by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/scantarbian/"
            >
              scantarbian
            </a>
          </span>
        </footer>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.task.findMany();

  const tasks = JSON.stringify(data);

  return {
    props: {
      tasks,
    },
  };
};

export default Home;
