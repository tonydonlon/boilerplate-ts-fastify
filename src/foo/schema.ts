import { FromSchema } from 'json-schema-to-ts'

export const FooRequestSchema = {
  type: 'object',
  required: ['name', 'values'],
  properties: {
    name: {
      type: 'string',
    },
    values: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer'
          }
        },
        required: ['id'],
        additionalProperties: false,
      }
    }
  }
} as const

export const FooResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    }
  }
} as const

export type FooRequest = FromSchema<typeof FooRequestSchema>
