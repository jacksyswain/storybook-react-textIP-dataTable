import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import { DataTable } from "../components/DataTable";

export default function App() {
  const [value, setValue] = useState("");
  const [dark, setDark] = useState(false);

  const data = [
    { id: 1, name: "jps", age: 26, city: "Hyderabad" },
    { id: 2, name: "abhi", age: 34, city: "Bangalore" },
    { id: 3, name: "lmj", age: 29, city: "Delhi" },
  ];

  // Toggle `dark` class on <html>
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 max-w-4xl mx-auto space-y-6">
      {/* Header with toggle button */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">UI Components Demo</h1>
        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:opacity-80"
        >
          {dark ? " Light Mode" : " Dark Mode"}
        </button>
      </header>

      {/* Input field demo */}
      <div>
        <InputField
          label="Name"
          placeholder="Enter name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          helperText="Type something"
          showClear
        />
      </div>

      {/* Data table demo */}
      <div>
        <DataTable
          data={data}
          columns={[
            { key: "name", title: "Name", dataIndex: "name", sortable: true },
            { key: "age", title: "Age", dataIndex: "age", sortable: true },
            { key: "city", title: "City", dataIndex: "city" },
          ]}
          selectable
          onRowSelect={(rows) => console.log("selected", rows)}
        />
      </div>
    </div>
  );
}
