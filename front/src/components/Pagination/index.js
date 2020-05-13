import React from 'react';

import { NavigateBeforeRounded, NavigateNextRounded } from '@material-ui/icons';
import './styles.css';

const pagesNavigate = (
  currentPage, page, setPage,
) => {
  if (currentPage !== page) setPage(page);
};

const setPagesRange = (page, lastPage, totalPages) => {
  let startingPage = page - totalPages / 2 > 1 ? Math.ceil(page - totalPages / 2) : 1;
  const endingPage = startingPage + totalPages > lastPage ? lastPage : startingPage + totalPages;

  if (endingPage - startingPage < totalPages) {
    startingPage = endingPage - totalPages > 1
      ? endingPage - totalPages : 1;
  }

  const length = endingPage - startingPage + 1;

  return Array.from({ length }, (_, i) => startingPage + i);
};

const Pagination = ({
  page, lastPage, setPage,
}) => {
  const pages = setPagesRange(page, lastPage, 3);

  return (
    <div className="pagination">
      {/* previous button */}
      <div className="prev-button">
        {page > 1 && (
        <button
          type="button"
          disabled={page === 1}
          onClick={() => pagesNavigate(page, page - 1, setPage)}
        >
          <NavigateBeforeRounded />
        </button>
        )}
      </div>

      {/* first page */}
      <div className="pages">
        {page > 1 && (
          <button
            type="button"
            onClick={() => pagesNavigate(page, 1, setPage)}
            style={{
              width: '36px',
              minWidth: '36px',
              height: '36px',
            }}
          >
            1
          </button>
        )}

        {/* page list */}
        {pages.map((pageButton) => {
          if (pageButton == page) {
            return (
              <div className="button" key={page}>
                <span variant="subtitle2">{page}</span>
              </div>
            );
          }
          if (pageButton != 1 && pageButton != lastPage) {
            return (
              <button
                type="button"
                key={pageButton}
                onClick={() => pagesNavigate(page, pageButton, setPage)}
              >
                {pageButton}
              </button>
            );
          }

          return null;
        })}

        {/* last page */}
        {page < lastPage && (
          <button
            type="button"
            onClick={() => pagesNavigate(page, lastPage, setPage)}
          >
            {lastPage}
          </button>
        )}
      </div>

      {/* next button */}
      <div className="next-button">
        {page < lastPage && (
        <button
          type="button"
          onClick={() => pagesNavigate(page, page + 1, setPage)}
          disabled={page === lastPage}
        >
          <NavigateNextRounded />
        </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
