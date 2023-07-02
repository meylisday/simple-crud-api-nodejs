/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
export declare function getUsers(req: IncomingMessage, res: ServerResponse): void;
export declare function getUser(req: IncomingMessage, res: ServerResponse): void;
export declare function createUser(req: IncomingMessage, res: ServerResponse): void;
export declare function updateUser(req: IncomingMessage, res: ServerResponse): void;
export declare function deleteUser(req: IncomingMessage, res: ServerResponse): void;
