export default {
    //API gateway only support until draft # 4 :(
    definitions: {
        orderItem: {
        type: 'object',
        properties: {
            index: { type: 'number' },
            productCode: {
                type: ['number', 'string'],
            },
            productType: { type: 'string' },
            productColor: { type: 'string' },
            quantity: { type: 'number' },
            price: { type: 'number' },
            discount: { type: 'number' },
            amount: { type: 'number' },
        },
        required: ['productCode', 'productType', 'productColor', 'quantity', 'price', 'discount', 'amount'],
        }
    },
    type: "object",
    title: "The Invoice Schema",
    required: ['id', 'orders', 'soldTo', 'billTo', 'paymentStatus', 'paymentType', 'total', 'amountPaid', 'salesPerson'],
    properties: {
        orders: {
            type: "array",
            minItems: 1,
            //maxItems: 8,
            uniqueItems: true,
            title: "The orders array holding orderItems",
            items: { "$ref": "#/definitions/orderItem" }
        },
        id: { 
            type: 'string', 
            pattern: "^[a-zA-Z0-9 ]+$", 
        },
        soldTo: { 
            type: 'string',
            pattern: "^[a-zA-Z0-9 ]+$",
            minLength: 3,
        },
        billTo: { 
            type: 'string',
            pattern: "^[a-zA-Z0-9 ]+$",
            minLength: 3,
        },
        paymentStatus: { 
            type: 'string',
            pattern: "^[a-zA-Z0-9 ]+$",
            minLength: 3,
        },
        paymentType: { 
            type: 'string',
            pattern: "^[a-zA-Z0-9 ]+$",
            minLength: 3,
        },
        total: { type: 'number' },
        amountPaid: { type: 'number' },
    }
} as const;
