import {Document,  Types } from "mongoose";


declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      userId?: string;
    }
  }
}

export type CustomJwtPayload = {
  userid: string;
  phone: number
 
};

export interface IUser extends Document{
        _id: string;
    name: string;
    phone: number;
    passwordHash: string;
 
}

// Payload stored in JWT
export interface TokenPayload {
    userid: string;
    phone: number;
}

export interface ITodo extends Document{
  text: string;
  completed: boolean;
  
}