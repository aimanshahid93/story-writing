// src/pages/CreateStoryPage.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

const CreateStoryPage = () => {
  const [title, setTitle] = useState('');
  const [firstSentence, setFirstSentence] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (!title || !firstSentence) {
      setError('Title and first sentence are required.');
      return;
    }

    fetch('http://localhost:5000/stories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        firstSentence,
        // Add any other required fields
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create story.');
        }
        return response.json();
      })
      .then(() => {
        // Clear the form and possibly redirect
        setTitle('');
        setFirstSentence('');
        setError('');
        // Redirect or display success message
      })
      .catch((error) => setError(error.message));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create a New Story
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="First Sentence"
          value={firstSentence}
          onChange={(e) => setFirstSentence(e.target.value)}
          margin="normal"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Create Story
        </Button>
      </form>
    </Container>
  );
};

export default CreateStoryPage;
