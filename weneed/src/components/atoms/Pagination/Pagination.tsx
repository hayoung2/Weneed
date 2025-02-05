import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  totalPages: number;
  activePage: number;
  onPageClick: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, activePage, onPageClick }) => {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, index) => (
        <React.Fragment key={index}>
          <span
            className={`${styles.page} ${activePage === index + 1 ? styles.active : ''}`}
            onClick={() => onPageClick(index + 1)}
          >
            {index + 1}
          </span>
          {index < totalPages - 1 && <span className={styles.separator}></span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Pagination;
