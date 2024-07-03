// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';






function CrudPage() {

  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });

  useEffect(() => {
    // Fetch initial data from Django API
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/hello/');
      setMessage(response.data.message);
      const entriesResponse = await axios.get('/api/entries/');
      setEntries(entriesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/entries/', newEntry);
      setEntries([...entries, response.data]);
      setNewEntry({ title: '', content: '' }); // Clear the form fields
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };





  return (
    <div className="App">
      <h1>React + Django Trial Card</h1>
      <p>Message from Django: {message}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newEntry.content}
          onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
        />
        <button type="submit">Add Entry</button>
      </form>

      <h2>Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <strong>{entry.title}</strong>: {entry.content}
          </li>
        ))}
      </ul>


     
    </div>
  );
}

export default CrudPage;
