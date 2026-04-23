import React from 'react';
import styles from './fragments.module.scss';

const Pagination = ({ length, postsPerPage, handlePagination, currentPage }) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
     // Keep the number of rendered pages within the configured limit.
    paginationNumbers.push(i);  // Create page numbers displayed in pagination.
  }

  return (
    <div> 
        <ul className={`pagination pagination-lg paginationCustom d-flex ${styles.custom_wrapper}`}>
        {paginationNumbers.map((pageNumber) => ( // Render page buttons.
            <li className="page-item" aria-current="page">
                <button key={pageNumber} 
                className="page-link"
                onClick={() => handlePagination(pageNumber)}>
                    {pageNumber}
                </button>
            </li>
        ))}
        </ul>
    </div>
  );
};

export default Pagination;
