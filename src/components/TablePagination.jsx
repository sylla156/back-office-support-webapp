import React, {useEffect, useState} from "react";
import {Nav, Card, Pagination} from "@themesberg/react-bootstrap";
import {PAGE_SIZE, FIRST_PAGE_INDEX} from "../pages/constante/Const";

/**
 * About variables used in this component.
 * count: number of items on the page
 * size: max number of items per page
 * pages: an array of integers used to store page indexes
 */

export const TablePagination = (props) => {

    const {count, size, currentPage = FIRST_PAGE_INDEX, onPageChange = (page) => {}} = props;
    const [pages, setPages] = useState([]);

    const pageSize = () => Math.max(size, PAGE_SIZE);
    const firstIndex = () => {
        // FIXME: Hack to solve problem for api not returning total number of items.
        // See https://www.notion.so/hub2-re/457710ed1a044b28b957394838e1d5f3?v=aa874f8444f24385a68eb3aa8cfaf059&pvs=4
        if (count === undefined) {
            return 1;
        }
        // End of hack.

        if (count === 0) return 0;
        // formule pour trouver le premier index ==> (Numéro de page - 1) * Taille de page + 1
        return (currentPage - 1) * pageSize() + 1;
    
    };
    const lastIndex = () => Math.min((currentPage) * pageSize(), count);

    const canGoPrev = () => currentPage > FIRST_PAGE_INDEX;

    const canGoNext = () => {
        // FIXME: Hack to solve problem for api not returning total number of items.
        // See https://www.notion.so/hub2-re/457710ed1a044b28b957394838e1d5f3?v=aa874f8444f24385a68eb3aa8cfaf059&pvs=4
        if (count === undefined) {
            return true;
        }
        // End of hack.
        return currentPage < Math.max(pages.length, FIRST_PAGE_INDEX)
    };

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
        // console.log(nbPages, count / sizeToUse, count, sizeToUse);
        const pageList = [];
        for (let i = FIRST_PAGE_INDEX; i <= nbPages; i++) {

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
                        </Pagination.Item> : page.index > 15 ? "" : <Pagination.Ellipsis/>
                    ))}
                    <Pagination.Next disabled={!canGoNext()} onClick={goToNext}>
            Suivant
                    </Pagination.Next>
                </Pagination>
            </Nav>
            {/*
              // FIXME: remove the condition on `count`.
              // See https://www.notion.so/hub2-re/457710ed1a044b28b957394838e1d5f3?v=aa874f8444f24385a68eb3aa8cfaf059&pvs=4
            */}
            {
                count !== undefined &&
                <small className="fw-bold">
                    <b>{firstIndex()}</b> à <b>{lastIndex()}</b> sur <b>{count}</b>
                </small>
            }
        </Card.Footer>
    );

};
