import { IncomingMessage, ServerResponse } from "http";
import { v4 as uuidv4 } from "uuid";

import { IUser } from "../types";

const database: Record<string, IUser> = {};

export function getUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const users = Object.values(database);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(users));
  } catch (error) {
    sendErrorResponse(res, 500, "Internal server error");
  }
}

export function getUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const { url } = req;
    const userId = url!.split("/")[3];

    if (!isValidUUID(userId)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Invalid userId" }));
      return;
    }

    const user = database[userId];
    if (!user) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(user));
  } catch (error) {
    sendErrorResponse(res, 500, "Internal server error");
  }
}

export function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const { username, age, hobbies } = JSON.parse(body);

      if (!username || !age || !hobbies) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({ error: "Username, age, and hobbies are required" })
        );
        return;
      }

      const id = uuidv4();
      const newUser: IUser = { id, username, age, hobbies };
      database[id] = newUser;

      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(newUser));
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Internal server error");
  }
}

export function updateUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const { url } = req;
    const userId = url!.split("/")[3];

    if (!isValidUUID(userId)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Invalid userId" }));
      return;
    }

    const user = database[userId];
    if (!user) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const { username, age, hobbies } = JSON.parse(body);

      if (username) {
        user.username = username;
      }

      if (age) {
        user.age = age;
      }

      if (hobbies) {
        user.hobbies = hobbies;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(user));
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Internal server error");
  }
}

export function deleteUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const { url } = req;
    const userId = url!.split("/")[3];

    if (!isValidUUID(userId)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Invalid userId" }));
      return;
    }

    const user = database[userId];
    if (!user) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }

    delete database[userId];

    res.statusCode = 204;
    res.end();
  } catch (error) {
    sendErrorResponse(res, 500, "Internal server error");
  }
}

function isValidUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

function sendErrorResponse(
  res: ServerResponse,
  statusCode: number,
  message: string
) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: message }));
}