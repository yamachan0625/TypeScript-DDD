import { PrismaClient } from '@prisma/client';
import { DomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { MockDomainEventSubscriber } from 'Infrastructure/DomainEvent/DomainEventSubscriber';
import { InMemoryTaskRepository } from 'Infrastructure/InMemory/Task/InMemoryTaskRepository';
import { InMemoryTaskGroupRepository } from 'Infrastructure/InMemory/TaskGroup/InMemoryTaskGroupRepository';
import { runTransactionMock } from 'Infrastructure/shared/Transaction/MockRunTransaction';
import { container } from 'tsyringe';

container.register('ITaskRepository', {
  useClass: InMemoryTaskRepository,
});

container.register('ITaskGroupRepository', {
  useClass: InMemoryTaskGroupRepository,
});

// Shared
container.register('IDomainEventSubscriber', {
  useClass: MockDomainEventSubscriber,
});
container.register('IDomainEventPublisher', {
  useClass: DomainEventPublisher,
});

const prisma = new PrismaClient();
container.register('IRunTransaction', {
  useValue: prisma.$transaction,
});
