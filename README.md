# VP-ESR Room Booking System

A modern, responsive room booking application built with React and Node.js for managing conference room reservations. Features real-time availability, timeline views, and user-friendly booking management.

[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

## ✨ Features

- 🗓️ **Interactive Timeline View** - Visual booking calendar with drag-and-drop support
- 🏢 **Multiple Room Support** - ESR Room and VP Room management
- 👤 **User Management** - Personal booking dashboard and history
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Real-time Updates** - Live availability status
- 🔐 **Secure API** - RESTful backend with data validation
- 🐳 **Docker Ready** - Containerized deployment with Docker Compose

## 🏗️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Router** for navigation
- **Date-fns** for date manipulation

### Backend
- **Node.js** with Express framework
- **MongoDB** with Mongoose ODM
- **CORS** enabled for cross-origin requests
- **Environment-based configuration**

### DevOps
- **Docker** containerization
- **nginx** reverse proxy
- **Multi-stage builds** for optimization

## 🚀 Quick Start

### Local Development

#### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or cloud)
- Git

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/VP-ESR.git
cd VP-ESR
```

#### 2. Backend Setup
```bash
cd backend
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env with your MongoDB URI

# Start development server
npm run dev
```

#### 3. Frontend Setup
```bash
cd frontend
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env if needed (defaults to localhost:5001)

# Start development server
npm run dev
```

#### 4. Access the Application
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5001

### Docker Deployment

For containerized deployment:

#### Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+

#### Production Deployment
```bash
# Copy and configure environment
cp .env.example .env
# Edit .env with your production values

# Build and start all services
docker-compose build --no-cache
docker-compose up -d

# Verify deployment
docker-compose ps
docker-compose logs -f
```

#### Development with Docker
```bash
docker-compose -f docker-compose.dev.yml up -d
```

## 📁 Project Structure

```
VP-ESR/
├── backend/                    # Node.js API server
│   ├── controllers/           # Route controllers
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── service/              # Business logic
│   ├── app.js                # Express app setup
│   ├── index.js              # Server entry point
│   └── Dockerfile            # Backend container
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions
│   │   └── main.tsx          # React entry point
│   ├── public/               # Static assets
│   └── Dockerfile            # Frontend container
├── nginx/                     # Reverse proxy configuration
├── docker-compose.yml         # Production Docker setup
├── docker-compose.dev.yml     # Development Docker setup
└── README.md                  # This file
```

## � Configuration

### Environment Variables

#### Backend Configuration
Create `.env` file in the `backend/` directory:
```bash
PORT=5001
MONGODB_URI=mongodb://localhost:27017/vp-esr-booking
# For cloud MongoDB:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
NODE_ENV=development
```

#### Frontend Configuration  
Create `.env` file in the `frontend/` directory:
```bash
VITE_APP_API_PREFIX=http://localhost:5001
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/bookings` | Get all bookings |
| `POST` | `/api/bookings` | Create new booking |
| `DELETE` | `/api/bookings?_id={id}` | Delete booking |
| `GET` | `/api/bookings/myBookings` | Get user's bookings |

## 🎯 Usage

### Making a Booking
1. Select date from the calendar
2. Choose room (ESR Room or VP Room)
3. View available time slots in the timeline
4. Click "New Booking" to create a reservation
5. Fill in the booking form with your details
6. Submit to confirm the booking

### Managing Bookings
1. Click "My Bookings" to view your reservations
2. Use the cancel button to remove bookings
3. View booking details including time, room, and purpose

## 🔄 Development

### Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

### Adding New Features

#### Backend Changes
- Add routes in `backend/routes/`
- Add controllers in `backend/controllers/`
- Add models in `backend/models/`
- Update service logic in `backend/service/`

#### Frontend Changes
- Add components in `frontend/src/components/`
- Add pages in `frontend/src/pages/`
- Update routing if needed
- Add custom hooks in `frontend/src/hooks/`

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

## 📊 Monitoring & Maintenance

### Development
```bash
# View backend logs
cd backend && npm run dev

# View frontend logs  
cd frontend && npm run dev
```

### Docker Deployment
```bash
# View all service logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Check service status
docker-compose ps

# Restart services
docker-compose restart
```

## 🐛 Troubleshooting

### Common Issues

#### Connection Errors
```bash
# Check if services are running
npm run dev  # in respective directories

# For Docker
docker-compose ps
docker-compose logs service-name
```

#### Port Conflicts
```bash
# Check what's using the port
netstat -tulpn | grep :5001

# Change port in .env file if needed
PORT=5002
```

#### Database Connection Issues
```bash
# Verify MongoDB URI in backend/.env
# Check if MongoDB service is running
# Ensure network connectivity
```

#### Build Issues
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For Docker builds
docker-compose build --no-cache
```

## � Security Features

- **Input Validation**: Server-side validation for all API inputs
- **CORS Configuration**: Proper cross-origin request handling
- **Environment Variables**: Sensitive data stored in environment files
- **Error Handling**: Graceful error responses without data exposure
- **Health Checks**: Service monitoring endpoints

## 📈 Performance Optimizations

- **Code Splitting**: React lazy loading for optimal bundle size
- **Caching**: Static asset caching with proper headers
- **Compression**: Gzip compression in production
- **Database Indexing**: Optimized MongoDB queries
- **Docker Multi-stage Builds**: Minimal production images

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, questions, or contributions:

1. **Issues**: Create an issue on GitHub
2. **Documentation**: Check this README and inline comments
3. **Code Review**: All contributions welcome via pull requests

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Node.js](https://nodejs.org/) - Backend runtime
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Vite](https://vitejs.dev/) - Build tool

---

**Made with ❤️ for efficient room booking management**