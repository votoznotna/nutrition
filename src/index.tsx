import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './components/App'
import client from './client'
import './index.scss'

const Root = () => (
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)

ReactDOM.render(<Root />, document.getElementById('root'))
