const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const cors = require('cors'); 
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect('mongodb+srv://kevork:123@cluster0.khomafv.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Link schema and model
const linkSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
});

const Link = mongoose.model('Link', linkSchema);

// Create a route to shorten URLs
app.post('/api/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();

  const newLink = new Link({
    originalUrl,
    shortUrl,
  });

  await newLink.save();

  res.json(newLink);
});

// Create a route to redirect to the original URL
app.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    const link = await Link.findOne({ shortUrl });
  
    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }
  
    res.redirect(link.originalUrl);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
