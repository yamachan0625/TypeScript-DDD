import { container } from 'tsyringe';

import {
  TEST_DATA,
  taskTestDataCreator,
} from 'Infrastructure/shared/Task/taskTestDataCreator';

import { taskDTO } from '../TaskDTO';
import { TaskFindByIdService } from './TaskFindByIdService';

describe('TaskFindByIdService', () => {
  it('指定されたIDのエントリー者が存在する場合、DTOに詰め替えられ、取得できる', async () => {
    const service = container.resolve(TaskFindByIdService);
    const repository = service['repository'];

    // 初期データ作成
    const initialData = await taskTestDataCreator(repository)({});
    const data = await service.execute({
      taskGroupId: TEST_DATA.taskGroupId,
      taskId: TEST_DATA.taskId,
    });

    expect(data).not.toBeNull();
    expect(data).toEqual(taskDTO(initialData));
  });

  // it('指定されたIDのエントリー者が存在しない場合、nullが取得できる', async () => {
  //   const service = container.resolve(TaskFindByIdService);

  //   const data = await service.execute({
  //     taskGroupId: 'aaaaaaaa',
  //     taskId: 'aaaaaaaa',
  //   });

  //   expect(data).toBeNull();
  // });
});
