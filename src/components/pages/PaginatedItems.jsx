import React, { useState } from 'react'
import { PAGES_COUNT } from '../../constants/Constant';

const PaginatedItems = ({ordersPerPage}) => {
    const orders = [];
    const [orderOffset ,setorderOffset]= useState(0);
    const endOffset = orderOffset+ordersPerPage;
    console.log(`Loading items from ${orderOffset} to ${endOffset}`);
    const currentItems = orders.slice(orderOffset,endOffset);
    const pageCount = Math.ceil(orders.length/ordersPerPage);
    const handlePageClick = (event)=>{
        const newOffset = (event.selected*ordersPerPage)% orders.length;
        console.log(`User requested page number ${event.selected},which is offset ${newOffset}` );
        setorderOffset(newOffset);
    }


  return (
    <div className="d-flex justify-content-center align-items-center">
    <ReactPaginate
        containerClassName='pagination'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        activeClassName='active'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        breakLabel="..."
        nextLabel="&raquo;"
        previousLabel="&laquo;"
        forcePage={currentPage}
        onPageChange={handlePageClick}
        pageRangeDisplayed={PAGES_COUNT}
        pageCount={Math.ceil(totalCount / LIMIT)}
        renderOnZeroPageCount={null}
    />
</div>
  )
}

export default PaginatedItems