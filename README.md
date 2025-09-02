# Harsh Swami - Portfolio Website

A modern, gaming-inspired portfolio website showcasing my work as an Associate Product Analyst at Electronic Arts.

## Features

- **Responsive Design**: Optimized for both desktop and mobile devices
- **Gaming-Inspired Theme**: Dark theme with neon accents and interactive elements
- **Single-Page Application**: Smooth scrolling navigation between sections
- **Interactive Elements**: Animated skill bars, hover effects, and form validation
- **Contact Form**: Functional contact form with validation
- **Downloadable Resume**: Direct download link in the header

## Sections

1. **Hero/Landing**: Introduction with animated title and call-to-action buttons
2. **About**: Professional summary and highlights
3. **Experience**: Timeline of work experience
4. **Skills**: Interactive skill bars showing technical proficiencies
5. **Projects**: Showcase of key projects and analyses
6. **Gameography**: Unique section highlighting games worked on
7. **Contact**: Contact form and social links

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: Interactive functionality and smooth user experience
- **Font Awesome**: Icons throughout the site
- **Google Fonts**: Orbitron and Inter font families

## Project Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and responsive design
├── script.js           # JavaScript functionality
├── assets/             # Static assets folder
│   └── resume.pdf      # Resume file (to be added)
└── README.md           # Project documentation
```

## Setup Instructions

1. **Clone or Download**: Get the project files
2. **Add Resume**: Place your resume PDF in the `assets/` folder as `resume.pdf`
3. **Customize Content**: Update the dummy content with your real information
4. **Deploy**: Upload to GitHub Pages or any static hosting service

## GitHub Pages Deployment

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `https://yourusername.github.io/repository-name`

## Customization Guide

### Colors
The color scheme is defined in CSS variables at the top of `styles.css`:
- `--primary-color`: Main accent color (green)
- `--secondary-color`: Secondary accent (pink)
- `--accent-color`: Third accent (blue)

### Content Updates
- **Personal Information**: Update in `index.html`
- **Skills**: Modify skill items and percentages in the Skills section
- **Projects**: Replace dummy projects with your actual work
- **Experience**: Update work history in the Experience section
- **Games**: Modify the Gameography section with actual games

### Contact Form
The contact form currently shows success messages. To make it functional:
1. Use a service like Formspree, Netlify Forms, or EmailJS
2. Update the form action in `script.js`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance Features

- Optimized images and assets
- Smooth scrolling and animations
- Debounced scroll events
- Lazy loading for skill bar animations
- Minimal external dependencies

## Future Enhancements

- [ ] Add actual project case studies
- [ ] Implement blog section
- [ ] Add more interactive visualizations
- [ ] Include testimonials section
- [ ] Add dark/light theme toggle

## Contact

For questions or collaboration opportunities, reach out through the contact form on the website.

---

**Note**: This is a template with dummy content. Replace all placeholder information with your actual details before deployment.
