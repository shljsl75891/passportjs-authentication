import { Request, Response } from "express";

export function getGreet(req: Request, res: Response) {
  if (req.session.visited) {
    req.session.visited++;
  } else {
    req.session.visited = 1;
  }

  res.send(`<h1>You have visited this session: ${req.session.visited}</h1>`);
}
