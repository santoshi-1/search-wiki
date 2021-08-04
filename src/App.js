import axios from "axios";
import React, { useEffect, useState } from "react";
import Autocomplete from "react-autocomplete";
import { useDebounce, useSearch } from "./hooks";

function App() {
  const [value, setValue] = useState("");

  const { articles, status, error } = useSearch(useDebounce(value));

  return (
    <div className="App">
      <Autocomplete
        items={articles}
        shouldItemRender={(item, value) =>
          item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
        }
        getItemValue={(item) => item.label}
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
