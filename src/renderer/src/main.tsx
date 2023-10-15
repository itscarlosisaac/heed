import App from './App'
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import store from './redux/store/store'
import { ChakraProvider } from '@chakra-ui/react'
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // eslint-disable-next-line react/jsx-no-undef
  <ChakraProvider>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ChakraProvider>
)
