import App from './App'
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import store from './redux/store/store'
import { ChakraProvider } from '@chakra-ui/react'
import './styles/index.scss'
import ChakraCustomTheme from './Theme/index'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider theme={ChakraCustomTheme}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ChakraProvider>
)
