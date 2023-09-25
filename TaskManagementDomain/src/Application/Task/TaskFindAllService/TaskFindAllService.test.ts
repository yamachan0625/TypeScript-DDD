import { container } from 'tsyringe';

import {
  TEST_DATA,
  taskTestDataCreator,
} from 'Infrastructure/shared/Task/taskTestDataCreator';

import { TaskFindAllService } from './TaskFindAllService';

describe('TaskFindAllService', () => {
  it('指定されたIDのエントリー者が存在する場合、DTOに詰め替えられ、取得できる', async () => {
    const service = container.resolve(TaskFindAllService);
    const repository = service['repository'];

    // 初期データ作成
    await taskTestDataCreator(repository)({});
    await taskTestDataCreator(repository)({
      taskId: 'testTaskId2',
    });

    const data = await service.execute({
      taskGroupId: TEST_DATA.taskGroupId,
    });

    expect(data).toHaveLength(2);
  });

  it('エンティティが存在しない場合、空配列が取得できる', async () => {
    const service = container.resolve(TaskFindAllService);

    const data = await service.execute({
      taskGroupId: TEST_DATA.taskGroupId,
    });

    expect(data).toHaveLength(0);
  });
});
