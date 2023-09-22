import { container } from 'tsyringe';

import { TaskId } from 'Domain/models/Task/TaskId/TaskId';
import { MockDomainEventSubscriber } from 'Infrastructure/DomainEvent/DomainEventSubscriber';
import {
  taskTestDataCreator,
  TEST_DATA,
} from 'Infrastructure/shared/Task/taskTestDataCreator';

import { TaskRemoveService } from './TaskRemoveService';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';

describe('TaskRemoveService', () => {
  it('Taskが正常に削除され、ドメインイベント(TaskRemovedEvent)が一度呼ばれる', async () => {
    const service = container.resolve(TaskRemoveService);
    const repository = service['repository'];
    const domainEventSubscriber = service['domainEventPublisher']
      .domainEventSubscriber as MockDomainEventSubscriber;

    await taskTestDataCreator(repository)({});
    const createdTask = await repository.findById(
      TaskGroupId.create(TEST_DATA.taskGroupId),
      TaskId.create(TEST_DATA.taskId)
    );
    expect(createdTask).not.toBeNull();

    await service.execute({
      taskGroupId: TEST_DATA.taskGroupId,
      taskId: TEST_DATA.taskId,
    });
    const removedTask = await repository.findById(
      TaskGroupId.create(TEST_DATA.taskGroupId),
      TaskId.create(TEST_DATA.taskId)
    );
    expect(removedTask).toBeNull();

    const expectEventName = 'TaskRemovedEvent';
    domainEventSubscriber.assertCall(expectEventName);
  });
});
