import { useParams, useLocation, useNavigate } from "react-router-dom";
import CompanyInfo from "./CompanyInfo";
import { useAuth } from '@/components/contexts/AuthContext';

const CompanyInfoPage: React.FC = () => {
  const { companyName, businessNumber, representative } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  let step = 1;
  if (location.pathname.includes("step2")) step = 2;
  if (location.pathname.includes("step3")) step = 3;

  return (
      <CompanyInfo
          companyName={companyName || ""}
          businessNumber={businessNumber || ""}
          representative={representative || ""}
          uniqueId={user?.uniqueId || ""}
          step={step}
          onSkip={() => navigate("/")}
      />
  );
};

export default CompanyInfoPage;
