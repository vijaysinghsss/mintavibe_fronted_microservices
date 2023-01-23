import React from "react";
import ReactPaginate from "react-paginate";
export const Pagination = ({ totalPages, pageNo, setData }) => {

  return (
    <>
      <nav className={"Page navigation example"}>
        <ReactPaginate

          className="pagination pagination-primary  justify-content-end"
          previousLabel="< previous"
          breakLabel="..."
          nextLabel="next >"
          previousClassName="page-item"
          nextClassName="page-item"
          pageClassName="page-item"
          forcePage={parseInt(pageNo) - 1}
          pageLinkClassName="page-link"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          activeClassName="active"
          marginPagesDisplayed={2}
          onPageChange={setData}
          pageCount={Math.ceil(totalPages)}
          renderOnZeroPageCount={null}
        />
      </nav>
    </>
  );
};
