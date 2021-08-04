import React, { Children, useState } from "react";
import Autocomplete from "react-autocomplete";
import Input from "./components/Input";
import { useDebounce, useSearch } from "./hooks";

function App() {
  const [value, setValue] = useState("");

  const { articles, status, error } = useSearch(useDebounce(value, 100));

  return (
    <div className="App">
      <Autocomplete
        items={articles}
        getItemValue={(item) => item.label}
        renderInput={Input}
        inputProps={{ placeholder: "Input a Search Term" }}
        renderMenu={(Children, value, style) => (
          <div style={{ ...style }} className="input-suggestions">
            {Children}
            <a href={`/search?query=${value}`} className="search-link">
              See all Results
            </a>
          </div>
        )}
        renderItem={(item, highlighted) => (
          <div
            key={item.id}
            style={{ backgroundColor: highlighted ? "#eee" : "transparent" }}
          >
            {item.label}
          </div>
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSelect={(value) => setValue(value)}
      />
    </div>
  );
}

export default App;
