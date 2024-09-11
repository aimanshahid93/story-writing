// src/pages/CompletedStoriesPage.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CompletedStoriesPage = () => {
  const [completedStories, setCompletedStories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/completed-stories')
      .then(response => response.json())
      .then(data => setCompletedStories(data))
      .catch(error => console.error('Failed to fetch completed stories:', error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Completed Stories
      </Typography>
      {completedStories.length === 0 ? (
        <Typography>No completed stories available.</Typography>
      ) : (
        completedStories.map((story) => (
          <Box key={story.id} sx={{ marginBottom: 2 }}>
            <Card>
              <CardContent>
                <Typography variant="h5">{story.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {story.firstSentence.length > 100
                    ? story.firstSentence.substring(0, 100) + '...'
                    : story.firstSentence}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/story/${story.id}`}>
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))
      )}
    </Container>
  );
};

export default CompletedStoriesPage;
