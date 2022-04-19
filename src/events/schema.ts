import { FromSchema } from 'json-schema-to-ts'

export const EventRequestSchema = {
  type: 'object',
  required: ['events'],
  properties: {
    events: {
      type: 'array',
      items: {
        type: 'object'
      }
    }
  }
} as const

export type EventRequest = FromSchema<typeof EventRequestSchema>
