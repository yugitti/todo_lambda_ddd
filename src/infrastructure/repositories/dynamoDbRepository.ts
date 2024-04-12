import { AWS } from '../aws/awsSDK';
import { DDBclient } from '../aws/ddbClient';
import { Task } from '../../domain/Task';
import { IRepository } from '../../domain/repository/IRepository';

const DDB_TABLE = process.env['DDB_TABLE'] ?? '';
const DDB_ENDPOINT = process.env['DDB_ENDPOINT'];
const docClient = new AWS.DynamoDB.DocumentClient({
  ...(DDB_ENDPOINT && { endpoint: DDB_ENDPOINT }),
});
const ddbClient = DDBclient(DDB_TABLE, docClient);

/*
  DynamoDB Table Information
  Table Name: Task
  Primary Key: GROUP#{groupId} (String)
  Sort Key: TASK#{id} (String)
*/

export const DynamoDbRepository = (): IRepository => {
  const findTaskByTaskId = async (groupId: string, id: string): Promise<Task | undefined> => {
    const key = {
      pkGroupId: `GROUP#${groupId}`, // pk
      skTaskId: `TASK#${id}`, // sk
    };

    const res = await ddbClient.get(key);
    return res as Task;
  };
  const findTasksByGroupId = async (groupId: string) => {
    const res = await ddbClient.query(groupId);
    return res as Task[];
  };
  const createTask = async (task: Task) => {
    const item = {
      pkGroupId: `GROUP#${task.groupId}`, //pk
      skTaskId: `TASK#${task.id}`, // sk
      ...task,
    };
    await ddbClient.put(item);
  };
  const updateTask = async (task: Task) => {
    const key = {
      pkGroupId: `GROUP#${task.groupId}`, // pk
      skTaskId: `TASK#${task.id}`, // sk
    };
    await ddbClient.update(key, task);
  };

  const deleteTask = async (groupId: string, id: string) => {
    const key = {
      pkGroupId: `GROUP#${groupId}`, // pk
      skTaskId: `TASK#${id}`, // sk
    };
    await ddbClient.del(key);
  };
  return {
    findTasksByGroupId,
    findTaskByTaskId,
    createTask,
    updateTask,
    deleteTask,
  };
};
