import { RepositoryListContainer } from "../../components/RepositoryList";
import { screen, render } from "@testing-library/react-native";
import { decimalTransform } from "../../utils/decimalTransform";
import { within } from "@testing-library/react-native";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);
      const repositoriesByTestID = screen.getAllByTestId("repositoryItem");
      screen.debug();

      const [firstRepository, secondRepository] = repositoriesByTestID;

      const repositoriesValues = repositories.edges.map((edge) => {
        const testRepositoriesProperties = (({
          fullName,
          description,
          language,
          forksCount,
          stargazersCount,
          ratingAverage,
          reviewCount,
        }) => {
          return {
            fullName,
            description,
            language,
            forksCount,
            stargazersCount,
            ratingAverage,
            reviewCount,
          };
        })(edge.node);

        return Object.values(testRepositoriesProperties);
      });

      repositoriesValues[0].forEach((value) => {
        if (typeof value === "number") {
          expect(
            within(firstRepository).getByText(decimalTransform(value))
          ).toBeDefined();
        } else {
          expect(within(firstRepository).getByText(value)).toBeDefined();
        }
      });

      repositoriesValues[1].forEach((value) => {
        if (typeof value === "number") {
          expect(
            within(secondRepository).getByText(decimalTransform(value))
          ).toBeDefined();
        } else {
          expect(within(secondRepository).getByText(value)).toBeDefined();
        }
      });
    });
  });
});
