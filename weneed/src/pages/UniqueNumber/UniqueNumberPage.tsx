import { useParams, useLocation, useNavigate } from "react-router-dom";
import UniqueNumber from "./UniqueNumber";

const UniqueNumberPage: React.FC = () => {
    const { companyName, businessNumber, representative, uniqueNumber } = useParams();
    const navigate = useNavigate();
  
    return (
      <UniqueNumber
        companyName={companyName || ""}
        businessNumber={businessNumber || ""}
        representative={representative || ""}
        uniqueNumber={uniqueNumber || ""}
        onNext={() => navigate(`/company-info/${companyName}/${businessNumber}/${representative}/${uniqueNumber}`)}
      />
    );
  };
  
  export default UniqueNumberPage;
  
