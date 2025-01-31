# API Boilerplate

A robust and scalable API boilerplate built with Fastify, featuring JWT authentication, Swagger documentation, and MongoDB integration.

## Features

- 🚀 **Fastify** - High performance web framework
- 📚 **Swagger Documentation** - Built-in API documentation
- 🔐 **JWT Authentication** - Secure authentication system
- 🗄️ **MongoDB Integration** - Using Mongoose ODM
- 🔄 **CORS Enabled** - Cross-Origin Resource Sharing
- 📦 **Module Aliases** - Clean import paths
- 🎯 **Response Standardization** - Consistent API responses
- 🛠️ **PM2 Process Management** - Production-ready process management

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- PM2 (for production)

### Installation

```bash
# Clone the repository
git clone https://github.com/lightrainstech/api-boilerplate.git

# Install dependencies
yarn install

# Create .env file
cp .env.example .env
```

### Environment Variables

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-database
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Development

```bash
# Start development server
yarn dev
```

### Production

```bash
# Start with PM2
pm2 start pm2.json
```

## Project Structure

```
src/
├── config/         # Configuration files
├── models/         # MongoDB models
├── plugins/        # Fastify plugins
├── services/       # API routes and business logic
├── utils/          # Utility functions
├── payload/        # Request/Response schemas
├── app.js          # Application setup
└── server.js       # Server entry point
```

## Module Aliases

```json
{
  "@root": ".",
  "@services": "src/services/v1/",
  "@payloads": "src/payload/",
  "@models": "src/models/",
  "@configs": "src/config/",
  "@utils": "src/utils/"
}
```

## API Documentation

Swagger documentation is available at `/docs` when the server is running.

## API Response Format

### Success Response

```json
{
  "error": false,
  "message": "Success",
  "statusCode": 200,
  "data": []
}
```

### Error Response

```json
{
  "error": true,
  "message": "Error message",
  "statusCode": 400,
  "data": []
}
```

## Production Deployment

The project includes PM2 configuration for production deployment:

```json
{
  "apps": [
    {
      "name": "api-main",
      "script": "./src/server.js",
      "exec_mode": "cluster",
      "instances": "max",
      "max_memory_restart": "512M",
      "env": {
        "NODE_ENV": "production"
      }
    }
  ]
}
```

## Scripts

```bash
yarn start        # Start the server
yarn run dev      # Start development server with nodemon
```

## Dependencies

- @fastify/autoload
- @fastify/cors
- @fastify/etag
- @fastify/jwt
- @fastify/swagger
- @fastify/swagger-ui
- dotenv
- fastify
- fluent-json-schema
- mongoose
- and more...

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Lightrains Tech ([@lightrainstech](https://github.com/lightrainstech))
