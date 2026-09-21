import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Register from "../src/pages/Register";
import { AuthContext } from "../src/context/AuthContext";
import { postRequest } from "../src/utils/services.js";


const mockAuthContext = {
    registerInfo: {
        name: "",
        email: "",
        password: "",
    },

    updateRegisterInfo: vi.fn(),
    ///registerUser: vi.fn((e) => e.preventDefault()),
    registerUser: vi.fn((e) => 
        e.preventDefault()
    ),

    registerError: null,

    isRegisterloading: false,
};

vi.mock("../src/utils/services.js", () => ({
    postRequest: vi.fn(),
    baseUrl: "http://localhost:5000/",
}));

const renderRegister = () => {
    return render(
        <AuthContext.Provider value={mockAuthContext}>
            <Register />
        </AuthContext.Provider>
    );
};


describe("Register Component", () => {

    it("should render register form", () => {

        renderRegister();

        expect(
            screen.getByRole("heading", { name: "Register" })
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText("Name")
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText("Email")
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText("Password")
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: "Register" })
        ).toBeInTheDocument();
    });


    it("should update name when user types", async () => {

        const user = userEvent.setup();

        renderRegister();

        const input =
            screen.getByPlaceholderText("Name");

        await user.type(input, "Ink");

        expect(
            mockAuthContext.updateRegisterInfo
        ).toHaveBeenLastCalledWith({
            name: "Ink",
            email: "",
            password: "",
        });
    });


    it("should update email when user types", async () => {

        const user = userEvent.setup();

        renderRegister();

        const input =
            screen.getByPlaceholderText("Email");

        await user.type(input, "ink@example.com");

        expect(
            mockAuthContext.updateRegisterInfo
        ).toHaveBeenLastCalledWith({
            name: "",
            email: "ink@example.com",
            password: "",
        });
    });


    it("should update password when user types", async () => {

        const user = userEvent.setup();

        renderRegister();

        const input =
            screen.getByPlaceholderText("Password");

        await user.type(input, "123456");

        expect(
            mockAuthContext.updateRegisterInfo
        ).toHaveBeenLastCalledWith({
            name: "",
            email: "",
            password: "123456",
        });
    });


    it("should call registerUser when form is submitted", async () => {

        const user = userEvent.setup();

        renderRegister();

        const button =
            screen.getByRole("button", {
                name: "Register",
            });

        await user.click(button);

        expect(
            mockAuthContext.registerUser
        ).toHaveBeenCalled();
    });


    it("should show loading text", () => {

        const loadingContext = {
            ...mockAuthContext,
            isRegisterloading: true,
        };

        render(
            <AuthContext.Provider value={loadingContext}>
                <Register />
            </AuthContext.Provider>
        );

        expect(
            screen.getByRole("button", {
                name: "Creating your account",
            })
        ).toBeInTheDocument();
    });


    it("should show register error", () => {

        const errorContext = {
            ...mockAuthContext,

            registerError: {
                error: true,
                message: "Email already exists",
            },
        };

        render(
            <AuthContext.Provider value={errorContext}>
                <Register />
            </AuthContext.Provider>
        );

        expect(
            screen.getByText("Email already exists")
        ).toBeInTheDocument();
    });

});

