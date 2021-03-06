export default {
    type: "object",
    properties: {
        refresh_token: { type: 'string' },
    },
    required: ['refresh_token']
} as const;