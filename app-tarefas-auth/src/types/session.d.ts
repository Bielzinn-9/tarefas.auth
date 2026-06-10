import "express-session";
import { Role } from "../enums/Role";

declare module "express-session" {
  interface SessionData {
    userId: number;
    userName: string;
    userRole: Role;
    flash: string | null;
  }
}