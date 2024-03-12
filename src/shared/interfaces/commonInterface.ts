export interface IResponse {
  getLambdaResponse: () => ILambdaReponse;
  getResponseBody: () => IResponseBody;
  getResponseStatus: () => number;
}

export interface IResponseBody {
  [key: string]: any;
}

export interface ILambdaReponse {
  statusCode: number;
  body: string;
  headers: {
    'Content-Type': string;
    'Access-Control-Allow-Origin': string;
    'Access-Control-Allow-Methods': string;
    'Access-Control-Allow-Headers': string;
  };
}
