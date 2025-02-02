import MeetingNote from "@/components/common/MeetingNote/MeetingNote";
import { useParams } from "react-router-dom";

const MeetingNotePage = () => {
  const { title, representative, address, businessType, contact, fax } = useParams();

  return (
    <MeetingNote
      title={title || "기본 제목"}
      representative={representative || "미입력"}
      address={address || "미입력"}
      businessType={businessType || "미입력"}
      contact={contact || "미입력"}
      fax={fax || "미입력"}
    />
  );
};

export default MeetingNotePage;
