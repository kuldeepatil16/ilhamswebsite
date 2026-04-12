"use client";

﻿interface DataTableProps<T extends Record<string, unknown>> {
  rows: T[];
  columns: { key: keyof T; label: string }[];
}

export default function DataTable<T extends Record<string, unknown>>({ rows, columns }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} className="px-3 py-2 text-left font-semibold text-slate-700">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-slate-100">
              {columns.map((column) => (
                <td key={String(column.key)} className="px-3 py-2 text-slate-700">
                  {String(row[column.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
