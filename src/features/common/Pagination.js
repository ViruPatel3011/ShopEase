import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ITEMS_PER_PAGE } from "../../app/constant";

export function Pagination({ page, setPage, handlePage, totalItems }) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    console.log('totalPages' , totalPages);
    console.log('totalItems', totalItems);
    const getPageNumbers = () => {
        let pages = [];

        if (totalPages <= 5) {
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            if (page <= 3) {
                pages = [1, 2, 3, 4, 5, '...', totalPages];
            } else if (page >= totalPages - 2) {
                pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, '...', page - 1, page, page + 1, '...', totalPages];
            }
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <div
                    onClick={() => handlePage(page > 1 ? page - 1 : page)}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </div>
                <div
                    onClick={() => handlePage(page < totalPages ? page + 1 : page)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium">
                            {(page - 1) * ITEMS_PER_PAGE + 1}
                        </span>{' '}
                        to{' '}
                        <span className="font-medium">
                            {page * ITEMS_PER_PAGE > totalItems ? totalItems : page * ITEMS_PER_PAGE}
                        </span>{' '}
                        of <span className="font-medium">{totalItems}</span> results
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <div
                            onClick={() => handlePage(page > 1 ? page - 1 : page)}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </div>

                        {pageNumbers.map((number, index) => (
                            <div
                                key={index}
                                onClick={() => typeof number === 'number' && handlePage(number)}
                                className={`relative cursor-pointer z-10 inline-flex items-center ${number === page
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-400'
                                    } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            >
                                {number}
                            </div>
                        ))}

                        <div
                            onClick={() => handlePage(page < totalPages ? page + 1 : page)}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}