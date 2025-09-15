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

## 🚀 Quick Start

### Prerequisites
- **PHP 8.2+** with extensions: `curl`, `mbstring`, `openssl`, `pdo`, `tokenizer`, `xml`
- **Composer** - PHP dependency manager
- **Node.js 18+** - JavaScript runtime
- **npm** - Node package manager

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   composer install
   ```

3. **Environment setup**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database setup**:
   ```bash
   php artisan migrate
   ```

5. **Start Laravel server**:
   ```bash
   php artisan serve
   ```

6. **Start gRPC server** (in another terminal):
   ```bash
   ./rr.exe serve -c rr.yaml
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🌐 API Endpoints

### REST API (Laravel)
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item
- `PATCH /api/items/{id}/quantity` - Update item quantity
- `DELETE /api/items/{id}` - Delete item

### gRPC API
- `GetItemById` - Get item by ID (high-performance)

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

**Built with ❤️ using Laravel, React, and modern web technologies.**
