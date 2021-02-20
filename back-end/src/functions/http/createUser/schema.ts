//import type { FromSchema } from "json-schema-to-ts";

export default {
    type: "object",
    properties: {
        email: { type: 'string' },
        full_name: { type: 'string' },
        store: { type: 'string' },
        plainTextPassword: { type: 'string' },
    },
    required: ['email', 'full_name', 'store', 'plainTextPassword']
} as const;


