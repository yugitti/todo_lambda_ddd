////////////////////////////////////////////////
// Common controller for task processing
////////////////////////////////////////////////
import { APIGatewayProxyHandler } from 'aws-lambda';
import { FindTaskByTaskIdController } from '../controllers/FindTaskByIdController';
import { GetLambdaResponse } from '../../shared/utility/response';
import { CustomError } from '../../shared/utility/error';

// Simple DI
import { FindTaskByTaskIdUsecase } from '../../application/usecases/FindTaskbyTaskId';
import { DynamoDbRepository } from '../../infrastructure/repositories/DynamoDbRepository';
const taskUsecase = FindTaskByTaskIdUsecase(DynamoDbRepository());

// lambda handler
export const handler: APIGatewayProxyHandler = async (event) => {
  // DI

  // パスパラメータの取得
  const body = event.pathParameters as { [key: string]: any };

  try {
    const res = await FindTaskByTaskIdController(body, taskUsecase);
    return GetLambdaResponse(res.statusCode, res.body);
  } catch (e) {
    const error = e instanceof CustomError ? e : new CustomError('E5999', e as Error);
    return GetLambdaResponse(500, error.getErrorMessage());
  }
};
