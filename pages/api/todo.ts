import { prisma } from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { method } = req;

    switch (method) {
      case "GET":
        const tasks = await prisma.task.findMany();

        res.status(200).json({
          tasks,
        });

        break;
      case "POST":
        const { name } = req.body;

        const task = await prisma.task.create({
          data: {
            name,
          },
        });

        res.status(201).json({
          task,
        });

        break;
      case "PATCH":
        const { id, name: newName, completed } = req.body;

        const taskToUpdate = await prisma.task.update({
          where: {
            id,
          },
          data: {
            name: newName,
            completed,
          },
        });

        res.status(200).json({
          taskToUpdate,
        });

        break;
      case "DELETE":
        const { id: taskId } = req.body;

        const taskToDelete = await prisma.task.delete({
          where: {
            id: taskId,
          },
        });

        res.status(200).json({
          taskToDelete,
        });

        break;
      default:
        return res.status(405).end();
    }
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
