import Ajv, { JSONSchemaType } from 'ajv';
import { ITaskGetInput } from '../../interfaces/ITaskGet';

export const TaskValidateSchma: JSONSchemaType<ITaskGetInput> = {
  type: 'object',
  additionalProperties: false,
  required: ['id', 'groupId'],
  properties: {
    id: { type: 'string' },
    groupId: { type: 'string' },
  },
};
