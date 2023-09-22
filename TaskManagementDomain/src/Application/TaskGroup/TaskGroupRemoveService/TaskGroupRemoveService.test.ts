import { container } from 'tsyringe';

import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { MockDomainEventSubscriber } from 'Infrastructure/DomainEvent/DomainEventSubscriber';
import {
  taskGroupTestDataCreator,
  TEST_DATA,
} from 'Infrastructure/shared/TaskGroup/taskGroupTestDataCreator';

import { TaskGroupRemoveService } from './TaskGroupRemoveService';

describe('TaskGroupRemoveService', () => {
  it('TaskGroupが正常に削除され、ドメインイベント(TaskGroupRemovedEvent)が一度呼ばれる', async () => {
    const service = container.resolve(TaskGroupRemoveService);
    const repository = service['repository'];
    const domainEventSubscriber = service['domainEventPublisher']
      .domainEventSubscriber as MockDomainEventSubscriber;

    await taskGroupTestDataCreator(repository)({});
    const createdTaskGroup = await repository.findById(
      TaskGroupId.create(TEST_DATA.taskGroupId)
    );
    expect(createdTaskGroup).not.toBeNull();

    await service.execute({
      taskGroupId: TEST_DATA.taskGroupId,
    });
    const removedTaskGroup = await repository.findById(
      TaskGroupId.create(TEST_DATA.taskGroupId)
    );
    expect(removedTaskGroup).toBeNull();

    const expectEventName = 'TaskGroupRemovedEvent';
    domainEventSubscriber.assertCall(expectEventName);
  });
});
