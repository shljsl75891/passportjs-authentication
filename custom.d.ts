declare namespace Express {
  export interface Request {
    session: {
      visited?: number;
    };
  }
}
