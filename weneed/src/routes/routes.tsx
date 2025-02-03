import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RouterPath } from '@/routes/path'
import { HomePage } from '@/pages/Home/Home'
import { LoginPage } from '@/pages/Login/Login'
import  SignUpPage  from '@/pages/SignUp/SignUp'
import { IntroductionPage } from '@/pages/Introduction/Introduction'
import  MeetingNotePage  from '@/pages/MeetingNote/MeetingNote'
import SearchPage from '@/pages/Search/Search'
import CompanyInfoPage from '@/pages/CompanyInfo/CompanyInfoPage'


const router = createBrowserRouter([
  { path: RouterPath.HOME, element: <HomePage /> },
  { path: RouterPath.LOGIN, element: <LoginPage /> },
  { path: RouterPath.SIGNUP, element: <SignUpPage /> },
  { path: RouterPath.INTRODUCTION, element: <IntroductionPage /> },
  {
    path: `${RouterPath.MEETINGNOTE}/:title/:representative/:address/:businessType/:contact/:fax`,
    element: <MeetingNotePage />, 
  },
  {
    path: `${RouterPath.MEETINGNOTEVIEW}/:title/:representative/:address/:businessType/:contact/:fax`,
    element: <MeetingNotePage />, 
  },
  {
    path: `${RouterPath.MEETINGNOTEEDIT}/:title/:representative/:address/:businessType/:contact/:fax`,
    element: <MeetingNotePage />, 
  },
  
  { path: RouterPath.SEARCH, element: <SearchPage /> },
 { 
    path: `${RouterPath.COMPANYINFO}/:companyName/:businessNumber/:representative`, element: <CompanyInfoPage /> }, 
])

export const Routes = () => {
  return <RouterProvider router={router} />
}