import Card from "@/components/common/Card/Card";
import { mockCards } from "@/components/atoms/MockDate/MockData";

const GetMockData = () => {
  return (
    <>
      {mockCards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </>
  );
};

export default GetMockData;
