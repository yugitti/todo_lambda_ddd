////////////////////////////////////////////////
// Common controller for task processing
////////////////////////////////////////////////
import { APIGatewayProxyHandler } from 'aws-lambda';
import { setupDependencies } from '../../infrastructure/config/setUpDependency';
import { TaskCreateController } from '../controllers/TaskCreateController';
import { GetLambdaResponse } from '../../shared/utility/response';
import { CustomError } from '../../shared/utility/error';
// lambda handler
export const handler: APIGatewayProxyHandler = async (event) => {
  // DI
  const { taskUsecase } = setupDependencies();

  // パスパラメータの取得
  const groupId = event.pathParameters?.groupId;
  const projectId = event.pathParameters?.projectId;
  const body = { groupId, projectId };
  console.log('event', event);
  console.log('body', body);

  try {
    const res = await TaskCreateController(body, taskUsecase);
    return GetLambdaResponse(res.statusCode, res.body);
  } catch (e) {
    const error = e instanceof CustomError ? e : new CustomError('E5999', e as Error);
    return GetLambdaResponse(500, error.getErrorMessage());
  }
};
