# Harshwardhan Patil - Portfolio

A modern, responsive portfolio website built with Angular, showcasing my work and experience as a Software Engineer.

## 🛠 Tech Stack

- **Framework:** Angular 17
- **Styling:** SCSS
- **Deployment:** GitHub Pages (via `ng deploy`)
- **Version Control:** Git

## 🚀 Features

- Responsive design that works on all devices
- Smooth scroll animations
- Dynamic navigation
- Mobile-friendly menu
- Interactive UI elements
- Section-based layout:
  - Hero section
  - About
  - Experience
  - Projects
  - Contact

## 🏃‍♂️ Running Locally

```bash
# Clone the repository
git clone [your-repo-url]

# Navigate to the project directory
cd buffden-portfolio

# Install dependencies
npm install

# Start the development server
ng serve

# Open http://localhost:4200 in your browser
```

## 🚀 Deploying to GitHub Pages

This project uses [angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages) for easy deployment.

```bash
# Build and deploy to GitHub Pages
ng deploy
```
- This will build your app for production and push it to the `gh-pages` branch.
- Your site will be live at: `https://Buffden.github.io/buffden-portfolio/`

### SCSS Budget Warning
If you see a warning like:
```
src/app/sections/projects/projects.component.scss exceeded maximum budget. Budget 4.00 kB was not met by 1.23 kB with a total of 5.23 kB.
```
This is just a warning about CSS file size and does not block deployment.

## 📝 Development Commands

- `ng serve` - Start development server
- `ng build` - Build the project
- `ng test` - Run unit tests
- `ng lint` - Run linting
- `ng e2e` - Run end-to-end tests
- `ng deploy` - Deploy to GitHub Pages

## 📂 Project Structure

```
buffden-portfolio/
├── src/
│   ├── app/
│   │   ├── layout/         # Layout components (header, sidebar, etc.)
│   │   ├── sections/       # Main section components
│   │   └── shared/        # Shared components and utilities
│   ├── assets/            # Static assets
│   └── styles/           # Global styles and variables
├── angular.json          # Angular configuration
└── package.json         # Project dependencies and scripts
```

## 🔗 Links

- [Live Portfolio](https://Buffden.github.io/buffden-portfolio/)
- [Resume](https://docs.google.com/document/d/1cJ7W9DSc-dN7q8x5KywO324tP5XwX9bC6xI4QJfKeME/edit?usp=sharing)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
