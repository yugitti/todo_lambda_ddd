import { IDDBclient } from '../database/ddbClient';
import { ITask } from '../../domain/entities/Task';
import { IRepository } from '../../application/interfaces/IRepository';

/*
  DynamoDB Table Information
  Table Name: Task
  Primary Key: GROUP#{groupId} (String)
  Sort Key: TASK#{id} (String)
*/
export const DynamoDbRepository = (ddbClient: IDDBclient): IRepository => {
  const fetchTask = async (groupId: string, id: string) => {
    const key = {
      pkGroupId: `GROUP#${groupId}`, // pk
      skTaskId: `TASK#${id}`, // sk
    };

    const res = await ddbClient.get(key);
    return res as ITask;
  };
  const fetchTaskByTaskId = async (groupId: string) => {
    const res = await ddbClient.query(groupId);
    return res as ITask[];
  };
  const createTask = async (task: ITask) => {
    const item = {
      pkGroupId: `GROUP#${task.groupId}`, //pk
      skTaskId: `TASK#${task.id}`, // sk
      ...task,
    };
    const res = await ddbClient.put(item);
    return res as ITask;
  };
  const updateTask = async (task: Partial<ITask> & { groupId: string; id: string }) => {
    const key = {
      pkGroupId: `GROUP#${task.groupId}`, // pk
      skTaskId: `TASK#${task.id}`, // sk
    };
    const res = await ddbClient.update(key, task);
    return res as ITask;
  };
  const deleteTask = async (groupId: string, id: string) => {
    const key = {
      pkGroupId: `GROUP#${groupId}`, // pk
      skTaskId: `TASK#${id}`, // sk
    };
    return await ddbClient.del(key);
  };
  return {
    fetchTask,
    fetchTaskByTaskId,
    createTask,
    updateTask,
    deleteTask,
  };
};
