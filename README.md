# ValorByte Inventory Management System

A modern, full-stack inventory management system built with Laravel (backend) and React (frontend), featuring real-time updates, beautiful UI, and gRPC communication.

## 🚀 Features

### Frontend (React + TypeScript)
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Real-time Updates**: Optimistic updates for instant user feedback
- **Delete Confirmation**: Safe deletion with confirmation modals
- **Rarity System**: Color-coded item rarities (Common, Uncommon, Rare, Epic, Legendary)
- **Statistics Dashboard**: Overview of total items, quantities, and rarity distribution
- **Skeleton Loading**: Professional loading states
- **Form Validation**: Proper input validation and error handling

### Backend (Laravel + gRPC)
- **RESTful API**: Standard HTTP endpoints for CRUD operations
- **gRPC Server**: High-performance gRPC communication with RoadRunner
- **Event System**: Real-time events with RabbitMQ integration
- **Database**: SQLite with proper migrations and models
- **Caching**: Redis-based caching for improved performance
- **Type Safety**: PHP 8.2+ with strict typing

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌───────────────────┐
│  React Frontend │    │ Laravel Backend │    │   gRPC Server     │
│                 │    │                 │    │                   │
│ • TypeScript    │◄──►│ • REST API      │◄──►│ • RoadRunner      │
│ • Tailwind CSS  │    │ • Eloquent ORM  │    │ • gRPC Protocol   │
│ • Optimistic UI │    │ • Event System  │    │ • High Performance│
└─────────────────┘    └─────────────────┘    └───────────────────┘
```

## 📁 Project Structure

```
valorbyte-inventory/
├── backend/                 # Laravel backend
│   ├── app/
│   │   ├── Enums/          # ItemRarity enum
│   │   ├── Events/         # ItemAdded, ItemRemoved events
│   │   ├── Grpc/           # gRPC service implementations
│   │   ├── Http/Controllers/ # REST API controllers
│   │   ├── Models/         # Eloquent models
│   │   └── Services/       # Business logic services
│   ├── config/             # Laravel configuration
│   ├── database/           # Migrations and seeders
│   ├── protos/             # Protocol Buffer definitions
│   ├── routes/             # API routes
│   └── rr.yaml            # RoadRunner configuration
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── config/         # Configuration files
│   │   ├── pages/          # Page components
│   │   └── api/            # API client
│   └── public/             # Static assets
└── README.md              # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API communication

### Backend
- **Laravel 12** - PHP web framework
- **PHP 8.2+** - Modern PHP with strict typing
- **SQLite** - Lightweight database
- **RoadRunner** - High-performance PHP application server
- **gRPC** - High-performance RPC framework
- **RabbitMQ** - Message broker for events
- **Redis** - Caching and session storage

## 🚀 Setup Instructions

### Prerequisites

#### For Local Development
- **PHP 8.2+** with extensions: `curl`, `mbstring`, `openssl`, `pdo`, `tokenizer`, `xml`
- **Composer** - PHP dependency manager
- **Node.js 18+** - JavaScript runtime
- **npm** - Node package manager
- **RabbitMQ** - Message broker
- **Redis** - Caching and session storage

#### For Docker Development
- **Docker** - Container platform
- **Docker Compose** - Multi-container orchestration

---

## 🐳 Option 1: Docker Setup (Recommended)

### Quick Start with Docker
```bash
# Clone the repository
git clone <repository-url>
cd valorbyte-inventory

# Start all services with Docker Compose
docker-compose up -d

# The application will be available at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# gRPC Server: localhost:9001
# RabbitMQ Management: http://localhost:15672 (guest/guest)
```

### Docker Services
- **Frontend**: React development server (Port 3000)
- **Backend**: Laravel API server (Port 8000)
- **gRPC**: RoadRunner gRPC server (Port 9001)
- **RabbitMQ**: Message broker (Ports 5672, 15672)
- **Redis**: Caching service (Port 6379)
- **Database**: SQLite (or PostgreSQL for production)

### Docker Commands
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up -d --build

# Stop specific service
docker-compose stop frontend

# Restart specific service
docker-compose restart backend
```

### Docker Development Workflow
```bash
# 1. Start all services
docker-compose up -d

# 2. Run database migrations
docker-compose exec backend php artisan migrate

# 3. Generate application key
docker-compose exec backend php artisan key:generate

# 4. Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# gRPC Server: localhost:9001
```

---

## 💻 Option 2: Local Development Setup

### Step 1: Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install PHP dependencies**:
   ```bash
   composer install
   ```

3. **Environment configuration**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database setup**:
   ```bash
   php artisan migrate
   ```

5. **Start RabbitMQ** (choose one):
   ```bash
   # Option A: Using Docker
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
   
   # Option B: Using Homebrew (macOS)
   brew install rabbitmq
   brew services start rabbitmq
   
   # Option C: Using apt (Ubuntu/Debian)
   sudo apt-get install rabbitmq-server
   sudo systemctl start rabbitmq-server
   ```

6. **Start Redis** (choose one):
   ```bash
   # Option A: Using Docker
   docker run -d --name redis -p 6379:6379 redis:alpine
   
   # Option B: Using Homebrew (macOS)
   brew install redis
   brew services start redis
   
   # Option C: Using apt (Ubuntu/Debian)
   sudo apt-get install redis-server
   sudo systemctl start redis-server
   ```

7. **Start Laravel API server** (Terminal 1):
   ```bash
   php artisan serve
   # Server will run on http://localhost:8000
   ```

8. **Start gRPC server** (Terminal 2):
   ```bash
   ./rr.exe serve -c rr.yaml
   # gRPC server will run on localhost:9001
   ```

### Step 2: Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Start development server** (Terminal 3):
   ```bash
   npm run dev
   # Frontend will run on http://localhost:5173
   ```

### Step 3: Verify Setup

1. **Check all services are running**:
   - ✅ Frontend: http://localhost:5173
   - ✅ Backend API: http://localhost:8000
   - ✅ gRPC Server: localhost:9001
   - ✅ RabbitMQ Management: http://localhost:15672 (guest/guest)
   - ✅ Redis: localhost:6379

2. **Test the application**:
   - Open http://localhost:5173 in your browser
   - Try adding, editing, and deleting items
   - Check browser console for any errors

---

## 🔧 Service Management

### Starting Services (Local Development)

You need to run these commands in separate terminals:

```bash
# Terminal 1: Laravel API Server
cd backend
php artisan serve

# Terminal 2: gRPC Server
cd backend
./rr.exe serve -c rr.yaml

# Terminal 3: Frontend Development Server
cd frontend
npm run dev

# Terminal 4: RabbitMQ (if not using Docker)
# Follow RabbitMQ installation instructions above

# Terminal 5: Redis (if not using Docker)
# Follow Redis installation instructions above
```

### Stopping Services

```bash
# Stop Laravel server: Ctrl+C in Terminal 1
# Stop gRPC server: Ctrl+C in Terminal 2
# Stop Frontend server: Ctrl+C in Terminal 3

# Stop RabbitMQ
docker stop rabbitmq  # if using Docker
brew services stop rabbitmq  # if using Homebrew
sudo systemctl stop rabbitmq-server  # if using systemd

# Stop Redis
docker stop redis  # if using Docker
brew services stop redis  # if using Homebrew
sudo systemctl stop redis-server  # if using systemd
```

### Port Configuration

| Service | Port | Purpose |
|---------|------|---------|
| Frontend | 5173 | React development server |
| Backend API | 8000 | Laravel REST API |
| gRPC Server | 9001 | RoadRunner gRPC server |
| RabbitMQ | 5672 | AMQP message broker |
| RabbitMQ Management | 15672 | Web management interface |
| Redis | 6379 | Caching and sessions |

---

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Find process using port
   netstat -ano | findstr :8000  # Windows
   lsof -i :8000  # macOS/Linux
   
   # Kill process
   taskkill /PID <PID> /F  # Windows
   kill -9 <PID>  # macOS/Linux
   ```

2. **RabbitMQ connection failed**:
   - Ensure RabbitMQ is running
   - Check firewall settings
   - Verify credentials in `.env` file

3. **Redis connection failed**:
   - Ensure Redis is running
   - Check Redis configuration
   - Verify Redis is accessible on port 6379

4. **gRPC server not starting**:
   - Check if port 9001 is available
   - Verify `rr.yaml` configuration
   - Check PHP syntax in worker files

5. **Frontend not connecting to backend**:
   - Verify backend API is running on port 8000
   - Check CORS configuration
   - Ensure API base URL is correct in `frontend/src/api/items.ts`

### Environment Variables

Make sure your `.env` file in the backend directory contains:

```env
APP_NAME="ValorByte Inventory"
APP_ENV=local
APP_KEY=base64:your-generated-key
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=/path/to/your/database.sqlite

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
FILESYSTEM_DISK=local
QUEUE_CONNECTION=rabbitmq
SESSION_DRIVER=redis
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

RABBITMQ_HOST=127.0.0.1
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASSWORD=guest
RABBITMQ_VHOST=/
```

## 🌐 API Endpoints

### REST API (Laravel)
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item
- `PATCH /api/items/{id}/quantity` - Update item quantity
- `DELETE /api/items/{id}` - Delete item

### gRPC API
- `GetItemById` - Get item by ID (high-performance)

## 🔧 gRPC Server Testing

### Prerequisites for gRPC Testing
- **grpcurl** - Command-line tool for gRPC testing
- **Protocol Buffers** - For proto file compilation

### Install grpcurl
```bash
# Windows (using Chocolatey)
choco install grpcurl

# macOS (using Homebrew)
brew install grpcurl

# Linux
# Download from: https://github.com/fullstorydev/grpcurl/releases
```

### Start gRPC Server
```bash
cd backend
./rr.exe serve -c rr.yaml
```

### Test gRPC Service

1. **List available services:**
   ```bash
   grpcurl -plaintext localhost:9001 list
   ```

2. **List service methods:**
   ```bash
   grpcurl -plaintext localhost:9001 list inventory.ItemService
   ```

3. **Test GetItemById method:**
   ```bash
   grpcurl -plaintext -proto protos/item.proto -d '{"id": 1}' localhost:9001 inventory.ItemService.GetItemById
   ```

4. **Expected response:**
   ```json
   {
     "id": 1,
     "name": "Test Sword",
     "type": "weapon",
     "rarity": "common",
     "quantity": 1
   }
   ```

### gRPC Server Configuration

The gRPC server is configured in `rr.yaml`:
```yaml
grpc:
  listen: "tcp://0.0.0.0:9001"
  proto:
    - "protos/item.proto"
  workers:
    command: "php worker.php"
    pool:
      num_workers: 2
```

### gRPC Service Implementation

The gRPC service is implemented in:
- **Proto Definition**: `protos/item.proto`
- **Service Interface**: `app/Grpc/Generated/Inventory/ItemServiceInterface.php`
- **Service Implementation**: `app/Grpc/ItemServiceGrpc.php`
- **Worker Registration**: `worker.php`

### Troubleshooting gRPC Issues

1. **Server not starting:**
   - Check if port 9001 is available
   - Verify `rr.yaml` configuration
   - Check PHP syntax in worker files

2. **Method not found:**
   - Ensure protobuf files are generated: `protoc --php_out=app/Grpc/Generated protos/item.proto`
   - Regenerate autoloader: `composer dump-autoload`
   - Verify service registration in `worker.php`

3. **Connection refused:**
   - Ensure RoadRunner server is running
   - Check firewall settings for port 9001
   - Verify server logs for errors

## 🎨 UI Components

### ItemCard
- Displays item information with rarity badges
- Quantity controls with optimistic updates
- Delete button with confirmation modal

### ItemForm
- Add new items with validation
- Rarity selection dropdown
- Form reset after successful submission

### ConfirmModal
- Reusable confirmation dialog
- Keyboard support (ESC to close)
- Loading states and error handling

## 🔧 Configuration

### Backend Configuration
- **Database**: Configured in `config/database.php`
- **Cache**: Redis configuration in `config/cache.php`
- **Queue**: RabbitMQ setup in `config/queue.php`
- **gRPC**: RoadRunner config in `rr.yaml`

### Frontend Configuration
- **API Base URL**: Set in `src/api/items.ts`
- **Tailwind**: Configured in `tailwind.config.js`
- **Vite**: Build configuration in `vite.config.ts`

## 🚀 Deployment

### Backend Deployment
1. Set up production environment variables
2. Run `composer install --optimize-autoloader --no-dev`
3. Run `php artisan config:cache`
4. Run `php artisan route:cache`
5. Start RoadRunner: `./rr.exe serve -c rr.yaml`

### Frontend Deployment
1. Run `npm run build`
2. Deploy the `dist/` folder to your web server
3. Configure reverse proxy for API calls

## 🧪 Testing

### Backend Tests
```bash
cd backend
# Configure test database to use PostgreSQL
php artisan test --env=testing
```

**Note**: Tests use PostgreSQL database. Ensure your test database is configured in `.env.testing`:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=inventory_test
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📊 Performance Features

- **Optimistic Updates**: Instant UI feedback
- **Skeleton Loading**: Professional loading states
- **Caching**: Redis-based caching for API responses
- **gRPC**: High-performance binary protocol
- **RoadRunner**: Persistent PHP processes

## 🔒 Security Features

- **CSRF Protection**: Laravel CSRF tokens
- **Input Validation**: Server-side validation
- **SQL Injection Protection**: Eloquent ORM
- **XSS Protection**: React's built-in protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in each component folder
- Review the API documentation

## 🎯 Roadmap

- [ ] User authentication and authorization
- [ ] Item categories and tags
- [ ] Bulk operations
- [ ] Export/Import functionality
- [ ] Advanced filtering and search
- [ ] Real-time notifications
- [ ] Mobile app (React Native)

---

## 📋 Quick Reference

### Essential Commands

#### Docker Setup
```bash
# Start everything
docker-compose up -d

# Stop everything
docker-compose down

# View logs
docker-compose logs -f
```

#### Local Setup
```bash
# Backend (Terminal 1)
cd backend && php artisan serve

# gRPC (Terminal 2)
cd backend && ./rr.exe serve -c rr.yaml

# Frontend (Terminal 3)
cd frontend && npm run dev

# RabbitMQ (Terminal 4)
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

# Redis (Terminal 5)
docker run -d --name redis -p 6379:6379 redis:alpine
```

### Service URLs
- **Frontend**: http://localhost:3000 (Docker) / http://localhost:5173 (Local)
- **Backend API**: http://localhost:8000
- **gRPC Server**: localhost:9001
- **RabbitMQ Management**: http://localhost:15672 (guest/guest)
- **Redis**: localhost:6379

### Key Files
- `docker-compose.yml` - Docker orchestration
- `backend/.env` - Backend configuration
- `backend/rr.yaml` - RoadRunner gRPC configuration
- `frontend/src/api/items.ts` - API client configuration

---
