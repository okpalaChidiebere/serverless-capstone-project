export default {
    type: "object",
    properties: {
        email: { type: 'string', format: 'email' },
        full_name: { type: 'string', minLength: 3, },
        store: { type: 'string' },
        plainTextPassword: { type: 'string',  minLength: 6, },
    },
    required: ['email', 'full_name', 'store', 'plainTextPassword']
} as const;


