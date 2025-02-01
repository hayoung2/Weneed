import { useState } from "react";
import styles from "./Home.module.scss";
import SearchBar from '@/components/common/SearchBar/SearchBar';

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={styles.home}>
      <SearchBar
        value={searchTerm} 
        onChange={setSearchTerm}
        placeholder="검색어를 입력하세요."
      />
    </div>
  );
};
