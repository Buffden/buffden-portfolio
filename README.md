
# Harshwardhan Patil - Portfolio

[![Portfolio Landing Page](src/assets/images/portfolio-landing-page.png)](https://portfolio.buffden.com/)

**[Visit the live website](https://portfolio.buffden.com/)**

A modern, responsive portfolio website built with Angular, showcasing my work and experience as a Software Engineer.

## Tech Stack

- **Framework:** Angular 17
- **Styling:** SCSS
- **Deployment:** GitHub Pages (via `ng deploy`)
- **Version Control:** Git

## Features

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

## Running Locally

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

## Deploying to GitHub Pages

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

## Development Commands

- `ng serve` - Start development server
- `ng build` - Build the project
- `ng test` - Run unit tests
- `ng lint` - Run linting
- `ng e2e` - Run end-to-end tests
- `ng deploy` - Deploy to GitHub Pages

## Project Structure

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

## Links

- [Live Portfolio](https://Buffden.github.io/buffden-portfolio/)
- [Resume](https://github.com/Buffden/resume/blob/main/Harshwardhan-Patil-Resume.pdf)

## License

This project is open source and available under the [MIT License](LICENSE).

## Features
- Modern, animated portfolio built with Angular
- Custom animated hexagon loader with initial
- Sequential animated loading: Header → Sidebar → Hero → Main Content
- Responsive design and smooth transitions

## Loader Animation
- The loader uses an SVG hexagon with a custom 'H' initial.
- The SVG polygon points are carefully chosen to avoid rendering artifacts and ensure all corners are joined perfectly.
- Animation sequence:
  1. Loader appears and animates the hexagon outline
  2. Header fades in
  3. Sidebar slides in
  4. Hero section fades in
  5. Main content appears

### SVG Hexagon Loader
- The SVG polygon points are:
  ```
  points="50,12 88,36 88,74 50,98 12,74 12,36 50,12"
  ```
- This ensures the hexagon is closed and avoids gaps at the corners.
- If you see a gap at the top corner, try nudging the points inward or adjusting the stroke width.

## Customization
- You can change the loader initial by editing the `<text>` element in `src/app/shared/loader/loader.component.html`.
- Animation timings can be tweaked in `src/app/app.component.ts` in the `ngOnInit` method.

## Troubleshooting
- If the hexagon outline appears disconnected, ensure the SVG points are correct and not on the very edge of the viewBox.
- Use `stroke-linejoin="miter"` for sharp corners.

## Getting Started
1. Install dependencies: `npm install`
2. Run the app: `ng serve`
3. Build for production: `ng build`

---

For more details, see the code comments and the loader component source.
