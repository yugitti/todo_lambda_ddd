import { Task } from '../../domain/Task';
import { TaskId } from '../../domain/valueEntity/TaskId';
import { Title } from '../../domain/valueEntity/Title';
import { Description } from '../../domain/valueEntity/Description';
import { DeleteStatus } from '../../domain/valueEntity/DeleteStatus';
import { StartDate } from '../../domain/valueEntity/StartDate';
import { EndDate } from '../../domain/valueEntity/EndDate';
import { Category } from '../../domain/valueEntity/Category';
import { Progress } from '../../domain/valueEntity/Progress';
import { mapTaskToResponse } from '../mapper/mapTaskToResponse';

import { CreateTaskParam } from '../dto/input/CreateTaskParams';
import { TaskRes } from '../dto/output/TaskRes';

import { IRepository } from '../../domain/repository/IRepository';

export interface ICreateTaskUsecase {
  run: (params: CreateTaskParam) => Promise<TaskRes>;
}

export const CreateTaskUsecase = (repository: IRepository): ICreateTaskUsecase => ({
  run: async (params: CreateTaskParam): Promise<TaskRes> => {
    const task = createTask(params);
    await repository.createTask(task);
    return mapTaskToResponse(task);
  },
});

const createTask = (params: CreateTaskParam): Task => {
  const { required, optional } = params;
  const id = TaskId.generate();
  return Task.create(
    { id, ...required },
    {
      title: createEntity(Title, optional.title),
      description: createEntity(Description, optional.description),
      isDone: optional.isDone,
      deleteStatus: createEntity(DeleteStatus, optional.deleteStatus),
      startDate: createEntity(StartDate, optional.startDate),
      endDate: createEntity(EndDate, optional.endDate),
      category: createEntity(Category, optional.category),
      progress: createEntity(Progress, optional.progress),
    },
  );
};

const createEntity = <T, U>(Entity: new (value: U) => T, value?: U): T | undefined => {
  return value !== undefined ? new Entity(value) : undefined;
};
