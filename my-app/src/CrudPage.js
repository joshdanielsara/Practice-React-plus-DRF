import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './crudPageStyles.css'; // Import the CSS file

function CrudPage() {
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchUsername(); // Fetch username when component mounts
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

  const fetchUsername = async () => {
    try {
      const response = await axios.get('/api/login/'); // Replace with your actual endpoint
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/entries/', newEntry);
      setEntries([...entries, response.data]);
      setNewEntry({ title: '', content: '' });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh');
      await axios.post('/api/logout/', { refresh: refreshToken });
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="main">
      <h1>React + Django Trial Card</h1>
      <p>Message from Django: {message}</p>
      <p>Welcome, {username}!</p> {/* Display username here */}

      <button onClick={handleLogout}>Logout</button> {/* Logout button */}

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
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.title}</td>
                <td>{entry.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CrudPage;
