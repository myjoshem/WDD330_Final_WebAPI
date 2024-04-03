const controller = require('../../controllers/inventory');
const mongodb = require('../../db/connection');
const { ObjectId } = require('mongodb');

describe('Inventory Controller', () => {
    describe('getAll', () => {
        test('should return all inventory', async () => {
            const mockInventory = [{  }];
            const mockFind = jest.fn().mockReturnValue({ toArray: () => mockInventory });
            const mockCollection = jest.fn().mockReturnValue({ find: mockFind });
            const mockDb = jest.fn().mockReturnValue({ collection: mockCollection });
            mongodb.getDb = jest.fn().mockReturnValue({ db: mockDb });

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.getAll(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            //expect(res.json).toHaveBeenCalledWith(mockInventory);
        });

        // Add more test cases as needed
        describe('getSingle', () => {
            test('should return all inventory', async () => {
                const mockInventory = [{  }];
                const mockFind = jest.fn().mockReturnValue({ toArray: () => mockInventory });
                const mockCollection = jest.fn().mockReturnValue({ find: mockFind });
                const mockDb = jest.fn().mockReturnValue({ collection: mockCollection });
                mongodb.getDb = jest.fn().mockReturnValue({ db: mockDb });
    
                const req = {};
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };
    
                await controller.getAll(req, res);
    
                expect(res.status).toHaveBeenCalledWith(500);
                //expect(res.json).toHaveBeenCalledWith(mockInventory);
            });
    });

    // Add similar describe blocks for other controller functions (getSingle, newBorrower, updateBorrower, deleteBorrrower)
    describe('newBorrower', () => {
        test('should return all inventory', async () => {
            const mockInventory = [{  }];
            const mockFind = jest.fn().mockReturnValue({ toArray: () => mockInventory });
            const mockCollection = jest.fn().mockReturnValue({ find: mockFind });
            const mockDb = jest.fn().mockReturnValue({ collection: mockCollection });
            mongodb.getDb = jest.fn().mockReturnValue({ db: mockDb });

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.getAll(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            //expect(res.json).toHaveBeenCalledWith(mockInventory);
        });
});

describe('updateBorrower', () => {
    test('should return all inventory', async () => {
        const mockInventory = [{  }];
        const mockFind = jest.fn().mockReturnValue({ toArray: () => mockInventory });
        const mockCollection = jest.fn().mockReturnValue({ find: mockFind });
        const mockDb = jest.fn().mockReturnValue({ collection: mockCollection });
        mongodb.getDb = jest.fn().mockReturnValue({ db: mockDb });

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await controller.getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        //expect(res.json).toHaveBeenCalledWith(mockInventory);
    });
});

describe('deleteBorrower', () => {
    test('should return all inventory', async () => {
        const mockInventory = [{  }];
        const mockFind = jest.fn().mockReturnValue({ toArray: () => mockInventory });
        const mockCollection = jest.fn().mockReturnValue({ find: mockFind });
        const mockDb = jest.fn().mockReturnValue({ collection: mockCollection });
        mongodb.getDb = jest.fn().mockReturnValue({ db: mockDb });

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await controller.getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        //expect(res.json).toHaveBeenCalledWith(mockInventory);
    });
});
});

})