import { Request, Response } from "express";

export const publicRequest = (req: Request, res: Response) => {
    res.send( {message:"Public request"})
};

export const privateRequest = (req: Request, res: Response) => {
    res.send( {message:"private request"})
};