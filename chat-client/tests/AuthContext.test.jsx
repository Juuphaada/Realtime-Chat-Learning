import {describe,it,expect,vi,beforeEach} from "vitest";
import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Register from "../src/pages/Register";
import {AuthContextProvider} from "../src/context/AuthContext";
import { postRequest } from "../src/utils/services.js";


vi.mock("../src/utils/services.js", () => ({
    postRequest: vi.fn(),
    baseUrl: "http://localhost:5000",
}));


beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
});


const renderRegisterWithRealContext = () => {
    return render(
        <AuthContextProvider>
            <Register />
        </AuthContextProvider>
    );
};


describe("Register Component", () => {

    it("should register user successfully", async () => {

        const response = {
            _id: "123",
            name: "Ink",
            email: "ink@example.com",
        };

        postRequest.mockResolvedValue(response);

        const user = userEvent.setup();

        renderRegisterWithRealContext();

        await user.type(
            screen.getByPlaceholderText("Name"),
            "Ink"
        );

        await user.type(
            screen.getByPlaceholderText("Email"),
            "ink@example.com"
        );

        await user.type(
            screen.getByPlaceholderText("Password"),
            "123456"
        );

        await user.click(
            screen.getByRole("button", {
                name: "Register",
            })
        );

        expect(postRequest).toHaveBeenCalledWith(
            "http://localhost:5000/users/register",
            JSON.stringify({
                name: "Ink",
                email: "ink@example.com",
                password: "123456",
            })
        );

        expect(localStorage.getItem("User"))
            .toBe(JSON.stringify(response));

    });

});