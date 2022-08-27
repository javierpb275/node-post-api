import { Request, Response } from "express";

export default class UserController {
  public static async test(
    req: Request,
    res: Response
  ): Promise<Response> {
    return res.status(200).send({ message: "hello world!" });
  }
}
