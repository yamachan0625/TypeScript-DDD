import { container } from 'tsyringe';

import { MockDomainEventSubscriber } from 'Infrastructure/DomainEvent/DomainEventSubscriber';

import { TaskId } from 'Domain/models/Task/TaskId/TaskId';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';

import { TaskCreateService } from './TaskCreateService';
import { TEST_DATA } from 'Infrastructure/shared/Task/taskTestDataCreator';

describe('TaskCreateService', () => {
  it('Taskが正常に作成され、ドメインイベント(TaskCreatedEvent)が一度呼ばれる', async () => {
    const service = container.resolve(TaskCreateService);
    const repository = service['repository'];
    const domainEventSubscriber = service['domainEventPublisher']
      .domainEventSubscriber as MockDomainEventSubscriber;

    const { taskId } = await service.execute(TEST_DATA);

    const createdTask = await repository.findById(
      TaskGroupId.create(TEST_DATA.taskGroupId),
      TaskId.create(taskId)
    );

    expect(createdTask).not.toBeNull();

    const expectEventName = 'TaskCreatedEvent';
    domainEventSubscriber.assertCall(expectEventName);
  });

  it('例外が発生した場合、ドメインイベント(TaskGroupCreatedEvent)が一度も呼ばれない', async () => {
    const service = container.resolve(TaskCreateService);
    const domainEventSubscriber = service['domainEventPublisher']
      .domainEventSubscriber as MockDomainEventSubscriber;

    const invalidData = {
      ...TEST_DATA,
      title: '@',
    };

    await expect(service.execute(invalidData)).rejects.toThrow();

    domainEventSubscriber.assertNotCall();
  });
});
