import { ITask } from '../../domain/entities/Task';

export interface IRepository {
  fetchTask: (groupId: string, id: string) => Promise<ITask>;
  fetchTaskByTaskId: (groupId: string) => Promise<ITask[]>;
  createTask: (task: ITask) => Promise<ITask>;
  updateTask: (task: Partial<ITask> & { groupId: string; id: string }) => Promise<ITask>;
  deleteTask: (groupId: string, id: string) => Promise<string>;
}
