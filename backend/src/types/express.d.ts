import { Request, Response, RequestHandler as ExpressRequestHandler } from 'express';

type AsyncRequestHandler = (req: Request, res: Response) => Promise<void>;
type AsyncRequestHandlerWithParams<T> = (req: Request<T>, res: Response) => Promise<void>;

export type RequestHandler = AsyncRequestHandler;
export type RequestHandlerWithParams<T> = AsyncRequestHandlerWithParams<T>; 