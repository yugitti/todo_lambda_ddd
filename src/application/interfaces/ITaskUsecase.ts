import { ITask } from '../../domain/Task';

export interface IUsecase {
  fetchTask: (groupId: string, taskId: string) => Promise<ITask>;
  fetchTaskByTaskId: (groupId: string) => Promise<ITask[]>;
  createTask: (projectId: string, taskId: string) => Promise<ITask>;
  updateTask: (
    task: Partial<ITask> & {
      groupId: string;
      id: string;
    },
  ) => Promise<ITask>;
  deleteTask: (groupId: string, taskId: string) => Promise<string>;
}
