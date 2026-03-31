import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from "./app/store.js"
import './index.css'
import Home from './components/Home/Home.jsx'
import LoginForm from './components/LoginForm/LoginForm.jsx'
import ProductsPage from './components/ProductsPage/ProductsPage.jsx'
import RootLayout from './components/RootLayout/RootLayout.jsx'
import SingleProductPage from './components/SingleProductPage/SingleProductPage.jsx'
import CreateProductForm from "./components/CreateProductForm/CreateProductForm.jsx"

const router = createBrowserRouter([
  {
    path: "/", 
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <ProductsPage />
      },
      {
        path: 'login',
        element: <LoginForm />
      },
      {
        path: "product/:id",
        element: <SingleProductPage />
      },
      {
        path: "product/create",
        element: <CreateProductForm />
      }
    ]  
  },
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <RouterProvider router={router} />
  </Provider>
)
