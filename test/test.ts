import { TaskCreateController } from '../src/presentation/controllers/TaskCreateController';
import { TaskGetController } from '../src/presentation/controllers/TaskGetController';
import { TaskUpdateController } from '../src/presentation/controllers/TaskUpdateController';
import { TaskDeleteController } from '../src/presentation/controllers/TaskDeleteController';
import { setupDependencies } from '../src/infrastructure/config/setUpDependency';

const main = async () => {
  const { taskUsecase } = setupDependencies();
  let res = {} as any;
  let param = {} as any;
  //create task
  param = {
    groupId: 'G000001',
    projectId: 'P000001',
  };

  res = await TaskCreateController(param, taskUsecase);
  console.log('created task');
  console.log(res);

  // get task
  param = {
    id: res.body.id,
    groupId: res.body.groupId,
  };
  res = await TaskGetController(param, taskUsecase);
  console.log('get task');
  console.log(res);

  // update task
  param = {
    id: res.body.id,
    groupId: res.body.groupId,
    isDone: res.body.isDone ? false : true,
  };
  res = await TaskUpdateController(param, taskUsecase);
  console.log('get task');
  console.log(res);

  // delete task
  param = {
    id: res.body.id,
    groupId: res.body.groupId,
  };
  res = await TaskDeleteController(param, taskUsecase);
  console.log(res);
};

main();
