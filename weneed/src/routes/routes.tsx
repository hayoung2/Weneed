import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RouterPath } from './path'
import { HomePage } from '../pages/Home/Home'
import { LoginPage } from '../pages/Login/Login'

const router = createBrowserRouter([
  { path: RouterPath.HOME, element: <HomePage /> },
  { path: RouterPath.LOGIN, element: <LoginPage /> },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}