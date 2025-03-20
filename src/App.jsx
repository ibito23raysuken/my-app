import { useState, useEffect } from "react";
import { Sun, Moon, Menu } from "lucide-react";

function App() {
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const apiKey = "AIzaSyAQBMQmXMEVQpVpb1rOHhbM9woznKoArGk"; // Remplace par ta clé API
  const sheetID = "1eZbEU8fN1EbWax6xpqiA1EmsNhTVuI4lhqWcHGmGCmI";
  const range = "Feuille1!A1:C10"; // Remplace par ton range

  useEffect(() => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        if (result.values) {
          const formattedData = result.values.map((row) => {
            return row.map((cell, index) => {
              if (index === 0 && !isNaN(Date.parse(cell))) {
                const date = new Date(cell);
                return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
              }
              return cell;
            });
          });
          setData(formattedData);
        }
      })
      .catch((error) => console.error("Erreur de chargement:", error));
  }, []);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-black text-white">
        <div className="text-xl font-bold">DHT Register</div>
        <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="w-6 h-6 cursor-pointer" />
        </div>
        <ul className="hidden md:flex space-x-6">
          <li className="cursor-pointer">Gestion de Module</li>
          <li className="cursor-pointer">About</li>
          <li>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-gray-800 rounded-full"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-white" />}
            </button>
          </li>
        </ul>
      </nav>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white p-4 space-y-4">
          <div className="cursor-pointer">Gestion de Module</div>
          <div className="cursor-pointer">About</div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-800 rounded-full w-full flex justify-center"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-white" />}
          </button>
        </div>
      )}

      {/* Tableau centré */}
      <div className="flex justify-center items-center min-h-[80vh]">
        <table className="border-collapse border border-gray-500 w-3/4 text-center">
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className={index === 0 ? "bg-gray-700 text-white" : "bg-gray-300"}>
                {row.map((cell, i) => (
                  <td key={i} className="border border-gray-600 p-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;