import { mockTask, Task } from './Task';
import { mockTaskId } from '../TaskId/TaskId';
import {
  TaskGroupId,
  mockTaskGroupId,
} from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { Title, mockTitle } from '../Title/Title';
import { Description, mockDescription } from '../Description/Description';
import { Status, mockStatus } from '../Status/Status';
import { DueDate, mockDueDate } from '../DueDate/DueDate';
import { mockCreatedAt } from 'Domain/models/shared/CreatedAt/CreatedAt';
import { mockUpdatedAt } from 'Domain/models/shared/UpdatedAt/UpdatedAt';

describe('Task', () => {
  const mockTaskAttributes = {
    taskId: mockTask.taskId,
    taskGroupId: mockTask.taskGroupId,
    title: mockTask.title,
    description: mockTask.description,
    status: mockTask.status,
    dueDate: mockTask.dueDate,
    createdAt: mockTask.createdAt,
    updatedAt: mockTask.updatedAt,
  };

  describe('create', () => {
    it('正常系:モックのインスタンスが正常に生成される', () => {
      expect(mockTask).toBeInstanceOf(Task);
    });

    it('正常系:正常にインスタンスが生成される', () => {
      const task = Task.create({
        taskGroupId: mockTaskGroupId,
        title: mockTitle,
        description: mockDescription,
        status: mockStatus,
        dueDate: mockDueDate,
      });

      expect(task).toBeInstanceOf(Task);
    });

    it('正常系:ドメインイベントが1つ増加する', () => {
      const task = Task.create({
        taskGroupId: mockTaskGroupId,
        title: mockTitle,
        description: mockDescription,
        status: mockStatus,
        dueDate: mockDueDate,
      });

      expect(task.getDomainEvents()).toHaveLength(1);
    });
  });

  describe('reconstruct', () => {
    it('正常系:正常にインスタンスが再構成される', () => {
      const task = Task.reconstruct({
        taskId: mockTaskId,
        taskGroupId: mockTaskGroupId,
        title: mockTitle,
        description: mockDescription,
        status: mockStatus,
        dueDate: mockDueDate,
        createdAt: mockCreatedAt,
        updatedAt: mockUpdatedAt,
      });
      expect(task).toBeInstanceOf(Task);
    });
  });

  describe('update', () => {
    it('正常系:Titleを正常に更新できる', () => {
      const title = Title.create('title');

      mockTask.update({ ...mockTaskAttributes, title });

      expect(mockTask.title?.value).toBe(title.value);
    });

    it('正常系:Descriptionを正常に更新できる', () => {
      const description = Description.create('description');

      mockTask.update({ ...mockTaskAttributes, description });

      expect(mockTask.description?.value).toBe(description.value);
    });

    it('正常系:Statusを正常に更新できる', () => {
      const status = Status.DONE();

      mockTask.update({ ...mockTaskAttributes, status });

      expect(mockTask.status.value).toBe(status.value);
    });

    it('正常系:DueDateを正常に更新できる', () => {
      const dueDate = DueDate.create(new Date());

      mockTask.update({ ...mockTaskAttributes, dueDate });

      expect(mockTask.dueDate?.value).toBe(dueDate.value);
    });
  });
});
