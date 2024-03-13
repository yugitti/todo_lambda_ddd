import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { TaskGetController } from '../controllers/TaskGetController';
import { TaskCreateController } from '../controllers/TaskCreateController';
import { TaskUpdateController } from '../controllers/TaskUpdateController';
import { TaskDeleteController } from '../controllers/TaskDeleteController';
import { setupDependencies } from '../../infrastructure/config/setUpDependency';
import { CustomError } from '../../shared/utility/error';

// DI
const { taskUsecase } = setupDependencies();

// Express setup
const app = express();
const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Routes
router.get('/task/get/:groupId/:id', async (req: Request, res: Response, next: NextFunction) => {
  console.log('EXPRESS GET');
  const { groupId, id } = req.params;
  const body = { groupId, id };
  try {
    const r = await TaskGetController(body, taskUsecase);
    return res.status(r.statusCode).json(r.body);
  } catch (e) {
    console.log('EXPRESS ERROR');
    next(e);
  }
});

router.put('/task/create/:projectId/:groupId', async (req: Request, res: Response) => {
  const { projectId, groupId } = req.params;
  const body = { projectId, groupId };
  const r = await TaskCreateController(body, taskUsecase);
  return res.status(r.statusCode).json(r.body);
});

router.post('/task/update/:groupId/:id', async (req: Request, res: Response) => {
  const body = req.body;
  const r = await TaskUpdateController(body, taskUsecase);
  return res.status(r.statusCode).json(r.body);
});

router.delete('/task/delete/:groupId/:id', async (req: Request, res: Response) => {
  const { groupId, id } = req.params;
  const body = { groupId, id };
  const r = await TaskDeleteController(body, taskUsecase);
  return res.status(r.statusCode).json(r.body);
});

// router
app.use('/', router);

// error handling
app.use((e: Error, req: Request, res: Response, next: NextFunction): void => {
  const error = e instanceof CustomError ? e : new CustomError('E5999', e as Error);
  error.outputErrorMessage();
  res.status(500).send(error.getErrorMessage());
});

// The serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
app.listen(3000);

export { app };
