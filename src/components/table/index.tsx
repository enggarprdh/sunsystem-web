import { useState, useEffect, useMemo } from "react";
import { Pagination } from "./pagination";

type TableProps = {
    columns?: { header: string; 
                accessorKey: string, 
                type:string | "text" | "number" | "date" | "boolean" | "button", 
                headerAlign?: string | "left" | "center" | "right";
                cell:any }[]; // Define the structure of your columns
    data?: any[]; // You can define a more specific type for your data
    onRowClick?: (row: any) => void;
    onRowMenuClick?: (row: any, event: React.MouseEvent) => void;
    showContactDetails?: boolean; // Display contact information with avatar and email
    // Pagination props
    pagination?: boolean;
    paginationType?: "client" | "server";
    pageSize?: number;
    pageSizeOptions?: number[];
    currentPage?: number;
    totalItems?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    isLoading?: boolean;
    // Optional prop for header alignment
}

const Table = ({ 
    columns = [], 
    data = [], 
    onRowClick,
    // Pagination props
    pagination = false,
    paginationType = "client",
    pageSize: initialPageSize = 10,
    pageSizeOptions = [10, 20, 30, 50, 100],
    currentPage: controlledCurrentPage,
    totalItems: controlledTotalItems,
    onPageChange,
    onPageSizeChange,
    isLoading = false
}: TableProps) => {
    // State for client-side pagination
    const [clientCurrentPage, setClientCurrentPage] = useState(1);
    const [clientPageSize, setClientPageSize] = useState(initialPageSize);

    // Reset page when data changes (for client-side)
    useEffect(() => {
        if (paginationType === "client") {
            setClientCurrentPage(1);
        }
    }, [data]);

    // Handle page change
    const handlePageChange = (page: number) => {
        if (paginationType === "client") {
            setClientCurrentPage(page);
        } else if (onPageChange) {
            onPageChange(page);
        }
    };

    // Handle page size change
    const handlePageSizeChange = (newPageSize: number) => {
        if (paginationType === "client") {
            setClientPageSize(newPageSize);
            setClientCurrentPage(1); // Reset to first page on page size change
        } else if (onPageSizeChange) {
            onPageSizeChange(newPageSize);
        }
    };

    // Calculate pagination values based on type
    const {
        currentPage,
        pageSize,
        totalItems,
        paginatedData
    } = useMemo(() => {
        if (paginationType === "client") {
            // For client-side pagination
            const start = (clientCurrentPage - 1) * clientPageSize;
            const end = start + clientPageSize;
            
            return {
                currentPage: clientCurrentPage,
                pageSize: clientPageSize,
                totalItems: data.length,
                paginatedData: pagination ? data.slice(start, end) : data
            };
        } else {
            // For server-side pagination
            return {
                currentPage: controlledCurrentPage || 1,
                pageSize: initialPageSize,
                totalItems: controlledTotalItems || data.length,
                paginatedData: data // Data is already paginated by server
            };
        }
    }, [
        paginationType, 
        clientCurrentPage, 
        clientPageSize, 
        data, 
        controlledCurrentPage, 
        controlledTotalItems,
        initialPageSize, 
        pagination
    ]);

    const renderCellType = (type: string, value: any, row: any, cell:any) => {
        switch (type) {
            case "text":
                return <span>{cell({row})}</span>;
            case "number":
                return <span>{cell({row})}</span>;
            case "date":
                return <span>{cell({row})}</span>;
            case "boolean":
                return <span>{value ? "Yes" : "No"}</span>;            case "button":
                return (
                    <>{cell && typeof cell === 'function' ? cell({ row }) : null}</>
                );
            default:
                return <span>{value}</span>;
        }
    }

    const renderBody = (row:any, rowIndex:number) => {
        return (
            <tr key={rowIndex} 
                className="hover:bg-gray-50 dark:bg-zinc-900 dark:hover:bg-zinc-500 cursor-pointer"
                onClick={() => onRowClick && onRowClick(row)}>
                {columns.map((column, colIndex) => (
                    <td key={colIndex} className="p-3 text-sm text-black dark:text-white">
                        {renderCellType(column.type, row[column.accessorKey], row, column.cell)}
                    </td>
                ))}
            </tr>
        )
    }

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-full bg-white dark:bg-zinc-900">
                {/* Single table with sticky header */}
                <div className="min-w-full md:max-h-[calc(100vh-16rem)] xs:max-h-[calc(109vh-16rem)] overflow-y-auto">
                    <table className="min-w-full bg-white dark:bg-zinc-900 table-fixed">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-zinc-900/90 border-b border-gray-200 dark:border-zinc-700">
                                {columns.map((column, index) => (
                                    <th 
                                        key={index}
                                        className={`p-3 text-${!column.headerAlign? 'left' : column.headerAlign} font-medium text-gray-600 dark:text-white text-sm sticky top-0 bg-gray-50 dark:bg-zinc-900/90 z-10`}
                                    >
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((row, rowIndex) => (
                                    renderBody(row, rowIndex)
                                ))
                            ) : (
                                <tr>
                                    <td 
                                        colSpan={columns.length} 
                                        className="p-4 text-center text-sm text-gray-500 dark:text-gray-400"
                                    >
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Component */}
                {pagination && totalItems > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        onPageSizeChange={
                            (paginationType === "client" || onPageSizeChange) 
                                ? handlePageSizeChange 
                                : undefined
                        }
                        pageSizeOptions={pageSizeOptions}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </div>
    )
}

Table.displayName = "Table";

export { Table };