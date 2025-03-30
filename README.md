
### `README.md`

```markdown
# Sentiment Analysis Dashboard

A full-stack web application for analyzing text sentiment using a React frontend and a Node.js backend with MongoDB. The sentiment analysis is powered by Hugging Face's `cardiffnlp/twitter-roberta-base-sentiment` model, which classifies text as Positive, Negative, or Neutral.

## Features
- User authentication (register/login).
- Real-time sentiment analysis of text input.
- History of past analyses with a confidence trend chart.
- Responsive UI built with React and Chart.js.

## Project Structure
```
sentiment-analysis-dashboard/
├── server/                 # Backend (Node.js, Express, MongoDB)
│   ├── index.js            # Entry point
│   ├── routes/
│   │   └── api.js          # API routes
│   ├── models/
│   │   └── User.js         # MongoDB user schema
│   └── package.json
├── client/
│   └── sentimental_analysis/  # Frontend (React)
│       ├── src/
│       │   ├── components/
│       │   │   ├── Login.js
│       │   │   ├── Register.js
│       │   │   └── Dashboard.js
│       │   ├── App.js
│       │   ├── App.css
│       │   ├── index.js
│       │   └── index.css
│       ├── public/
│       │   ├── index.html
│       │   └── manifest.json
│       └── package.json
├── .gitignore              # Git ignore file
└── README.md               # This file
```

## Prerequisites
- **Node.js**: v14.x or higher ([Download](https://nodejs.org/)).
- **MongoDB**: Local instance or cloud (e.g., MongoDB Atlas).
- **Git**: For cloning the repo ([Install](https://git-scm.com/)).
- **Hugging Face API Key**: Sign up at [huggingface.co](https://huggingface.co) and get an API key.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Riyash1405/sentiment-analysis-dashboard.git
cd sentiment-analysis-dashboard
```

### 2. Backend Setup
1. **Navigate to the backend folder**:
   ```bash
   cd server
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Create a `.env` file** in `server/`:
   ```plaintext
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/sentiment_db  # Replace with your MongoDB URI
   JWT_SECRET=your-secret-key                       # Replace with a secure secret
   HF_API_KEY=your-huggingface-api-key              # Replace with your Hugging Face API key
   ```
   - Get `MONGO_URI` from MongoDB Atlas or your local MongoDB setup.
   - Generate a secure `JWT_SECRET` (e.g., a random string).
   - Obtain `HF_API_KEY` from [Hugging Face](https://huggingface.co/settings/tokens).
4. **Start the backend**:
   ```bash
   node index.js
   ```
   - The server runs on `http://localhost:5000`.

### 3. Frontend Setup
1. **Navigate to the frontend folder** (open a new terminal)**:
   ```bash
   cd client/sentimental_analysis
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the frontend**:
   ```bash
   npm start
   ```
   - The app opens at `http://localhost:3000`.

### 4. Verify
- Ensure both backend (`http://localhost:5000`) and frontend (`http://localhost:3000`) are running.
- Visit `http://localhost:3000` in your browser.

## Usage
1. **Register**: Create an account at `http://localhost:3000/register`.
2. **Login**: Sign in at `http://localhost:3000`.
3. **Analyze Sentiment**:
   - Go to the dashboard (`/dashboard`).
   - Enter text in the textarea and click "Analyze".
   - View the sentiment (Positive, Negative, or Neutral) with confidence percentage.
4. **History**: See past analyses and a confidence trend chart.

## Example Inputs
- **Positive**: "I’m so excited about this!" (Expect > 70% Positive)
- **Negative**: "This is absolutely terrible." (Expect > 70% Negative)
- **Neutral**: "The meeting is scheduled for tomorrow." (Expect Neutral or < 70% forced Neutral)

## Notes
- **Secrets**: The `.env` file is not included in the repo for security. Create it manually as shown above.
- **Threshold**: The frontend adjusts sentiment to "Neutral" if confidence is < 70%, otherwise uses the backend’s prediction.

## Troubleshooting
- **Backend fails**: Check MongoDB connection and `.env` values.
- **Frontend errors**: Ensure the backend is running and API endpoints are accessible.
- **CORS issues**: Verify `server/index.js` has proper CORS setup.

## Contributing
1. Fork the repo.
2. Create a branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your feature"`.
4. Push: `git push origin feature/your-feature`.
5. Open a pull request.

## License
MIT License - see [LICENSE](LICENSE) file (if added).

## Author
- GitHub: [Riyash1405](https://github.com/Riyash1405)
```

---

### How to Add This to Your Repo

1. **Create the File Locally**:
   - In `D:\FullStack\sentiment-analysis-dashboard`, create a file named `README.md`.
   - Copy and paste the content above into `README.md` using a text editor (e.g., VS Code, Notepad).

2. **Commit and Push**:
   - Assuming you’ve resolved the `.env` issue from the previous step:
     ```bash
     cd D:\FullStack\sentiment-analysis-dashboard
     git add README.md
     git commit -m "Add README with project details and setup instructions"
     git push origin main
     ```

3. **Verify on GitHub**:
   - Visit `https://github.com/Riyash1405/sentiment-analysis-dashboard`.
   - The README should appear on the main page, nicely formatted.

---

### Customization Notes
- **MongoDB URI**: Replace `mongodb://localhost:27017/sentiment_db` with your actual MongoDB connection string if using a cloud service like MongoDB Atlas.
- **Secrets**: Ensure users know to replace placeholder values in `.env`.
- **License**: If you haven’t added a `LICENSE` file, either remove the "License" section or add one (e.g., `echo "MIT License" > LICENSE` and commit it).
- **Screenshots**: Optionally, add screenshots (e.g., of the dashboard) by uploading images to the repo and linking them in the README with `![Screenshot](path/to/image.png)`.



