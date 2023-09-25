import { container } from 'tsyringe';

import { MockDomainEventSubscriber } from 'Infrastructure/DomainEvent/DomainEventSubscriber';

import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';

import { TaskGroupCreateService } from './TaskGroupCreateService';
import { TEST_DATA } from 'Infrastructure/shared/TaskGroup/taskGroupTestDataCreator';

describe('TaskGroupCreateService', () => {
  it('TaskGroupが正常に作成され、ドメインイベント(TaskGroupCreatedEvent)が一度呼ばれる', async () => {
    const service = container.resolve(TaskGroupCreateService);
    const repository = service['repository'];
    const domainEventSubscriber = service['domainEventPublisher']
      .domainEventSubscriber as MockDomainEventSubscriber;

    const { taskGroupId } = await service.execute(TEST_DATA);

    const createdTaskGroup = await repository.findById(
      TaskGroupId.create(taskGroupId)
    );

    expect(createdTaskGroup).not.toBeNull();

    const expectEventName = 'TaskGroupCreatedEvent';
    domainEventSubscriber.assertCall(expectEventName);
  });

  it('例外が発生した場合、ドメインイベント(TaskGroupCreatedEvent)が一度も呼ばれない', async () => {
    const service = container.resolve(TaskGroupCreateService);
    const domainEventSubscriber = service['domainEventPublisher']
      .domainEventSubscriber as MockDomainEventSubscriber;

    const invalidData = {
      taskGroupName: '@',
    };

    await expect(service.execute(invalidData)).rejects.toThrow();

    domainEventSubscriber.assertNotCall();
  });
});
