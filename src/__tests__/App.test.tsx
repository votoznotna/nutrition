import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import { render } from "@testing-library/react";
import NutritionProvider from "../context/NutritionContext";
import { GET_DESSERTS } from "../pages/NutritionList";
import App from "../components/App";

import { act } from "react-dom/test-utils";

const wait = (ms = 0) => act(() => new Promise((done) => setTimeout(done, ms)));

const mocks: any[] = [
  {
    request: {
      query: GET_DESSERTS,
    },
    result: {
      data: {
        desserts: [
          {
            id: "fafa6860-d77d-11ea-9788-ad71c48281af",
            name: "KitKat",
            created: "1596674666982",
            nutritionInfo: {
              calories: 518,
              fat: 26,
              carbs: 65,
              protein: 60,
              __typename: "NutritionInfo",
            },
            __typename: "Dessert",
          },
        ],
      },
    },
  },
];

describe("<App/>", () => {
  it("renders page elements as expected", async () => {
    const { getByText, getByTestId, queryByText, container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NutritionProvider>
          <App />
        </NutritionProvider>
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();

    expect(queryByText("Nutrition List")).toBeTruthy();

    expect(
      Array.from(container.querySelectorAll("button"))
        .map((btn) => btn.textContent?.trim())
        .toString()
    ).toBe("RESET DATA,ADD NEW,DELETE");

    await wait(); // wait untill loading completed

    let nutritionTable = getByTestId("nutrition-table");
    expect(nutritionTable).toBeInTheDocument();

    let tableField = getByText("Dessert (100g serving)");
    expect(tableField).toBeInTheDocument();

    tableField = getByText("Calories");
    expect(tableField).toBeInTheDocument();

    tableField = getByText("Fat (g)");
    expect(tableField).toBeInTheDocument();

    tableField = getByText("Carbs (g)");
    expect(tableField).toBeInTheDocument();

    tableField = getByText("Protein (g)");
    expect(tableField).toBeInTheDocument();

    let addNewButton = getByText("ADD NEW");
    expect(addNewButton).toBeInTheDocument();

    let deleteButton = getByText("DELETE");
    expect(deleteButton).toBeInTheDocument();
  });
});
