"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserPrisma = exports.authenticateUser = void 0;
const initConn_1 = require("./initConn");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function authenticateUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = "Select userid,username from users Where username=$1 AND password=$2;";
        const users = yield initConn_1.db.any(query, [username, password]);
        initConn_1.pgp.end();
        if (users.length > 0) {
            return users[0];
        }
        return null;
    });
}
exports.authenticateUser = authenticateUser;
function authenticateUserPrisma(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.users.findFirst({
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
    });
}
exports.authenticateUserPrisma = authenticateUserPrisma;
