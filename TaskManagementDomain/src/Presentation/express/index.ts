import 'reflect-metadata';
import '../program';

import { container } from 'tsyringe';
import { DomainException } from '../../Domain/shared/DomainException';
import express, { Response, Request, NextFunction, json } from 'express';
import { TaskGroupCreateService } from 'Application/TaskGroup/TaskGroupCreateService/TaskGroupCreateService';
import { ApplicationException } from 'Application/shared/ApplicationException';
import { TaskGroupRemoveService } from 'Application/TaskGroup/TaskGroupRemoveService/TaskGroupRemoveService';

const app = express();
app.use(json());

const PORT = process.env.PORT || 3003;
app.listen(PORT);

app.get('/', (req, res) => {
  res.end('hello world');
});

const errorHandler = (
  err: Error,
  req: Request,
  res: Response<{
    type: 'error';
    status: number;
    code: string;
    message: string;
  }>,
  next: NextFunction // eslint-disable-line
) => {
  if (err instanceof DomainException) {
    res.status(err.status).json({
      type: 'error',
      status: err.status,
      code: err.code,
      message: err.message ?? '不正な要求です',
    });
  }

  // ApplicationException
  if (err instanceof ApplicationException) {
    res.status(err.status).json({
      type: 'error',
      status: err.status,
      code: err.code,
      message: err.message ?? '不正な要求です',
    });
  }

  res.status(500).json({
    type: 'error',
    status: 500,
    code: 'internal_server_error',
    message: `${err.message ?? 'internal server error'}`,
  });
};

// taskGroup
app.post(
  '/task_groups',
  async (
    req: Request<never, never, { taskGroupName: string }, never>,
    res: Response<{ taskGroupId: string }>,
    next: NextFunction
  ) => {
    try {
      const { taskGroupId } = await container
        .resolve(TaskGroupCreateService)
        .execute({ taskGroupName: req.body.taskGroupName });

      res.status(200).json({ taskGroupId });
    } catch (error) {
      next(error);
    }
  }
);
app.delete(
  '/task_groups/:id',
  async (
    req: Request<{ id: string }, never, { taskGroupId: string }, never>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await container
        .resolve(TaskGroupRemoveService)
        .execute({ taskGroupId: req.params.id });

      res.status(204);
    } catch (error) {
      next(error);
    }
  }
);

// task
// app.get('/task_groups/:taskGroupId/tasks', async (req, res) => {});
// app.post('/task_groups/:taskGroupId/tasks', async (req, res) => {});
// app.delete('/task_groups/:taskGroupId/tasks', async (req, res) => {});

// カスタムエラーハンドラーミドルウェア。一番最後の行で設定。
app.use(errorHandler);
