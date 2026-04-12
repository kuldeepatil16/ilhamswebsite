"use client";

interface DataTableProps<T extends Record<string, unknown>> {
  rows: T[];
  columns: { key: keyof T; label: string }[];
}

export default function DataTable<T extends Record<string, unknown>>({ rows, columns }: DataTableProps<T>) {
  return (
    <div className="ui-surface overflow-x-auto rounded-xl">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} className="ui-text px-3 py-2 text-left font-semibold">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="ui-border border-t">
              {columns.map((column) => (
                <td key={String(column.key)} className="ui-muted px-3 py-2">
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
