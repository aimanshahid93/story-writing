const API_URL = 'http://localhost:5000';

export const fetchStories = async () => {
  const response = await fetch(`${API_URL}/stories`);
  return response.json();
};

export const createStory = async (story) => {
  const response = await fetch(`${API_URL}/stories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(story),
  });
  return response.json();
};
