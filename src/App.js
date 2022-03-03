import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const topFive = (file) => {
    const occurrences = {};

    var lines = file.split("\n");
    for (var i = 0; i < lines.length; i++) {
      if (lines[i] in occurrences) {
        occurrences[lines[i]]++;
      } else {
        occurrences[lines[i]] = 1;
      }
    }

    var vals = Object.keys(occurrences).map((key) => {
      return [key];
    });

    vals.sort((first, second) => {
      return second[1] - first[1];
    });

    return vals.slice(0, 5);
  };

  const handleFileChosen = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setItems(topFive(e.target.result));
    };
    fileReader.readAsText(file);
  };

  return (
    <>
      <h1>Please upload a text file</h1>
      <div className='upload-expense'>
        <input
          type='file'
          id='file'
          className='input-file'
          accept='.txt'
          onChange={(e) => handleFileChosen(e.target.files[0])}
        />
      </div>
      <h2>Result:</h2>
      <div>
        <ul style={{ listStyleType: "none" }}>
          {items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
