import { Task } from '../Task';

export interface IRepository {
  findTaskByTaskId: (groupId: string, id: string) => Promise<Task | undefined>;
  findTasksByGroupId: (groupId: string) => Promise<Task[]>;
  createTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (groupId: string, id: string) => Promise<void>;
}
