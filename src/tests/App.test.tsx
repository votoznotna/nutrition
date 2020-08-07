import React from 'react';
import { MockedProvider } from "@apollo/react-testing"
import { render } from '@testing-library/react';
import App from '../components/App';

let emptyMock: any[] = []

test('renders page elements as expected', async () => {
  const { getByText, getByTestId, container } = render(
    <MockedProvider mocks={emptyMock} addTypename={false}>
      <App />
    </MockedProvider>)

  expect(container).toMatchSnapshot();

  let nutritionTable = getByTestId('nutrition-table')
  expect(nutritionTable).toBeInTheDocument()

  let tableField = getByText("Dessert (100g serving)")
  expect(tableField).toBeInTheDocument()

  tableField = getByText("Calories")
  expect(tableField).toBeInTheDocument()

  tableField = getByText("Fat (g)")
  expect(tableField).toBeInTheDocument()
  
  tableField = getByText("Carbs (g)")
  expect(tableField).toBeInTheDocument()

  tableField = getByText("Protein (g)")
  expect(tableField).toBeInTheDocument()

  let addNewButton = getByText("ADD NEW")
  expect(addNewButton).toBeInTheDocument()

  let deleteButton = getByText("DELETE")
  expect(deleteButton).toBeInTheDocument()

  expect(container).toMatchSnapshot();

});
