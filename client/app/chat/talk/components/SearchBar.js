import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Call the onSearch callback function with the current query value
    onSearch(value);
  };

  return (
    <div className='max-w-full flex justify-center items-center flex-row ml-2'>
      <input
        type="text"
        placeholder="Search..."
        className='w-[30em] border border-gray-300 rounded-xl px-4 py-2 mr-2 text-black'
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
