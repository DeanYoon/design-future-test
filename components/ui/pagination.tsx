"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 flex items-center gap-1 md:gap-2 whitespace-nowrap rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        aria-label="Previous page"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-xs">前の</span>
      </button>

      <ReactPaginate
        pageCount={totalPages}
        forcePage={currentPage - 1}
        onPageChange={handlePageClick}
        marginPagesDisplayed={isMobile ? 2 : 3}
        pageRangeDisplayed={isMobile ? 1 : 1}
        breakLabel="..."
        previousLabel={null}
        nextLabel={null}
        containerClassName="flex items-center gap-0.5 md:gap-1"
        pageClassName=""
        pageLinkClassName="w-8 h-8 md:w-8 md:h-8 rounded-full text-sm transition-colors hover:bg-gray-50 flex items-center justify-center"
        activeLinkClassName="bg-[#EAEAED]"
        breakClassName="px-1 md:px-2 text-gray-400"
        disabledClassName="hidden"
      />

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 flex items-center gap-1 md:gap-2 whitespace-nowrap rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        aria-label="Next page"
      >
        <span className="text-xs">次</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
