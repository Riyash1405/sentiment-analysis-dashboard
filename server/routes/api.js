const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const User = require('../models/User');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user: ' + error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in: ' + error.message });
  }
});

router.post('/analyze', authenticateToken, async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim().length === 0) return res.status(400).json({ message: 'Text is required' });

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment',
      { inputs: text },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );
    if (!Array.isArray(response.data) || !response.data[0]) {
      throw new Error('Invalid response from sentiment analysis API');
    }
    const result = response.data[0];
    const sentiment = result[0].label === 'LABEL_1' ? 'Neutral' :
                      result[0].label === 'LABEL_0' ? 'Negative' :
                      'Positive';
    const confidence = result[0].score;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.analyses.push({ text, sentiment, confidence });
    await user.save();

    res.json({ sentiment, confidence });
  } catch (error) {
    console.error('Analyze error:', error);
    res.status(500).json({ message: 'Error analyzing sentiment: ' + error.message });
  }
});

router.get('/history', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.analyses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history: ' + error.message });
  }
});

module.exports = router;