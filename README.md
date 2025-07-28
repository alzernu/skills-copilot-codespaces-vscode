# Notion AI Replica

A comprehensive enterprise-grade application that replicates the core features of Notion AI, integrated with both OpenAI's ChatGPT and Google's Gemini APIs.

## 🚀 Features

### Core Functionality
- **Rich Text Editor**: Notion-like block-based editor with slash commands and markdown support
- **AI Integration**: Dual AI model support (OpenAI GPT & Google Gemini)
- **Real-time AI Assistance**: Generate, summarize, translate, and answer questions
- **Enterprise Features**: User authentication, workspace management, and API key management

### AI-Powered Capabilities
- **Text Generation**: Create content based on prompts
- **Summarization**: Automatically summarize long documents
- **Translation**: Translate text into different languages
- **Q&A**: Ask questions about document content
- **Model Selection**: Switch between OpenAI and Gemini models

### Enterprise Features
- **User Authentication**: Secure login and registration system
- **Workspace Management**: Create and manage team workspaces
- **API Key Management**: Securely store and manage AI service API keys
- **Team Collaboration**: Add members to workspaces

## 🏗️ Architecture

```
├── frontend/          # React TypeScript application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor/     # Rich text editor components
│   │   │   ├── AI/         # AI integration components
│   │   │   ├── Auth/       # Authentication components
│   │   │   ├── Workspace/  # Workspace management
│   │   │   └── Layout/     # Layout components
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── package.json
├── backend/           # Node.js Express API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   └── services/       # Business logic services
│   └── package.json
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication
- **Slate.js** for rich text editing

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **OpenAI API** for ChatGPT integration
- **Google Generative AI** for Gemini integration
- **JWT** for authentication
- **bcryptjs** for password hashing
- **SQLite** for data storage (development)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (optional)
- Google Gemini API key (optional)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd notion-ai-replica
```

### 2. Backend Setup
```bash
cd backend
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your API keys
nano .env
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Environment Configuration

#### Backend (.env)
```env
PORT=3001
JWT_SECRET=your-jwt-secret-key-here
OPENAI_API_KEY=your-openai-api-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```

#### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:3001/api
```

## 🚀 Running the Application

### Development Mode

#### Start the Backend
```bash
cd backend
npm run dev
```

#### Start the Frontend
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Production Build

#### Build the Frontend
```bash
cd frontend
npm run build
```

#### Build the Backend
```bash
cd backend
npm run build
npm start
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Document Endpoints
- `GET /api/documents` - Get all documents
- `POST /api/documents` - Create document
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document

### AI Endpoints
- `POST /api/ai/generate` - Generate text
- `POST /api/ai/summarize` - Summarize text
- `POST /api/ai/translate` - Translate text
- `POST /api/ai/qa` - Ask questions

### Workspace Endpoints
- `GET /api/workspace` - Get workspaces
- `POST /api/workspace` - Create workspace
- `PUT /api/workspace/:id` - Update workspace
- `DELETE /api/workspace/:id` - Delete workspace

## 🎯 Usage Guide

### Getting Started
1. **Register**: Create a new account or login with existing credentials
2. **Configure APIs**: Add your OpenAI and/or Gemini API keys in workspace settings
3. **Create Content**: Use the rich text editor with slash commands
4. **AI Assistance**: Leverage AI features for content generation and analysis

### Editor Features
- Type `/` to open the slash command menu
- Support for headings, paragraphs, quotes, and code blocks
- Real-time AI assistance panel
- Markdown shortcuts

### AI Features
- **Generate**: Create content from prompts
- **Summarize**: Get concise summaries of long text
- **Translate**: Convert text to different languages
- **Q&A**: Ask questions about your content

### Workspace Management
- Create multiple workspaces for different projects
- Invite team members to collaborate
- Manage API keys securely per workspace

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Secure API key storage
- CORS protection
- Input validation and sanitization

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚢 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment
1. Build both frontend and backend
2. Configure environment variables for production
3. Deploy to your preferred hosting platform
4. Ensure secure API key management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for ChatGPT API
- Google for Gemini API
- Notion for inspiration
- React and Node.js communities

## 📞 Support

For support, email support@your-domain.com or create an issue in the repository.

## 🗺️ Roadmap

- [ ] Real-time collaboration
- [ ] Advanced formatting options
- [ ] Plugin system
- [ ] Mobile application
- [ ] Advanced AI model fine-tuning
- [ ] Enterprise SSO integration
- [ ] Advanced analytics and reporting