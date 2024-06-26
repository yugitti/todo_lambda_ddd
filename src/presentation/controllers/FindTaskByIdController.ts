////////////////////////////////////////////////
// Common controller for task processing
////////////////////////////////////////////////
import { validate } from '../validation/TaskValidator';
import { IFindTaskByTaskIdUsecase } from '../../application/usecases/FindTaskbyTaskId';
import { IControllerResponse } from '../../shared/interfaces/IControllerResponse';

import { TaskValidateSchma } from '../validation/schema/TaskGetSchema';

interface ITaskGetInput {
  id: string;
  groupId: string;
}

/// lambda handler case
export const FindTaskByTaskIdController = async (
  body: { [key: string]: any },
  taskUsecase: IFindTaskByTaskIdUsecase,
): Promise<IControllerResponse> => {
  // validate
  const inputData = validate<ITaskGetInput>(TaskValidateSchma, body);

  // dto

  // usecase
  const res = await taskUsecase.run(inputData.groupId, inputData.id);

  // return
  return { statusCode: 200, body: res ?? {} };
};
