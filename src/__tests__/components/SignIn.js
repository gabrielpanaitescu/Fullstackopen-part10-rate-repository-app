import { SignInForm } from "../../components/SignIn";
import { render, screen } from "@testing-library/react-native";
import { userEvent } from "@testing-library/react-native";

describe("SignIn", () => {
  describe("SignInForm", () => {
    it("filling the username and password fields and pressing submit correctly calls the handleSubmit function", async () => {
      const onSignIn = jest.fn();

      render(<SignInForm onSignIn={onSignIn} />);

      const user = userEvent.setup();

      await user.type(screen.getByPlaceholderText("Username"), "kalle");
      await user.type(screen.getByPlaceholderText("Password"), "password");
      await user.press(screen.getByText("Sign in"));

      expect(onSignIn).toHaveBeenCalled();

      expect(onSignIn.mock.calls[0][0]).toEqual({
        username: "kalle",
        password: "password",
      });
    });
  });
});
