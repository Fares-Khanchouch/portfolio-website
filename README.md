# 🚀 Fares Khanchouch - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features smooth animations, interactive components, dynamic background system, and comprehensive SEO optimization.

![Portfolio Preview](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.0-purple?style=for-the-badge)

## ✨ Features

- **🎨 Modern Design**: Clean, professional design with smooth animations and hover effects
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **🎭 Interactive Elements**: Hover effects, drag-and-drop technology cards, animated backgrounds
- **⚡ Performance Optimized**: Built with Next.js 15 for optimal performance and Core Web Vitals
- **🔍 SEO Optimized**: Comprehensive meta tags, structured data, sitemap, and robots.txt
- **🌙 Dark Theme**: Beautiful dark theme with dynamic background transitions
- **📄 Contact Form**: Functional contact form with FormSubmit integration
- **🔗 Social Links**: Direct links to GitHub and other professional profiles
- **📱 PWA Ready**: Web app manifest for installable experience
- **🎯 Accessibility**: Semantic HTML and proper ARIA labels

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 15.3.4** - React framework with App Router
- **TypeScript 5.0** - Type-safe JavaScript
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **React 19.0.0** - Latest React with concurrent features

### Animation & UI
- **Framer Motion 12.23.0** - Smooth animations and transitions
- **Lucide React 0.523.0** - Beautiful icon library
- **React Icons 5.5.0** - Comprehensive icon collection

### SEO & Performance
- **Structured Data (JSON-LD)** - Rich snippets for search engines
- **Open Graph Tags** - Social media sharing optimization
- **Twitter Cards** - Twitter sharing optimization
- **Sitemap.xml** - Search engine discovery
- **Robots.txt** - Crawler guidance

### Utilities
- **clsx 2.1.1** - Conditional className utility
- **tailwind-merge 3.3.1** - Tailwind class merging utility

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js 18.17.0 or higher** - [Download here](https://nodejs.org/)
- **npm 9.0.0 or higher** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

### System Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 1GB free space
- **Browser**: Modern browser with ES6+ support

## 🚀 Installation

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/Fares-Khanchouch/portfolio-website.git

# Navigate to the project directory
cd portfolio-website
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# Or if you prefer yarn
yarn install

# Or if you prefer pnpm
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory (optional for basic functionality):

```bash
# Create environment file
touch .env.local
```

Add any environment variables if needed (currently not required for basic functionality).

### 4. Run the Development Server

```bash
# Start the development server
npm run dev

# Or with yarn
yarn dev

# Or with pnpm
pnpm dev
```

### 5. Open Your Browser

Open [http://localhost:3000](http://localhost:3000) to view the portfolio website.

## 📁 Project Structure

```
portfolio-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout with SEO metadata
│   │   ├── page.tsx            # Home page
│   │   └── favicon.ico         # Site favicon
│   ├── components/             # React components
│   │   ├── About.tsx           # About section with tech stack
│   │   ├── BackgroundLayout.tsx # Dynamic background system
│   │   ├── Contact.tsx         # Contact form with FormSubmit
│   │   ├── Footer.tsx          # Footer component
│   │   ├── Hero.tsx            # Hero section
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Projects.tsx        # Projects showcase with modal
│   │   └── WorkHistory.tsx     # Work experience timeline
│   ├── lib/                    # Utility functions
│   │   ├── hooks/
│   │   │   └── useSectionInView.ts # Intersection observer hook
│   │   └── utils.ts            # Utility functions
│   └── types/                  # TypeScript types
│       └── work.ts             # Work experience types
├── public/                     # Static assets
│   ├── icon/                   # Technology icons (SVG)
│   ├── projects/               # Project images
│   ├── avatar.png              # Profile picture
│   ├── globe.png               # Globe image
│   ├── resume.pdf              # Resume file
│   ├── robots.txt              # Search engine crawler guidance
│   ├── sitemap.xml             # Search engine sitemap
│   └── manifest.json           # PWA manifest
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── next.config.ts              # Next.js configuration
└── README.md                   # This file
```

## 🎨 Customization

### Personal Information
Update the following files with your information:

1. **Hero Section** (`src/components/Hero.tsx`)
   - Name and title
   - Profile picture (`public/avatar.png`)
   - Resume file (`public/resume.pdf`)

2. **About Section** (`src/components/About.tsx`)
   - Personal description
   - Location information
   - Technology stack and icons

3. **Work History** (`src/components/WorkHistory.tsx`)
   - Work experience data in `src/types/work.ts`
   - Company information
   - Job descriptions

4. **Projects Section** (`src/components/Projects.tsx`)
   - Project details
   - Project images in `public/projects/`
   - GitHub links

5. **Contact Section** (`src/components/Contact.tsx`)
   - Email address for FormSubmit
   - Contact form configuration

6. **SEO & Metadata** (`src/app/layout.tsx`)
   - Page title and description
   - Open Graph tags
   - Structured data
   - Social media links

### Styling
- **Colors**: Update color scheme in `src/app/globals.css`
- **Backgrounds**: Modify background colors in `src/components/BackgroundLayout.tsx`
- **Animations**: Adjust animation settings in component files

### Content
- **Meta Tags**: Update SEO information in `src/app/layout.tsx`
- **Images**: Replace images in `public/` directory
- **Icons**: Add/remove technology icons in `public/icon/`
- **Sitemap**: Update `public/sitemap.xml` with your domain

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically with zero configuration

### Netlify
1. Build the project: `npm run build`
2. Upload the `out/` folder to Netlify

### Other Platforms
The project is compatible with any static hosting platform that supports Next.js.

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Additional
npm run type-check   # TypeScript type checking
```

## 🔧 Configuration Files

- **`next.config.ts`** - Next.js configuration
- **`tsconfig.json`** - TypeScript configuration
- **`tailwind.config.js`** - Tailwind CSS configuration
- **`eslint.config.mjs`** - ESLint configuration
- **`postcss.config.mjs`** - PostCSS configuration

## 🔍 SEO Features

This portfolio includes comprehensive SEO optimization:

- **Meta Tags**: Title, description, keywords, and social media tags
- **Structured Data**: JSON-LD schema for Person and WebSite
- **Open Graph**: Facebook and LinkedIn sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **Sitemap**: XML sitemap for search engine discovery
- **Robots.txt**: Crawler guidance
- **PWA Manifest**: Installable web app capabilities
- **Semantic HTML**: Proper heading hierarchy and semantic elements

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   # Kill the process using port 3000
   npx kill-port 3000
   # Or use a different port
   npm run dev -- -p 3001
   ```

2. **Node modules issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```

4. **Build errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

5. **ESLint errors**
   ```bash
   # Fix auto-fixable issues
   npm run lint -- --fix
   ```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact me at [fares.khanchouch@gmail.com](mailto:fares.khanchouch@gmail.com)
- Connect on [GitHub](https://github.com/Fares-Khanchouch/)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)
- Contact form powered by [FormSubmit](https://formsubmit.co/)

---

## 🎯 Free to Use as Template

**This portfolio is completely free to use as a template or inspiration for your own projects!**

Feel free to:
- ✅ Fork this repository
- ✅ Use it as a starting point for your portfolio
- ✅ Modify and customize it to your needs
- ✅ Share your modified versions
- ✅ Use it for commercial projects

**No attribution required** - though it's always appreciated if you credit the original inspiration!

Happy coding! 🚀
