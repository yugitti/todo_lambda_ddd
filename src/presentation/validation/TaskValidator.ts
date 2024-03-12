import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

import { CustomError } from '../../shared/utility/error';

const ajv = new Ajv();
addFormats(ajv);

export const validate = <T>(schema: JSONSchemaType<T>, inputData: Partial<T>): T => {
  const ajvValidate = ajv.compile(schema);

  const valid = ajvValidate(inputData);

  if (valid) {
    return inputData as T;
  } else {
    const message = ajvValidate.errors?.map((e) => e.message).join(', ') ?? 'unknown error';
    throw new CustomError('E4002', Error(message));
  }
};
