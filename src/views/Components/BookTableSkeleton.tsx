
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export const BookTableSkeleton: React.FC = () => {
  // Generate 5 skeleton rows
  const skeletonRows = Array(5).fill(0).map((_, index) => (
    <tr key={index} className="border-b">
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-3/4" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-1/2" />
      </td>
      <td className="px-6 py-4 hidden md:table-cell">
        <Skeleton className="h-4 w-1/3" />
      </td>
      <td className="px-6 py-4 hidden sm:table-cell">
        <Skeleton className="h-4 w-16" />
      </td>
      <td className="px-6 py-4 hidden lg:table-cell">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2 justify-end">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Author</th>
            <th className="px-6 py-3 hidden md:table-cell">Genre</th>
            <th className="px-6 py-3 hidden sm:table-cell">Year</th>
            <th className="px-6 py-3 hidden lg:table-cell">Status</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {skeletonRows}
        </tbody>
      </table>
    </div>
  );
};
