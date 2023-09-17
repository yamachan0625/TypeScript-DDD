import { mockTaskGroup, TaskGroup } from './TaskGroup';
import { mockTaskGroupId } from './TaskGroupId/TaskGroupId';
import {
  TaskGroupName,
  mockTaskGroupName,
} from './TaskGroupName/TaskGroupName';
import { mockCreatedAt } from 'Domain/models/shared/CreatedAt/CreatedAt';
import { mockUpdatedAt } from 'Domain/models/shared/UpdatedAt/UpdatedAt';

describe('TaskGroup', () => {
  const mockTaskGroupAttributes = {
    taskGroupId: mockTaskGroup.taskGroupId,
    taskGroupName: mockTaskGroup.taskGroupName,
    createdAt: mockTaskGroup.createdAt,
    updatedAt: mockTaskGroup.updatedAt,
  };

  describe('create', () => {
    it('正常系:モックのインスタンスが正常に生成される', () => {
      expect(mockTaskGroup).toBeInstanceOf(TaskGroup);
    });

    it('正常系:正常にインスタンスが生成される', () => {
      const taskGroup = TaskGroup.create({
        taskGroupName: mockTaskGroupName,
      });

      expect(taskGroup).toBeInstanceOf(TaskGroup);
    });

    it('正常系:ドメインイベントが1つ増加する', () => {
      const taskGroup = TaskGroup.create({
        taskGroupName: mockTaskGroupName,
      });

      expect(taskGroup.getDomainEvents()).toHaveLength(1);
    });
  });

  describe('reconstruct', () => {
    it('正常系:正常にインスタンスが再構成される', () => {
      const taskGroup = TaskGroup.reconstruct({
        taskGroupId: mockTaskGroupId,
        taskGroupName: mockTaskGroupName,
        createdAt: mockCreatedAt,
        updatedAt: mockUpdatedAt,
      });
      expect(taskGroup).toBeInstanceOf(TaskGroup);
    });
  });

  describe('update', () => {
    it('正常系:TaskGroupNameを正常に更新できる', () => {
      const taskGroupName = TaskGroupName.create('taskGroupName');

      mockTaskGroup.update({ ...mockTaskGroupAttributes, taskGroupName });

      expect(mockTaskGroup.taskGroupName.value).toBe(taskGroupName.value);
    });

    it('正常系:ドメインイベントが1つ増加する', () => {
      const taskGroupName = TaskGroupName.create('taskGroupName');

      // テストのために一度clearする
      mockTaskGroup.clearDomainEvents();
      mockTaskGroup.update({ ...mockTaskGroupAttributes, taskGroupName });

      expect(mockTaskGroup.getDomainEvents()).toHaveLength(1);
    });
  });

  describe('remove', () => {
    it('正常系:ドメインイベントが1つ増加する', () => {
      const taskGroup = TaskGroup.create({
        taskGroupName: mockTaskGroupName,
      });

      // テストのために一度clearする
      taskGroup.clearDomainEvents();
      taskGroup.remove();
      expect(taskGroup.getDomainEvents()).toHaveLength(1);
    });
  });
});
