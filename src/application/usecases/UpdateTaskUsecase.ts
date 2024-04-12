import { Task } from '../../domain/Task';
import { Title } from '../../domain/valueEntity/Title';
import { Description } from '../../domain/valueEntity/Description';
import { DeleteStatus } from '../../domain/valueEntity/DeleteStatus';
import { StartDate } from '../../domain/valueEntity/StartDate';
import { EndDate } from '../../domain/valueEntity/EndDate';
import { Category } from '../../domain/valueEntity/Category';
import { Progress } from '../../domain/valueEntity/Progress';
import { mapTaskToResponse } from '../mapper/mapTaskToResponse';

import { UpdateTaskParams } from '../dto/input/UpdateTaskParams';
import { TaskRes } from '../dto/output/TaskRes';

import { IRepository } from '../../domain/repository/IRepository';

export interface IUpdateTaskUsecase {
  run: (params: UpdateTaskParams) => Promise<TaskRes>;
}

export const UpdateTaskUsecase = (repository: IRepository): IUpdateTaskUsecase => ({
  run: async (params: UpdateTaskParams): Promise<TaskRes> => {
    const { required } = params;
    const currentTask = await repository.findTaskByTaskId(required.groupId, required.taskId);

    if (!currentTask) {
      throw new Error('Task not found');
    }

    const updateTask = createUpdateTask(params, currentTask);

    await repository.updateTask(updateTask);

    return mapTaskToResponse(updateTask);
  },
});

const createUpdateTask = (params: UpdateTaskParams, currentTask: Task): Task => {
  const { optional } = params;
  currentTask.changeOptionalFields({
    title: createEntity(Title.create, optional.title),
    description: createEntity(Description.create, optional.description),
    isDone: optional.isDone,
    deleteStatus: createEntity(DeleteStatus.createFromBoolean, optional.isDeleted),
    startDate: createEntity(StartDate.createFromString, optional.startDate),
    endDate: createEntity(EndDate.createFromString, optional.endDate),
    category: createEntity(Category.createFromString, optional.category),
    progress: createEntity(Progress.createFromString, optional.progress),
  });

  return currentTask;
};

const createEntity = <T, U>(Creator: (value: U) => T, value?: U): T | undefined => {
  return value !== undefined ? Creator(value) : undefined;
};
