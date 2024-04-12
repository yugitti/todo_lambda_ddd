import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../../domain/Task';
import { IUsecase } from '../interfaces/ITaskUsecase';
import { IRepository } from '../../domain/repository/IRepository';
import { getNow } from '../../shared/utility/utility';

export const TaskUsecase = (repository: IRepository): IUsecase => {
  const fetchTask = async (groupId: string, taskId: string) => {
    return await repository.fetchTask(groupId, taskId);
  };
  const fetchTaskByTaskId = async (groupId: string) => {
    return await repository.findTaskByTaskId(groupId);
  };
  const createTask = async (projectId: string, groupId: string) => {
    const task = createDefaultTask(projectId, groupId);
    await repository.createTask(task);
    return task;
  };
  const updateTask = async (task: Partial<ITask> & { groupId: string; id: string }) => {
    const body = {
      ...task,
      updateAt: getNow(),
    };
    return repository.updateTask(body);
  };
  const deleteTask = async (groupId: string, id: string) => {
    return await repository.deleteTask(groupId, id);
  };
  return {
    fetchTask,
    fetchTaskByTaskId,
    createTask,
    updateTask,
    deleteTask,
  };
};

const createDefaultTask = (projectId: string, groupId: string) => {
  const id = uuidv4();
  const task = {
    id,
    projectId,
    groupId,
    title: '',
    description: '',
    isDone: false,
    isDeleted: false,
    createAt: getNow(),
    updateAt: getNow(),
    startDate: '',
    endDate: '',
    category: '',
    progress: '',
  };
  return task;
};
