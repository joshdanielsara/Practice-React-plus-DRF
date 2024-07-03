import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Items() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items/');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/api/items/${editId}/`, { name, description });
      } else {
        await axios.post('/api/items/', { name, description });
      }
      setName('');
      setDescription('');
      setEditId(null);
      fetchItems();
    } catch (error) {
      console.error('Error submitting item:', error);
    }
  };
  

  const handleEdit = (item) => {
    setName(item.name);
    setDescription(item.description);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/items/${id}/`);
    fetchItems();
  };

  return (
    <div>
      <h1>Items</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">{editId ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Items;
