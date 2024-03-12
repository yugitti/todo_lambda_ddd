import { IResponse, IResponseBody, ILambdaReponse } from '../interfaces/commonInterface';

export const GetLambdaResponse = (statusCode: number, body: IResponseBody): ILambdaReponse => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  };
};
