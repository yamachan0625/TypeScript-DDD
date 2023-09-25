import { DomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { DomainEventSubscriber } from 'Infrastructure/DomainEvent/DomainEventSubscriber';
import { PostgreSQLTaskRepository } from 'Infrastructure/PostgreSQL/Task/PostgreSQLTaskRepository';
import { PostgreSQLTaskGroupRepository } from 'Infrastructure/PostgreSQL/TaskGroup/PostgreSQLTaskGroupRepository';
import { container } from 'tsyringe';

container.register('ITaskRepository', {
  useClass: PostgreSQLTaskRepository,
});

container.register('ITaskGroupRepository', {
  useClass: PostgreSQLTaskGroupRepository,
});

// Shared
container.register('IDomainEventSubscriber', {
  useClass: DomainEventSubscriber,
});
container.register('IDomainEventPublisher', {
  useClass: DomainEventPublisher,
});
