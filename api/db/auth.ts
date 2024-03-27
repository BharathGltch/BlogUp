import { pgp, db } from "./initConn";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function authenticateUser(
  username: string,
  password: string
): Promise<{ userid: string; username: string } | null> {
  let query: string =
    "Select userid,username from users Where username=$1 AND password=$2;";
  const users = await db.any(query, [username, password]);
  pgp.end();
  if (users.length > 0) {
    return users[0];
  }
  return null;
}

export async function authenticateUserPrisma(
  username: string,
  password: string
): Promise<{ userid: number; username: string } | null> {
  const user = await prisma.users.findFirst({
    where: {
      username: username,
      password: password,
    },
  });
  if (user == null) {
    return null;
  }
  return {
    userid: user.userid,
    username: username,
  };
}
