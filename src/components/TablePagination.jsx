import React, { useEffect, useState } from "react";
import { Nav, Card, Pagination } from "@themesberg/react-bootstrap";
import { PAGE_SIZE, FIRST_PAGE_INDEX } from "../pages/constante/Const";


export const TablePagination = (props) => {
  const { count, size, currentPage = FIRST_PAGE_INDEX, onPageChange = (page) => {} } = props;
  const [pages, setPages] = useState([]);

  const pageSize = () => Math.max(size, PAGE_SIZE);
  const firstIndex = () => {
    if (count === 0) return 0;
    return currentPage * pageSize() + 1;
  };
  const lastIndex = () => Math.min((currentPage + 1) * pageSize(), count);

  const canGoPrev = () => currentPage > FIRST_PAGE_INDEX;
  const canGoNext = () => currentPage < Math.max(pages.length - 1, FIRST_PAGE_INDEX);

  const goToPrev = () => {
    if (!canGoPrev()) return;
    onPageChange(currentPage - 1);
  };
  const goToNext = () => {
    if (!canGoNext()) return;
    onPageChange(currentPage + 1);
  };

  useEffect(() => {
    const sizeToUse = pageSize();
    const nbPages = Math.ceil(count / sizeToUse);
    console.log(nbPages, count / sizeToUse, count, sizeToUse);
    const pageList = [];
    for (let i = FIRST_PAGE_INDEX; i < nbPages; i++) {
      pageList.push({
        id: "" + i,
        name: "" + (i),
        index: i,
        action: () => {
          onPageChange(i);
        },
      });
    }
    setPages(pageList);
  }, [count, size]);
  return (
    <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
      <Nav>
        <Pagination className="mb-2 mb-lg-0">
          <Pagination.Prev disabled={!canGoPrev()} onClick={goToPrev}>
            Précédent
          </Pagination.Prev>
          {pages.map((page) => (
           page.index < 15 ? <Pagination.Item
           key={page.id}
           active={page.index === currentPage}
           onClick={page.action}
         >
           {page.name}
         </Pagination.Item>: page.index > 15 ? "" : <Pagination.Ellipsis/>
          ))}
          <Pagination.Next disabled={!canGoNext()} onClick={goToNext}>
            Suivant
          </Pagination.Next>
        </Pagination>
      </Nav>
      <small className="fw-bold">
        <b>{firstIndex()}</b> à <b>{lastIndex()}</b> sur <b>{count}</b>
      </small>
    </Card.Footer>
  );
};
