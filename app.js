const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = 3000;

// Initialize the Supabase client with hardcoded URL and Key
const supabase = createClient(
  'https://tuoqrdshvtjfdpeocevy.supabase.co', // Your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1b3FyZHNodnRqZmRwZW9jZXZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyNjE1NzIsImV4cCI6MjAxNzgzNzU3Mn0.PSlrPE9OzJ7kkiYt91n6sPvMSn-hPDAMwe_IqbHoVxU' // Your Supabase Key
);

// Use the cors middleware to enable CORS
app.use(cors());

// Parse JSON bodies for this app.
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Supabase API Server');
});

// Endpoint to get all records from the Supabase table
app.get('/data', async (req, res) => {
  const { data, error } = await supabase
    .from('AQI_LAT_LONG')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
