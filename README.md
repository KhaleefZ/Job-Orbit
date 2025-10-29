# Job Orbit 🚀

A modern job portal application built with Next.js, React, and TypeScript. Job Orbit connects job seekers with employers through an intuitive and responsive platform.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🔍 Advanced job search and filtering
- 👤 User authentication and profile management
- 💼 Employer dashboard for job postings
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast performance with Next.js
- 🔒 Secure authentication
- 📊 Real-time job updates

## 🛠️ Tech Stack

- **Framework:** Next.js 14+
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Linting:** ESLint
- **Package Manager:** npm

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

## 🚀 Installation

### Option 1: Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/KhaleefZ/Job-Orbit.git
cd Job-Orbit
```

2. Install dependencies:
```bash
npm install
```

### Option 2: Using the Install Script (Windows)

Run the provided batch script:
```bash
install.bat
```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
Job-Orbit/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable React components
│   ├── lib/             # Utility functions and helpers
│   ├── styles/          # Global styles
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
├── .editorconfig        # Editor configuration
├── .eslintrc.js        # ESLint configuration
├── .gitignore          # Git ignore rules
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies
├── postcss.config.cjs  # PostCSS configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Editor Configuration

The project includes `.editorconfig` for consistent coding styles across different editors.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on:

- Code of conduct
- Development workflow
- Pull request process
- Coding standards

### Quick Contribution Guide

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill the process using port 3000
npx kill-port 3000
```

**Dependencies issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is part of an academic assignment for Human Computer Interface and Interaction Lab.

## 👥 Authors

- **Khaleef** - [KhaleefZ](https://github.com/KhaleefZ)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- All contributors who helped shape this project
- Academic supervisors for guidance

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---
