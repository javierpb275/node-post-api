import jwt from "jsonwebtoken";
import config from "../config/config";
import { Request, Response, NextFunction } from "express";

export interface IPayload {
  id: any;
  iat: number;
  exp: number;
}

export interface CRequest extends Request {
  user_id?: any;
}

export const auth = async (
  req: CRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader: string | undefined = req.header("Authorization");
    if (!authHeader) {
      throw new Error("No Authorization Header was provided.");
    }

    const token: string = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("No Token was provided.");
    }

    const payload = jwt.verify(
      token,
      config.AUTH.ACCESS_TOKEN_SECRET
    ) as IPayload;

    req.user_id = payload.id;

    next();
  } catch (err) {
    res.status(401).send({
      error: true,
      data: { message: "You are not authorized", error: err },
    });
  }
};
