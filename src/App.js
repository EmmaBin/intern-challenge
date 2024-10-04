import { useState } from 'react';
import imageData from './image_data.json'

function App() {
  const [formData, setFormData] = useState('');
  const [response, setResponse] = useState('');

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
    <div className="App">
      <h1>DroneDeploy Challenge</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='question'>Ask a question:</label>
        <input
          type="text"
          className="question"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
          placeholder='What is the altitude of the second image?'
          required
        />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div className="response">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}


      <h2>Drone Data Cards</h2>
      <div>
        {(
          imageData.map((data, index) => (
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