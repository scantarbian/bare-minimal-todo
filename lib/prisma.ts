import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["info", `warn`, `error`],
    errorFormat: "pretty",
  });
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient({
      log: ["query", "info", `warn`, `error`],
      errorFormat: "pretty",
    });
  }
  // @ts-ignore
  prisma = global.prisma;
}

export default prisma;
