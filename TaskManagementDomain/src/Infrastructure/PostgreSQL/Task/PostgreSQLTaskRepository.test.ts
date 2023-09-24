import { Title } from 'Domain/models/Task/Title/Title';
import { MockDomainEventSubscriber } from 'Infrastructure/DomainEvent/DomainEventSubscriber';

import { DomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import {
  TEST_DATA,
  taskTestDataCreator,
} from 'Infrastructure/shared/Task/taskTestDataCreator';
import { PostgreSQLTaskRepository } from './PostgreSQLTaskRepository';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';

describe('PostgreSQLTaskRepository', () => {
  const repository = new PostgreSQLTaskRepository();
  const mockDomainEventSubscriber = new MockDomainEventSubscriber();
  const domainEventPublisher = new DomainEventPublisher(
    mockDomainEventSubscriber
  );

  it('findById', async () => {
    const createdEntity = await taskTestDataCreator(repository)({});

    const readEntity = await repository.findById(
      createdEntity.taskGroupId,
      createdEntity.taskId
    );

    expect(readEntity).not.toBeNull();
    expect(readEntity).toEqual(createdEntity);
  });

  it('findAll', async () => {
    const createdEntity = await taskTestDataCreator(repository)({});
    await taskTestDataCreator(repository)({
      taskId: 'test-entity-id2',
    });
    await taskTestDataCreator(repository)({
      taskId: 'test-entity-id3',
    });

    const readEntities = await repository.findAll(createdEntity.taskGroupId);

    expect(readEntities).toHaveLength(3);
  });

  it('update', async () => {
    const createdEntity = await taskTestDataCreator(repository)({});
    const updateValue = Title.create('aaaaaaaaaaa');
    createdEntity.update({
      title: updateValue,
      taskGroupId: createdEntity.taskGroupId,
      description: createdEntity.description,
      status: createdEntity.status,
      dueDate: createdEntity.dueDate,
    });

    await repository.update(createdEntity, domainEventPublisher);

    const readEntity = await repository.findById(
      createdEntity.taskGroupId,
      createdEntity.taskId
    );
    expect(readEntity?.title?.equals(updateValue)).toBeTruthy();
  });

  it('remove', async () => {
    const createdEntity = await taskTestDataCreator(repository)({});

    const readEntity = await repository.findById(
      createdEntity.taskGroupId,
      createdEntity.taskId
    );
    expect(readEntity).not.toBeNull();

    await repository.remove(createdEntity, domainEventPublisher);
    const allEntities = await repository.findAll(
      TaskGroupId.create(TEST_DATA.taskGroupId)
    );
    expect(allEntities).toHaveLength(0);
  });
});
