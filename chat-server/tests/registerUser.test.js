import {
    describe,
    it,
    expect,
    vi,
    beforeEach
} from "vitest";

let createdUser;
let saveUser;

class mockUserModel{        
        constructor({name, email, password}) {
            this._id = "123"
            this.name = name
            this.email = email
            this.password = password
            this.save =  saveUser
            createdUser = this;
        }
        static findOne = vi.fn();
    }

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

vi.spyOn(mongoose, "model").mockReturnValue(mockUserModel);

const { registerUser } = await import("../Controllers/userControllers");


describe("Test User Controller", () => {

    beforeEach(() => {
        vi.restoreAllMocks();

        createdUser = undefined;

        saveUser = vi.fn(()=>null)

        process.env.JWT_SECRET_KEY = "test-secret";

        vi.spyOn(bcrypt, "genSalt").mockResolvedValue("mock-salt");

        vi.spyOn(bcrypt, "hash").mockResolvedValue("hashed-password");

        vi.spyOn(jwt, "sign").mockReturnValue("mock-token");
    });


    it("should register success", async () => {
        const req = {
            body: {
                name: "Ink",
                email: "ink@example.com",
                password: "Password123!"
            }
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        
        mockUserModel.findOne.mockResolvedValue(null);

        vi.spyOn(validator, "isEmail").mockReturnValue(true);

        vi.spyOn(validator, "isStrongPassword").mockReturnValue(true);

        
        await registerUser(req, res);


        expect(mockUserModel.findOne).toHaveBeenCalledWith({
                email: "ink@example.com"
            });

        expect(validator.isEmail).toHaveBeenCalledWith(
                "ink@example.com"
            );

        expect(validator.isStrongPassword).toHaveBeenCalledWith(
                "Password123!"
            );

        expect(bcrypt.genSalt).toHaveBeenCalledWith(10);

        expect(bcrypt.hash).toHaveBeenCalledWith(
                "Password123!",
                "mock-salt"
            );

        expect(createdUser._id).toEqual("123");

        expect(createdUser.name).toEqual("Ink");

        expect(createdUser.email).toEqual("ink@example.com");

        expect(createdUser.password).toEqual("hashed-password");

        expect(createdUser.save).toHaveBeenCalled();

        expect(jwt.sign).toHaveBeenCalledWith(
                { _id: "123" },
                expect.anything(),
                { expiresIn: "3d" }
            );

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
                _id: "123",
                name: "Ink",
                email: "ink@example.com",
                token: "mock-token"
            });

    });


    it('should get the given email already exist message', async() => {
        const req = {
            body: {
                name: "Ink",
                email: "ink@example.com",
                password: "Password123!"
            }
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        vi.spyOn(validator, "isEmail").mockReturnValue(true);

        vi.spyOn(validator, "isStrongPassword").mockReturnValue(true);
        
        mockUserModel.findOne.mockResolvedValue(true);


        await registerUser(req, res);

        expect(mockUserModel.findOne).toHaveBeenCalledWith({
                email: "ink@example.com"
            });

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith(
                "User with the given email already exist.."
            );

        expect(validator.isEmail).not.toHaveBeenCalled();

        expect(validator.isStrongPassword).not.toHaveBeenCalled();

        expect(bcrypt.genSalt).not.toHaveBeenCalled();

        expect(bcrypt.hash).not.toHaveBeenCalled();

        expect(createdUser).toEqual(undefined);

        expect(jwt.sign).not.toHaveBeenCalled();
    });


    it("should get the require all fields message (no name entered)", async() => {
        const req = {
            body: {
                name: null,
                email: "ink@example.com",
                password: "Password123!"
            }
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };


        mockUserModel.findOne.mockResolvedValue(null);

        vi.spyOn(validator, "isEmail").mockReturnValue(true);

        vi.spyOn(validator, "isStrongPassword").mockReturnValue(true);


        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith(
                "All fields are required"
            );


        expect(validator.isEmail).not.toHaveBeenCalled();

        expect(validator.isStrongPassword).not.toHaveBeenCalled();

        expect(bcrypt.genSalt).not.toHaveBeenCalled();

        expect(bcrypt.hash).not.toHaveBeenCalled();

        expect(createdUser).toEqual(undefined);

        expect(jwt.sign).not.toHaveBeenCalled();
    });


    it("should get the require all fields message (no password entered)", async() => {
        const req = {
            body: {
                name: "Ink",
                email: "ink@example.com",
                password: null
            }
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };


        mockUserModel.findOne.mockResolvedValue(null);

        vi.spyOn(validator, "isEmail").mockReturnValue(true);

        vi.spyOn(validator, "isStrongPassword");


        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith(
                "All fields are required"
            );


        expect(validator.isEmail).not.toHaveBeenCalled();

        expect(validator.isStrongPassword).not.toHaveBeenCalled();

        expect(bcrypt.genSalt).not.toHaveBeenCalled();

        expect(bcrypt.hash).not.toHaveBeenCalled();

        expect(createdUser).toEqual(undefined);

        expect(jwt.sign).not.toHaveBeenCalled();
    });


    it("should get the require all fields message (no email entered)", async() => {
        const req = {
            body: {
                name: "Ink",
                email: null,
                password: "Password123!"
            }
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        mockUserModel.findOne.mockResolvedValue(null);

        vi.spyOn(validator, "isEmail")

        vi.spyOn(validator, "isStrongPassword").mockReturnValue(true);


        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith(
                "All fields are required"
            );


        expect(validator.isEmail).not.toHaveBeenCalled();

        expect(validator.isStrongPassword).not.toHaveBeenCalled();

        expect(bcrypt.genSalt).not.toHaveBeenCalled();

        expect(bcrypt.hash).not.toHaveBeenCalled();

        expect(createdUser).toEqual(undefined);

        expect(jwt.sign).not.toHaveBeenCalled();
    });


    it("should get the invalid email format message", async() => {

        const req = {
            body: {
                name: "Ink",
                email: "inkexample.com",
                password: "Password123!"
            }
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };


        mockUserModel.findOne.mockResolvedValue(null);

        vi.spyOn(validator, "isEmail").mockReturnValue(false);

        vi.spyOn(validator, "isStrongPassword").mockReturnValue(true);


        await registerUser(req, res);


        expect(validator.isEmail).toHaveBeenCalledWith("inkexample.com");

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith(
                "Email must be valid email..."
            );

        expect(validator.isStrongPassword).not.toHaveBeenCalled();

        expect(bcrypt.genSalt).not.toHaveBeenCalled();

        expect(bcrypt.hash).not.toHaveBeenCalled();

        expect(createdUser).toEqual(undefined);

        expect(jwt.sign).not.toHaveBeenCalled();

    });


    it("should get the require strong password message", async() => {
        const req = {
            body: {
                name: "Ink",
                email: "ink@example.com",
                password: "12345678"
            }
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };


        mockUserModel.findOne.mockResolvedValue(null);

        vi.spyOn(validator, "isEmail").mockReturnValue(true);

        vi.spyOn(validator, "isStrongPassword").mockReturnValue(false);


        await registerUser(req, res);


        expect(validator.isEmail).toHaveBeenCalledWith("ink@example.com");

        expect(validator.isStrongPassword).toHaveBeenCalledWith("12345678");

        expect(res.status)
            .toHaveBeenCalledWith(400);

        expect(res.json)
            .toHaveBeenCalledWith(
                "Password must be a strong password..."
            );

        expect(bcrypt.genSalt).not.toHaveBeenCalled();

        expect(bcrypt.hash).not.toHaveBeenCalled();

        expect(createdUser).toEqual(undefined);

        expect(jwt.sign).not.toHaveBeenCalled();

    });
    
});

describe("Test User Controller (500 Error Case)", () => {
    beforeEach(() => {
        vi.restoreAllMocks();

        createdUser = undefined;

        saveUser = vi.fn(()=>null)

        process.env.JWT_SECRET_KEY = "test-secret";

    });

    it("should return 500 when userModel.findOne() throws error", async () => {
        const req = {
            body: {
                name: "Ink",
                email: "ink@example.com",
                password: "Password123!"
            }
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const error = new Error("Database error");

        mockUserModel.findOne.mockRejectedValue(error);

        vi.spyOn(validator, "isEmail").mockReturnValue(true);

        vi.spyOn(validator, "isStrongPassword").mockReturnValue(true);

        vi.spyOn(bcrypt, "genSalt").mockResolvedValue("mock-salt");

        vi.spyOn(bcrypt, "hash").mockResolvedValue("hashed-password");

        vi.spyOn(jwt, "sign").mockReturnValue("mock-token");

        await registerUser(req, res);

        expect(res.status)
            .toHaveBeenCalledWith(500);

        expect(res.json)
            .toHaveBeenCalledWith(error);
    });

    it("should return 500 when user.save() throws error", async () => {
        const req = {
            body: {
                name: "Ink",
                email: "ink@example.com",
                password: "Password123!"
            }
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        mockUserModel.findOne.mockResolvedValue(null);

        vi.spyOn(validator, "isEmail").mockReturnValue(true);

        vi.spyOn(validator, "isStrongPassword").mockReturnValue(true);

        vi.spyOn(bcrypt, "genSalt").mockResolvedValue("mock-salt");

        vi.spyOn(bcrypt, "hash").mockResolvedValue("hashed-password");

        const error = new Error("Database save error");

        saveUser = vi.fn(()=> {throw error})

        vi.spyOn(jwt, "sign").mockReturnValue("mock-token");

        await registerUser(req, res);

        expect(res.status)
            .toHaveBeenCalledWith(500);

        expect(res.json)
            .toHaveBeenCalledWith(error);
    });

    it("should return 500 when bcrypt.genSalt() throws error", async () => {
        const req = {
            body: {
                name: "Ink",
                email: "ink@example.com",
                password: "Password123!"
            }
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        mockUserModel.findOne.mockResolvedValue(null);

        const error = new Error("genSalt error");

        vi.spyOn(bcrypt, "genSalt").mockRejectedValue(error);

        vi.spyOn(bcrypt, "hash").mockResolvedValue("hashed-password");

        vi.spyOn(jwt, "sign").mockReturnValue("mock-token");

        await registerUser(req, res);

        expect(res.status)
            .toHaveBeenCalledWith(500);

        expect(res.json)
            .toHaveBeenCalledWith(error);
    });

    it("should return 500 when bcrypt.hash() throws error", async () => {
        const req = {
            body: {
                name: "Ink",
                email: "ink@example.com",
                password: "Password123!"
            }
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        mockUserModel.findOne.mockReturnValue(null);

        vi.spyOn(bcrypt, "genSalt").mockResolvedValue("mock-salt");

        const error = new Error("Hash error");

        vi.spyOn(bcrypt, "hash").mockRejectedValue(error);

        vi.spyOn(jwt, "sign").mockReturnValue("mock-token");

        await registerUser(req, res);

        expect(res.status)
            .toHaveBeenCalledWith(500);

        expect(res.json)
            .toHaveBeenCalledWith(error);
    });

    it("should return 500 when jwt.sign() throws error", async () => {
        const req = {
            body: {
                name: "Ink",
                email: "ink@example.com",
                password: "Password123!"
            }
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        mockUserModel.findOne.mockResolvedValue(null);

        vi.spyOn(validator, "isEmail").mockReturnValue(true);

        vi.spyOn(validator, "isStrongPassword").mockReturnValue(true);

        vi.spyOn(bcrypt, "genSalt").mockResolvedValue("mock-salt");

        vi.spyOn(bcrypt, "hash").mockResolvedValue("hashed-password");
        
        const error = new Error("JWT error");

        vi.spyOn(jwt, "sign")
        .mockImplementation(() => {
            throw error
        });

        await registerUser(req, res);

        expect(res.status)
            .toHaveBeenCalledWith(500);

        expect(res.json)
            .toHaveBeenCalledWith(error);
    });

});