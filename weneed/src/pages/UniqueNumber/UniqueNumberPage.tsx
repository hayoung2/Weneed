import { useParams, useNavigate } from "react-router-dom";
import UniqueNumber from "./UniqueNumber";
import { useAuth } from "@/components/contexts/AuthContext";

const UniqueNumberPage: React.FC = () => {
    const { companyName, businessNumber, representative, uniqueNumber } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
      <UniqueNumber
        companyName={companyName || ""}
        businessNumber={businessNumber || ""}
        representative={representative || ""}
        uniqueNumber={uniqueNumber || ""}
        onNext={() => {
          if(user?.userType==="개인"){
            navigate("/")
          }else{
            navigate(`/companyInfo/${companyName}/${businessNumber}/${representative}/${user?.uniqueId}`)
          }
        }}
      />
    );
  };
  
  export default UniqueNumberPage;
  
