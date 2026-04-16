import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  
  // High-level logging for the backend
  console.error(`[ERROR] ${req.method} ${req.path} - ${statusCode}`);
  console.error(err.stack);

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    // Only send stack trace in development mode
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
