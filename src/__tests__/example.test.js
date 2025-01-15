import { render, screen, userEvent } from "@testing-library/react-native";
import { Greeting } from "../components/Greeting";
import { Form } from "../components/Form";

describe("Greeting", () => {
  test("renders a greeting message based on the passed prop", () => {
    render(<Greeting text="Hello" />);

    screen.debug();

    expect(screen.getByText("Hello")).toBeDefined();
  });
});

describe("Form", () => {
  it("calls function provided by onSubmit prop after pressing the submit button", async () => {
    const onSubmit = jest.fn();

    render(<Form onSubmit={onSubmit} />);

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Username"), "kalle");
    await user.type(screen.getByPlaceholderText("Password"), "password");

    await user.press(screen.getByText("Submit"));

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: "kalle",
      password: "password",
    });
  });
});
