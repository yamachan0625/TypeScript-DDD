import { container } from 'tsyringe';

container.register('ITaskRepository', {
  useClass: PostgreSQLTaskRepository,
});

container.register('ITaskGroupRepository', {
  useClass: PostgreSQLTaskGroupRepository,
});
