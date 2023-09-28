import { TaskGroupName } from 'Domain/models/TaskGroup/TaskGroupName/TaskGroupName';

import { MockDomainEventSubscriber } from 'Infrastructure/DomainEvent/DomainEventSubscriber';

import { DomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { taskGroupTestDataCreator } from 'Infrastructure/shared/TaskGroup/taskGroupTestDataCreator';
import { PostgreSQLTaskGroupRepository } from './PostgreSQLTaskGroupRepository';
import { initializeTestDB } from '../../../../setupJest';

describe('PostgreSQLTaskGroupRepository', () => {
  beforeEach(async () => {
    await initializeTestDB();
  });

  const repository = new PostgreSQLTaskGroupRepository();
  const mockDomainEventSubscriber = new MockDomainEventSubscriber();
  const domainEventPublisher = new DomainEventPublisher(
    mockDomainEventSubscriber
  );

  it('findById', async () => {
    const createdEntity = await taskGroupTestDataCreator(repository)({});

    const readEntity = await repository.findById(createdEntity.taskGroupId);

    expect(readEntity).not.toBeNull();
    expect(readEntity).toEqual(createdEntity);
  });

  it('findAll', async () => {
    await taskGroupTestDataCreator(repository)({});
    await taskGroupTestDataCreator(repository)({
      taskGroupId: 'test-entity-id2',
    });
    await taskGroupTestDataCreator(repository)({
      taskGroupId: 'test-entity-id3',
    });

    const readEntities = await repository.findAll();

    expect(readEntities).toHaveLength(3);
  });

  it('update', async () => {
    const createdEntity = await taskGroupTestDataCreator(repository)({});
    const updateValue = TaskGroupName.create('aaaaaaaaaaa');
    createdEntity.update({
      taskGroupName: updateValue,
    });

    await repository.update(createdEntity, domainEventPublisher);

    const readEntity = await repository.findById(createdEntity.taskGroupId);
    expect(readEntity?.taskGroupName?.equals(updateValue)).toBeTruthy();
  });

  it('remove', async () => {
    const createdEntity = await taskGroupTestDataCreator(repository)({});

    const readEntity = await repository.findById(createdEntity.taskGroupId);
    expect(readEntity).not.toBeNull();

    await repository.remove(createdEntity, domainEventPublisher);
    const allEntities = await repository.findAll();
    expect(allEntities).toHaveLength(0);
  });
});
