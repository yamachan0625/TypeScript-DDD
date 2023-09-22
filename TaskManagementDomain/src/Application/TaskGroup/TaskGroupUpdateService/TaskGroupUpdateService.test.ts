import { container } from 'tsyringe';

import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { MockDomainEventSubscriber } from 'Infrastructure/DomainEvent/DomainEventSubscriber';
import {
  TEST_DATA,
  taskGroupTestDataCreator,
} from 'Infrastructure/shared/TaskGroup/taskGroupTestDataCreator';

import { TaskGroupUpdateService } from './TaskGroupUpdateService';

describe('TaskGroupUpdateService', () => {
  it('TaskGroupが正常に更新され、ドメインイベント(TaskGroupUpdatedEvent)が一度呼ばれる', async () => {
    const service = container.resolve(TaskGroupUpdateService);
    const repository = service['repository'];
    const domainEventSubscriber = service['domainEventPublisher']
      .domainEventSubscriber as MockDomainEventSubscriber;

    await taskGroupTestDataCreator(repository)({});
    const createdTaskGroup = await repository.findById(
      TaskGroupId.create(TEST_DATA.taskGroupId)
    );
    expect(createdTaskGroup).not.toBeNull();

    // データが正しく更新されるか
    const updateData = {
      taskGroupName: 'aaaaaaaaaa',
    };
    await service.execute({
      ...TEST_DATA,
      ...updateData,
    });
    const updatedTaskGroup = await repository.findById(
      TaskGroupId.create(TEST_DATA.taskGroupId)
    );
    expect(updatedTaskGroup?.taskGroupName?.value).toEqual(
      updateData.taskGroupName
    );

    const expectEventName = 'TaskGroupUpdatedEvent';
    domainEventSubscriber.assertCall(expectEventName);
  });

  it('updateで例外が発生した場合、ドメインイベント(TaskGroupCreatedEvent)が一度も呼ばれない', async () => {
    // given
    const service = container.resolve(TaskGroupUpdateService);
    const repository = service['repository'];
    const domainEventSubscriber = service['domainEventPublisher']
      .domainEventSubscriber as MockDomainEventSubscriber;

    await taskGroupTestDataCreator(repository)({});
    const createdTaskGroup = await repository.findById(
      TaskGroupId.create(TEST_DATA.taskGroupId)
    );
    expect(createdTaskGroup).not.toBeNull();

    // 不正データで例外を出す
    await expect(
      service.execute({
        ...TEST_DATA,
        taskGroupName: '@', // 異常
      })
    ).rejects.toThrow();

    domainEventSubscriber.assertNotCall();
  });
});
