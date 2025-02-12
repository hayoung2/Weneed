import { useParams, useLocation } from "react-router-dom";
import MeetingNote from "@/components/common/MeetingNote/MeetingNote";

const MeetingNotePage: React.FC = () => {
  const { title, representative, address, businessType, contact, fax } = useParams();
  const location = useLocation();

  
  let mode: "default" | "view" | "edit" = "default";
  if (location.pathname.includes("meetingView")) mode = "view";
  if (location.pathname.includes("meetingEdit")) mode = "edit";

  return (
    <MeetingNote
      title={title || ""}
      representative={representative || ""}
      address={address || ""}
      businessType={businessType || ""}
      contact={contact || ""}
      fax={fax || ""}
      mode={mode} 
    />
  );
};

export default MeetingNotePage;
