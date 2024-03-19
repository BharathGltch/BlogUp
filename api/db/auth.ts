import { pgp, db } from "./initConn";

async function authenticateUser(
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

export default authenticateUser;
