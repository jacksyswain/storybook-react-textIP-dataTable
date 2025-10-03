import React, { useMemo, useState } from 'react';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return data;
    const key = col.dataIndex as keyof T;
    const copied = [...data];
    copied.sort((a, b) => {
      const av = a[key] as any;
      const bv = b[key] as any;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') return av - bv;
      return String(av).localeCompare(String(bv));
    });
    if (sortDir === 'desc') copied.reverse();
    return copied;
  }, [data, sortKey, sortDir, columns]);

  const toggleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return;
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const toggleRow = (row: T) => {
    const id = row.id ?? JSON.stringify(row);
    const newSet = new Set(selected);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelected(newSet);
    if (onRowSelect) {
      const selectedRows = data.filter((d) => newSet.has(d.id ?? JSON.stringify(d)));
      onRowSelect(selectedRows);
    }
  };

  const isEmpty = !loading && (!data || data.length === 0);

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            {selectable && <th className="px-4 py-2 text-left">Select</th>}
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                <button
                  onClick={() => toggleSort(col.key, col.sortable)}
                  className="flex items-center gap-2"
                  aria-label={`Sort by ${col.title}`}
                >
                  {col.title}
                  {col.sortable && sortKey === col.key && (
                    <span className="text-xs">{sortDir === 'asc' ? '↑' : '↓'}</span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {loading && (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-4 text-center">
                Loading...
              </td>
            </tr>
          )}

          {isEmpty && (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-10 text-center text-sm text-gray-500">
                No data available
              </td>
            </tr>
          )}

          {!loading && !isEmpty && sorted.map((row, idx) => (
            <tr key={(row.id ?? idx) as React.Key} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              {selectable && (
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selected.has(row.id ?? JSON.stringify(row))}
                    onChange={() => toggleRow(row)}
                    aria-label={`Select row ${idx + 1}`}
                  />
                </td>
              )}

              {columns.map((c) => (
                <td key={c.key as string} className="px-6 py-4 whitespace-nowrap text-sm">
                  {c.render ? c.render((row as any)[c.dataIndex], row) : String((row as any)[c.dataIndex] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
