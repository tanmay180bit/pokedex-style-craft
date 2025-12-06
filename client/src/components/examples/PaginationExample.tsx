import { useState } from "react";
import { Pagination } from "../Pagination";

export default function PaginationExample() {
  const [page, setPage] = useState(5);

  return (
    <div className="p-8 space-y-4">
      <Pagination currentPage={page} totalPages={50} onPageChange={setPage} />
      <p className="text-center text-sm text-muted-foreground">
        Current page: {page}
      </p>
    </div>
  );
}
