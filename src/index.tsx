import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './components/App'
import { NutritionProvider } from './context/NutritionContext';
import client from './client'
import './index.scss'

const Root = () => (
  <React.StrictMode>
    <ApolloProvider client={client}>
      <NutritionProvider>
        <App />
      </NutritionProvider>
    </ApolloProvider>
  </React.StrictMode>
)

ReactDOM.render(<Root />, document.getElementById('root'))
