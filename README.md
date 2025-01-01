# Child Learning App

A simple React-based educational application designed to help children learn numbers, letters, and colors through interactive exercises.

## Features

- Numbers learning (0-10 and 0-20 ranges)
- Letters learning (A-H, I-P, R-Z ranges)
- Basic colors recognition
- Optional randomization of learning sequences
- Mobile-friendly interface
- Full-screen display mode

## Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

For development:
```bash
npm start
```

```bash
npm run build
```

The application will be available at http://localhost:3000

### Building for Production

To create a production build:
```bash
npm run build
```

### Docker Support

The application can be run using Docker:
```bash
docker-compose up
```

This will build and start the application on port 3000.

## Application Structure

- `/src/components/` - React components
  - `Learn.js` - Main learning component for numbers and letters
  - `Colors.js` - Color learning component
  - `Menu.js` - Main navigation menu
- `/public/` - Static assets
- `/src/App.js` - Main application component
- `/src/index.js` - Application entry point

## URL Parameters

The application supports the following URL parameters:

- `start` - Starting value for learning sequence
- `stop` - Ending value for learning sequence
- `randomize=1` - Enable randomization of values

Examples:
- `/learn?start=0&stop=10` - Numbers from 0 to 10
- `/learn?start=A&stop=H` - Letters from A to H
- `/learn?start=0&stop=10&randomize=1` - Randomized numbers from 0 to 10

## Environment Support

The application is configured to support:
- Modern browsers (Chrome, Firefox, Safari)
- Mobile devices
- Progressive Web App capabilities

## License

This project is private and proprietary.

## Dependencies

Key dependencies include:
- React 19.0.0
- React Router DOM 7.1.1
- React Scripts 5.0.1

For a complete list of dependencies, see the `package.json` file.