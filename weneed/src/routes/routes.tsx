
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RouterPath } from '@/routes/path'
import { HomePage } from '@/pages/Home/Home'
import { LoginPage } from '@/pages/Login/Login'
import  SignUpPage  from '@/pages/SignUp/SignUp'
import { IntroductionPage } from '@/pages/Introduction/Introduction'
import  MeetingNotePage  from '@/pages/MeetingNote/MeetingNote'
import SearchPage from '@/pages/Search/Search'
import ListPage from '@/pages/ListPage/ListPage'
import AiMatching from '@/pages/AiMatching/AiMatching'
import AiMatchingS from '@/pages/AiMatchingS/AiMatchingS'
import CompanyInfoPage from "@/pages/CompanyInfo/CompanyInfoPage";
import UniqueNumberPage from "@/pages/UniqueNumber/UniqueNumberPage";
import TransactionDetail from '@/pages/TransactionDetail/TransactionDetail'
import RegisterByproduct from '@/pages/RegisterByproduct/RegisterByproduct'
import RegisterResource from '@/pages/RegisterResource/RegisterResource'
import CompanyInfoDetail from '@/pages/CompanyInfoDetail/CompanyInfoDetail'
import Mypage from '@/pages/MyPage/MyPage'
import MypagePersonal from '@/pages/MyPagePersonal/MyPagePersonal'
import CreateTransaction from '@/pages/CreateTransaction/CreateTransaction'
import TransactionView from '@/pages/TransactionView/TransactionView'


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

  { path: RouterPath.LISTPAGE, element: <ListPage /> },
  { path: RouterPath.AIMATCHING, element: <AiMatching />},
  { path: RouterPath.AIMATCHINGSEARCH, element: <AiMatchingS />},

  {
    path: `${RouterPath.COMPANYINFO}/:companyName/:businessNumber/:representative/:uniqueNumber`,
    element: <CompanyInfoPage />,
  },
  {
    path: `${RouterPath.UNIQUENUMBER}/:companyName/:businessNumber/:representative/:uniqueNumber`,
    element: <UniqueNumberPage />,
  },
  { path: `${RouterPath.TRANSACTIONDETAIL}/:id`, element: <TransactionDetail />},
  { path: RouterPath.REGISTERRESOURCE, element: <RegisterResource />},
  { path: RouterPath.REGISTERBYPRODUCT, element: <RegisterByproduct />},
  { path: `${RouterPath.COMPANYINFODETAIL}/:uniqueId`, element: <CompanyInfoDetail />},
  { path: RouterPath.MYPAGE, element: <Mypage />},
  { path: RouterPath.MYPAGEPERSONAL, element: <MypagePersonal />},
  { path: RouterPath.CREATETRANSACTION, element: <CreateTransaction />},
  { path: RouterPath.TRANSACTIONVIEW, element: <TransactionView />},
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
