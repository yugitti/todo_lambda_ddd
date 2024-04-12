import { AWS } from '../aws/awsSDK';
import { DDBclient } from '../aws/ddbClient';
import { DynamoDbRepository } from '../repositories/DynamoDbRepository';
import { TaskUsecase } from '../../application/usecases/TaskUsecase';
import { IUsecase } from '../../application/interfaces/ITaskUsecase';
// DynamoDB

export const setupDependencies = (): { taskUsecase: IUsecase } => {
  const DDB_TABLE = process.env['DDB_TABLE'] ?? '';
  const DDB_ENDPOINT = process.env['DDB_ENDPOINT'];

  console.log('DDB_TABLE', DDB_TABLE);
  console.log('DDB_ENDPOINT', DDB_ENDPOINT);

  const docClient = new AWS.DynamoDB.DocumentClient({
    ...(DDB_ENDPOINT && { endpoint: DDB_ENDPOINT }),
  });
  const ddbClient = DDBclient(DDB_TABLE, docClient);

  // LocalDb Client
  // const localDbClient = new LocalDbClient();

  // Repository
  const dynamoDbRepository = DynamoDbRepository(ddbClient);
  // const localDbRepository = new LocalDbRepository(localDbClient);

  // Usecase
  const taskUsecase = TaskUsecase(dynamoDbRepository);

  return { taskUsecase };
};
