import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const apiKey = "AIzaSyAQBMQmXMEVQpVpb1rOHhbM9woznKoArGk"; // Remplace par ta clé API
  const sheetID = "1eZbEU8fN1EbWax6xpqiA1EmsNhTVuI4lhqWcHGmGCmI";
  const range = "Feuille1!A1:C10"; // Remplace par ton range

  useEffect(() => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        if (result.values) {
          setData(result.values);
        }
      })
      .catch((error) => console.error("Erreur de chargement:", error));
  }, []);

  return (
    <div>
      <h1>DHT registrer de naly </h1>
      <table border="1">
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
