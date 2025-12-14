"use client";

import * as Select from "@radix-ui/react-select";
import { useState } from "react";

const options = [
  { value: "apple", label: "Apple 🍎" },
  { value: "banana", label: "Banana 🍌" },
  { value: "cherry", label: "Cherry 🍒" },
  { value: "grape", label: "Grape 🍇" },
];

export default function SearchableSelect() {
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-51">
    <Select.Root>
      <Select.Trigger className="px-3 py-2 border rounded w-[200px]">
        <Select.Value placeholder="Select a fruit..." />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-white border rounded shadow-lg">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 py-1 border rounded"
            />
          </div>

          <Select.Viewport>
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-gray-500">No results</div>
            ) : (
              filteredOptions.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <Select.ItemText>{opt.label}</Select.ItemText>
                </Select.Item>
              ))
            )}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
    </div>
  );
}