import type { Request, Response, NextFunction } from "express";
import { ValidationChain } from "express-validator";

export type ValidationMiddleware =
  | ValidationChain
  | ((req: Request, res: Response, next: NextFunction) => void | Response);
