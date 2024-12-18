import React, { useState, useEffect } from "react";

const SearchBar = ({ options, onSelect, placeholder }) => {
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, options]);

  const handleSelect = (option) => {
    onSelect(option);
    setQuery(option.name); // Set the selected option in the input
    setFilteredOptions([]); // Hide suggestions after selection
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="p-2 border rounded-md w-full"
      />
      {filteredOptions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-md w-full mt-1 max-h-40 overflow-y-auto z-10">
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
