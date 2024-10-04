import { useState, useEffect } from 'react';
import imageData from './image_data.json'

function App() {
  const [formData, setFormData] = useState('');
  const [response, setResponse] = useState('');
  const [sortedData, setSortedData] = useState(imageData)
  const [sortCriteria, setSortCriteria] = useState({
    field: '',
    lowToHigh: true
  })

  // This function is called when the user selects a sorting criteria and updates the sortedData
  function handleSort() {
    let data = [...imageData];

    if (sortCriteria.field) {

      data.sort((a, b) => {
        if (sortCriteria.field === 'altitude') {
          return sortCriteria.lowToHigh ? a.altitude_m - b.altitude_m : b.altitude_m - a.altitude_m;
        } else if (sortCriteria.field === 'battery') {
          return sortCriteria.lowToHigh ? a.battery_level_pct - b.battery_level_pct : b.battery_level_pct - a.battery_level_pct;
        } else if (sortCriteria.field === 'timestamp') {
          return sortCriteria.lowToHigh
            ? new Date(a.timestamp) - new Date(b.timestamp)
            : new Date(b.timestamp) - new Date(a.timestamp);
        }
        return 0;
      });

    }

    setSortedData(data);
  }
  useEffect(() => {
    handleSort();
  }, [sortCriteria]);



  async function handleSubmit(e) {
    e.preventDefault();
    try {

      const res = await fetch('http://127.0.0.1:5000/process-question', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: formData }),
      });

      const result = await res.json();
      console.log("here is result", result);
      setResponse(result.response);
      setFormData('');

    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="App" style={{ margin: "40px" }}>
      <h1>DroneDeploy Challenge</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='question'>Ask a question:</label>
        <input
          type="text"
          id="question"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
          placeholder='What is the altitude of the second image?'
          style={{ width: '50%' }}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <div className="response" style={{ border: '1px solid #ccc', padding: '16px', margin: '16px', minHeight: '100px' }}>
        <h2>Response:</h2>
        <p>{response ? response : 'Waiting for response...'}</p>
      </div>


      <h2>Filter and Sort Drone Data</h2>

      <div>
        <label htmlFor="sort">Sort By:</label>
        <select
          id="sort"
          value={sortCriteria.field}
          onChange={(e) =>
            setSortCriteria({ ...sortCriteria, field: e.target.value })
          }
        >
          <option value="" disabled>
            Select your option
          </option>
          <option value="altitude">Altitude</option>
          <option value="battery">Battery Level</option>
          <option value="timestamp">Timestamp</option>
        </select>
      </div>

      <div>
        <label htmlFor="sortOrder">Sort Order:</label>
        <select
          id="sortOrder"
          value={sortCriteria.lowToHigh ? 'true' : 'false'}
          onChange={() =>
            setSortCriteria((prev) => ({
              ...prev,
              lowToHigh: !prev.lowToHigh,
            }))
          }
        >
          <option value="true">Low to High</option>
          <option value="false">High to Low</option>
        </select>
      </div>


      <h3>Drone Data Cards</h3>
      <div>
        {(
          sortedData.map((data, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '16px', margin: '16px' }}>
              <h3>Image ID: {data.image_id}</h3>
              <p><strong>Timestamp:</strong> {data.timestamp}</p>
              <p><strong>Latitude:</strong> {data.latitude}</p>
              <p><strong>Longitude:</strong> {data.longitude}</p>
              <p><strong>Altitude (m):</strong> {data.altitude_m}</p>
              <p><strong>Battery Level (%):</strong> {data.battery_level_pct}</p>
              <p><strong>Tags:</strong> {data.image_tags.join(', ')}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default App;