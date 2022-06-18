import prisma from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { method } = req;

    switch (method) {
      case "GET":
        return res.status(200);
      case "POST":
        return res.status(200);
      case "PATCH":
        return res.status(200);
      case "DELETE":
        return res.status(200);
      default:
        return res.status(405).end();
    }
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
