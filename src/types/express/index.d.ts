import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id?: { toString: () => string } | string;
        id?: string;
      };
    }
  }
}

export {};
