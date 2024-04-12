////////////////////////////////////////////////
// Common controller for task processing
////////////////////////////////////////////////
import { APIGatewayProxyHandler } from 'aws-lambda';
import { GetLambdaResponse } from '../../shared/utility/response';
import { CustomError } from '../../shared/utility/error';

// controllers
import { TaskCreateController } from '../controllers/CreateTaskController';
import { TaskUpdateController } from '../controllers/UpdateTaskController';
import { TaskDeleteController } from '../controllers/DeleteTaskController';

// Simple DI
import { CreateTaskUsecase } from '../../application/usecases/CreateTaskUsecase';
import { UpdateTaskUsecase } from '../../application/usecases/UpdateTaskUsecase';
import { DeleteTaskUsecase } from '../../application/usecases/DeleteTaskUsecase';

import { DynamoDbRepository } from '../../infrastructure/repositories/DynamoDbRepository';
const repository = DynamoDbRepository();
const taskCreateUsecase = CreateTaskUsecase(repository);
const taskUpdateUsecase = UpdateTaskUsecase(repository);
const taskDeleteUsecase = DeleteTaskUsecase(repository);

// lambda handler
export const handler: APIGatewayProxyHandler = async (event) => {
  const pathParams = event.pathParameters || {};
  const body = event.body ? JSON.parse(event.body) : {};
  const httpMethod = event.httpMethod;
  const path = event.path;

  try {
    let res;
    if (httpMethod === 'PUT' && path.match(/^\/task\/create\/.+/)) {
      // createTaskの処理
      res = await TaskCreateController(pathParams, taskCreateUsecase);
    } else if (httpMethod === 'POST' && path === '/task/update') {
      // updateTaskの処理
      res = await TaskUpdateController(body, taskUpdateUsecase);
    } else if (httpMethod === 'DELETE' && path.match(/^\/task\/delete\/.+/)) {
      // deleteTaskの処理
      res = await TaskDeleteController(pathParams, taskDeleteUsecase);
    } else {
      // 該当するパスが見つからない場合の処理
      throw new CustomError('E4001');
    }
    return GetLambdaResponse(200, res);
  } catch (e) {
    const error = e instanceof CustomError ? e : new CustomError('E5999', e as Error);
    return GetLambdaResponse(500, error.getErrorMessage());
  }
};
