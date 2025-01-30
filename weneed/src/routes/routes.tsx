import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RouterPath } from '@/routes/path'
import { HomePage } from '@/pages/Home/Home'
import { LoginPage } from '@/pages/Login/Login'
import  SignUpPage  from '@/pages/SignUp/SignUp'

const router = createBrowserRouter([
  { path: RouterPath.HOME, element: <HomePage /> },
  { path: RouterPath.LOGIN, element: <LoginPage /> },
  { path: RouterPath.SIGNUP, element: <SignUpPage /> },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}