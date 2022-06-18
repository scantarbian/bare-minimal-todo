import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSideProps,
} from "next";
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
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

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
        <main className="flex flex-col items-center w-full ">
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
          {data?.tasks?.map((task: TaskItem) => (
            <Item key={task.id} task={task} />
          ))}
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
  const tasks = await prisma.task.findMany();

  return {
    props: {
      tasks,
    },
  };
};

export default Home;
