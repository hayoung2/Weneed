import { useParams, useLocation, useNavigate } from "react-router-dom";
import CompanyInfo from "./CompanyInfo";

const CompanyInfoPage: React.FC = () => {
  const { companyName, businessNumber, representative } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  let step = 1;
  if (location.pathname.includes("step2")) step = 2;
  if (location.pathname.includes("step3")) step = 3;

  return (
      <CompanyInfo
          companyName={companyName || ""}
          businessNumber={businessNumber || ""}
          representative={representative || ""}
          step={step}
          onSkip={() => navigate("/login")}
      />
  );
};

export default CompanyInfoPage;
