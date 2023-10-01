import { container } from 'tsyringe';

import { TaskId } from 'Domain/models/Task/TaskId/TaskId';
import { MockDomainEventSubscriber } from 'Infrastructure/DomainEvent/DomainEventSubscriber';
import {
  TEST_DATA,
  taskTestDataCreator,
} from 'Infrastructure/shared/Task/taskTestDataCreator';

import { TaskUpdateService } from './TaskUpdateService';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';

describe('TaskUpdateService', () => {
  it('Taskが正常に更新され、ドメインイベント(TaskUpdatedEvent)が一度呼ばれる', async () => {
    const service = container.resolve(TaskUpdateService);
    const repository = service['repository'];
    const domainEventSubscriber = service['domainEventPublisher']
      .domainEventSubscriber as MockDomainEventSubscriber;

    await taskTestDataCreator(repository)({});
    const createdTask = await repository.findById(
      TaskGroupId.create(TEST_DATA.taskGroupId),
      TaskId.create(TEST_DATA.taskId)
    );
    expect(createdTask).not.toBeNull();

    // データが正しく更新されるか
    const updateData = {
      title: 'aaaaaaaaaa',
    };
    await service.execute({
      ...TEST_DATA,
      ...updateData,
    });
    const updatedTask = await repository.findById(
      TaskGroupId.create(TEST_DATA.taskGroupId),
      TaskId.create(TEST_DATA.taskId)
    );
    expect(updatedTask?.title.value).toEqual(updateData.title);

    const expectEventName = 'TaskUpdatedEvent';
    domainEventSubscriber.assertCall(expectEventName);
  });

  it('updateで例外が発生した場合、ドメインイベント(TaskCreatedEvent)が一度も呼ばれない', async () => {
    // given
    const service = container.resolve(TaskUpdateService);
    const repository = service['repository'];
    const domainEventSubscriber = service['domainEventPublisher']
      .domainEventSubscriber as MockDomainEventSubscriber;

    await taskTestDataCreator(repository)({});
    const createdTask = await repository.findById(
      TaskGroupId.create(TEST_DATA.taskGroupId),
      TaskId.create(TEST_DATA.taskId)
    );
    expect(createdTask).not.toBeNull();

    // 不正データで例外を出す
    await expect(
      service.execute({
        ...TEST_DATA,
        title: 'πππ', // 異常
      })
    ).rejects.toThrow();

    domainEventSubscriber.assertNotCall();
  });
});
