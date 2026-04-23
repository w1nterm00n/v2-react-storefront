import React from 'react';
import styles from './fragments.module.scss';

const Pagination = ({ length, postsPerPage, handlePagination, currentPage }) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
     //тут проверка чтобы не выводилось больше, чем задано на странице
    paginationNumbers.push(i);  //создаются числа (которые отобразятся в пагинации)
  }

  return (
    <div> 
        <ul className={`pagination pagination-lg paginationCustom d-flex ${styles.custom_wrapper}`}>
        {paginationNumbers.map((pageNumber) => ( //рендеринг кнопок
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
