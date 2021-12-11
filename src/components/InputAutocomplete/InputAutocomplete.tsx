import React from "react";
import AsyncSelect from "react-select/async";
import debounce from "lodash.debounce";

interface IInputAutocomplete {
  handleChange: (value: any) => void;
  placeholder?: string;
  inputValue: string | { label: string; value: string };
  api: ({ query }) => Promise<any>;
  name: string;
}

export const InputAutocomplete = ({
  handleChange,
  inputValue,
  api,
  name,
  placeholder,
}: IInputAutocomplete) => {
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
      placeholder={placeholder}
      styles={{
        container: (provided) => ({
          ...provided,
          width: "100%",
        }),
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
