# AI-Based Software Application Planner 🚀

<div align="center">

![Project Banner](https://img.shields.io/badge/AI--Based-Software%20Planner-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-orange)

A powerful web-based platform that helps developers and startups plan their software projects using artificial intelligence. Generate comprehensive project plans, architecture diagrams, and detailed insights with ease.

[Live Demo](https://project-planner-ten-mu.vercel.app) | [Backend API](https://planner-hot9.onrender.com)

</div>

## ✨ Features

- 🤖 **AI-Powered Planning**: Generate detailed project insights using a combination of:
  - Custom ML model for tech stack recommendations
  - OpenAI's GPT-4 for comprehensive project analysis
- 📊 **Comprehensive Analysis**: Get detailed breakdowns of:
  - Project roadmap and phases
  - System architecture with Mermaid diagrams
  - Development timeline
  - Technology stack recommendations (ML-powered)
  - Cost breakdown and budget allocation
  - Team structure and roles
  - Risk assessment and mitigation strategies

- 📱 **Modern UI/UX**: Built with React, Tailwind CSS, and Framer Motion
- 🔄 **Real-time Updates**: Save and restore project data
- 📤 **Export Options**: Export project plans as JSON or PDF
- 🔒 **Secure**: Built-in authentication and data protection

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Shadcn UI components
- OpenAI API integration

### Backend
- Flask (Python) for ML model serving
- Node.js + Express for main API
- MongoDB for data storage
- TypeScript for type safety
- RESTful API architecture

### ML Model
- Scikit-learn for tech stack prediction
- TF-IDF Vectorization
- Random Forest Classifier
- Joblib for model persistence

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8 or higher
- MongoDB database
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kalangeyash/aibased-2.git
cd aibased-2
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Install Python dependencies
cd ../model
pip install -r requirements.txt
```

3. Set up environment variables:

Create `.env` files in both frontend and backend directories:

Frontend (.env):
```env
VITE_OPENAI_API_KEY=your_openai_api_key
```

Backend (.env):
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
```

4. Start the development servers:

```bash
# Start ML model server
cd model
python3 app.py

# Start backend server (in a new terminal)
cd backend
npm run dev:server

# Start frontend server (in a new terminal)
cd frontend
npm run dev
```

## 📁 Project Structure

```
aibased-2/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/       # React context providers
│   │   ├── lib/          # Utility functions and API clients
│   │   ├── pages/        # Page components
│   │   └── types/        # TypeScript type definitions
│   └── public/           # Static assets
├── backend/
│   ├── src/
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   └── server.ts     # Express server setup
│   └── package.json
├── model/
│   ├── app.py           # Flask server for ML model
│   ├── model.py         # ML model training script
│   ├── BE-P.csv         # Training data
│   └── requirements.txt # Python dependencies
└── README.md
```

## 🔑 Key Features in Detail

### ML-Powered Tech Stack Recommendations
- Custom-trained machine learning model
- TF-IDF based text analysis
- Project-specific technology recommendations
- Separate frontend, backend, database, and DevOps suggestions

### Project Planning
- AI-generated project insights
- Detailed phase breakdowns
- Task dependencies and timelines
- Resource allocation
- Risk assessment

### Architecture Design
- System component visualization
- Mermaid diagram generation
- Technology stack recommendations
- Infrastructure planning

### Cost Analysis
- Development cost breakdown
- Infrastructure costs
- Maintenance estimates
- Contingency planning

### Team Planning
- Role definitions
- Team structure
- Resource allocation
- Skill requirements

## 📝 API Documentation

### Endpoints

#### ML Model API
- `POST /api/tech-stack` - Get ML-powered tech stack recommendations

#### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

#### Project Data
- `POST /api/projects/save` - Save project data
- `GET /api/projects/:id/restore` - Restore project data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Scikit-learn for ML capabilities
- All contributors who have helped shape this project
- Our Contributors are Kamna Bhadoriya, Subodh Ghonge, Aryan Kadam & Yash Kalange

## 📞 Support

For support, email yashkalange127@gmail.com or open an issue in the repository.

---

<div align="center">
Made with ❤️ by the AI-Based Software Application Planner Team
</div> 