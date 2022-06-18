import { prisma } from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { method } = req;

    switch (method) {
      case "GET": {
        const tasks = await prisma.task.findMany();

        return res.status(200).json({
          tasks,
        });
      }
      case "POST": {
        const { name } = req.body;

        const task = await prisma.task.create({
          data: {
            name,
          },
        });

        return res.status(201).json({
          task,
        });
      }
      case "PATCH": {
        const { id, name, completed } = req.body;

        const task = await prisma.task.update({
          where: {
            id,
          },
          data: {
            name,
            completed,
          },
        });

        return res.status(200).json({
          task,
        });
      }
      case "DELETE": {
        const { id: taskId } = req.body;

        const task = await prisma.task.delete({
          where: {
            id: taskId,
          },
        });

        return res.status(200).json({
          task,
        });
      }
      default: {
        return res.status(405).end();
      }
    }
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
