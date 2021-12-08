import React from "react";
import AsyncSelect from "react-select/async";
import debounce from "lodash.debounce";

export const InputAutocomplete = ({ handleChange, inputValue, api, name }) => {
  const search = async (query) => {
    const result = await api({ query });

    return [...result];
  };

  const _loadSuggestions = (query, callback) => {
    search(query).then((result) => callback(result));
  };

  const loadSuggestions = debounce(_loadSuggestions, 300);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadSuggestions}
      name={name}
      styles={{
        control: (provided) => ({
          ...provided,
          border: "1px solid #ced4da",
          borderRadius: "0.25rem",
          boxShadow: "none",
        }),
      }}
      value={inputValue}
      onChange={handleChange}
    />
  );
};
