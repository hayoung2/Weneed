import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RouterPath } from '@/routes/path'
import { HomePage } from '@/pages/Home/Home'
import { LoginPage } from '@/pages/Login/Login'
import  SignUpPage  from '@/pages/SignUp/SignUp'
import { IntroductionPage } from '@/pages/Introduction/Introduction'
import  MeetingNotePage  from '@/pages/MeetingNote/MeetingNote'


const router = createBrowserRouter([
  { path: RouterPath.HOME, element: <HomePage /> },
  { path: RouterPath.LOGIN, element: <LoginPage /> },
  { path: RouterPath.SIGNUP, element: <SignUpPage /> },
  { path: RouterPath.INTRODUCTION, element: <IntroductionPage /> },
  {
    path: `${RouterPath.MEETINGNOTE}/:title/:representative/:address/:businessType/:contact/:fax`,
    element: <MeetingNotePage />,
  },

])

export const Routes = () => {
  return <RouterProvider router={router} />
}