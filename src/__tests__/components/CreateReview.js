import { CreateReviewForm } from "../../components/RepositoryList/CreateReview";
import { render, screen, userEvent } from "@testing-library/react-native";

describe("CreateReview", () => {
  describe("CreateReviewForm ", () => {
    it("submits the correct values if the form is valid", async () => {
      const onCreateReview = jest.fn();
      render(<CreateReviewForm onCreateReview={onCreateReview} />);
      screen.debug();

      await userEvent.type(
        screen.getByPlaceholderText("Repository owner name"),
        "dez"
      );
      await userEvent.type(
        screen.getByPlaceholderText("Repository name"),
        "todo-app"
      );
      await userEvent.type(screen.getByPlaceholderText("Rating 0-100"), "100");
      await userEvent.type(screen.getByPlaceholderText("Review"), "Good app");
      await userEvent.press(screen.getByText("Submit"));

      expect(onCreateReview).toHaveBeenCalled();

      const review = {
        ownerName: "dez",
        repositoryName: "todo-app",
        rating: Number("100"),
        text: "Good app",
      };

      expect(onCreateReview.mock.calls[0][0]).toEqual(review);
    });
  });
});
