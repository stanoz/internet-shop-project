module.exports = DUMMY_USERS = [
    {
        name: 'John',
        surname: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        address: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zip: '12345'
        },
        isAdmin: false,
    },
    {
        name: 'Admin',
        surname: 'Admin',
        email: 'admin@example.com',
        password: 'Admin123',
        address: {
            street: '456 Oak St',
            city: 'Othertown',
            state: 'TX',
            zip: '67890'
        },
        isAdmin: true,
    },
]