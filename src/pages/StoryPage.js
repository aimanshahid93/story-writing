import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, List, ListItem } from '@mui/material';
import { useParams } from 'react-router-dom';

const StoryPage = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [newContribution, setNewContribution] = useState('');

  useEffect(() => {
    // Fetch story details
    fetch(`http://localhost:5000/stories/${storyId}`)
      .then(response => response.json())
      .then(data => setStory(data))
      .catch(error => console.error('Failed to fetch:', error));
  }, [storyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/stories/${storyId}/contributions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ contribution: newContribution }),
      });
      if (response.ok) {
        // Fetch the updated story
        const updatedStory = await response.json();
        setStory(updatedStory);
        setNewContribution('');
      } else {
        console.error('Failed to add contribution:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  if (!story) return <p>Loading...</p>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {story.title}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {story.firstSentence}
      </Typography>
      <List>
        {story.contributions.map((contribution, index) => (
          <ListItem key={index}>{contribution}</ListItem>
        ))}
      </List>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Add your contribution"
          fullWidth
          margin="normal"
          value={newContribution}
          onChange={(e) => setNewContribution(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Contribution
        </Button>
      </form>
    </Container>
  );
};

export default StoryPage;
