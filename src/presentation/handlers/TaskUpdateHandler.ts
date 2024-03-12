////////////////////////////////////////////////
// Common controller for task processing
////////////////////////////////////////////////
import { APIGatewayProxyHandler } from 'aws-lambda';
import { setupDependencies } from '../../infrastructure/config/setUpDependency';
import { TaskUpdateController } from '../controllers/TaskUpdateController';
import { GetLambdaResponse } from '../../shared/utility/response';
import { CustomError } from '../../shared/utility/error';
// lambda handler
export const handler: APIGatewayProxyHandler = async (event) => {
  // DI
  const { taskUsecase } = setupDependencies();

  // パスパラメータの取得
  const body = event.body ? JSON.parse(event.body) : {};

  try {
    const res = await TaskUpdateController(body, taskUsecase);
    return GetLambdaResponse(res.statusCode, res.body);
  } catch (e) {
    const error = e instanceof CustomError ? e : new CustomError('E5999', e as Error);
    return GetLambdaResponse(500, error.getErrorMessage());
  }
};
