import Ajv, { JSONSchemaType } from 'ajv';
import { ITaskDeleteInput } from '../../interfaces/ITaskDelete';

export const TaskValidateSchma: JSONSchemaType<ITaskDeleteInput> = {
  type: 'object',
  additionalProperties: false,
  required: ['id', 'groupId'],
  properties: {
    id: { type: 'string' },
    groupId: { type: 'string' },
  },
};
