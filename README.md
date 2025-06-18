# Planet Yogurt Africa 🍨

**Where smiles swirl and flavors bring us together!**

A modern, responsive website for Planet Yogurt Africa - Kenya's premier frozen yogurt destination. Featuring 20+ delicious flavors across 6 locations, this website showcases our commitment to healthy, tasty, and fun frozen yogurt experiences.

## 🌟 About Planet Yogurt Africa

Planet Yogurt Africa brings joy to families across Kenya with:
- **20+ Premium Flavors** - From tropical escapes to chocolate dreams
- **6 Store Locations** - Strategically located across Nairobi and Mombasa
- **Healthy & Natural** - 100% natural ingredients with probiotics
- **Family-Friendly** - Creating memories one swirl at a time

**Brand Values:** Healthy • Tasty • Fun

## 🚀 Tech Stack

This project is built with modern web technologies:

- **[Vite](https://vite.dev/)** - Lightning-fast build tool and dev server
- **[React 18](https://react.dev/)** - Modern UI library with hooks
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service for data management
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[React Query](https://tanstack.com/query)** - Server state management

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18+ or 20+) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** (comes with Node.js)
- **Git** for version control

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/magvtv/07_LactisOrbis.git
   cd 07_LactisOrbis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

## 📜 Available Scripts

According to the [Vite documentation](https://vite.dev/guide/), these are the standard scripts for a Vite project:

```bash
# Development
npm run dev          # Start development server with HMR
npm run dev -- --port 3000  # Start on custom port

# Building
npm run build        # Build for production
npm run build:dev    # Build for development

# Preview
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Site navigation
│   ├── Hero.tsx        # Landing section
│   ├── FlavorShowcase.tsx
│   ├── StoreLocator.tsx
│   ├── InstagramFeed.tsx
│   └── Footer.tsx
├── pages/              # Route components
│   ├── Index.tsx       # Home page
│   ├── Flavors.tsx     # Flavors catalog
│   ├── Stores.tsx      # Store locations
│   └── NotFound.tsx    # 404 page
├── data/               # Static data
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client & types
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## 🌿 Development Workflow

This project uses a feature branch workflow:

- **`main`** - Production-ready code
- **`froyo-site`** - Active development branch
- **Feature branches** - For specific features/fixes

### Making Changes

1. **Create a feature branch from `froyo-site`**
   ```bash
   git checkout froyo-site
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and commit**
   ```bash
   git add .
   git commit -m "feat: add new flavor showcase component"
   ```

3. **Push and create a pull request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🚀 Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Static Hosting
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🎨 Features

- **🎯 Modern Design** - Clean, responsive UI with smooth animations
- **📱 Mobile-First** - Optimized for all screen sizes
- **⚡ Fast Performance** - Powered by Vite's lightning-fast HMR
- **🔍 SEO Optimized** - Meta tags and semantic HTML
- **♿ Accessibility** - WCAG compliant components
- **🌐 Multi-Page** - Dedicated pages for flavors, stores, and more
- **📊 Analytics Ready** - Easy integration with tracking tools

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for consistent commit messages:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

## 📞 Contact & Support

- **Website**: [Planet Yogurt Africa](https://planetyogurt.co.ke)
- **Email**: hello@planetyogurt.co.ke
- **Phone**: +254 700 123 456
- **Social**: Follow us [@planetyogurtafrica](https://instagram.com/planetyogurtafrica) for daily #PYVibes

## 📄 License

This project is proprietary software owned by Planet Yogurt Africa. All rights reserved.

---

**Made with 💕 for frozen yogurt lovers across Kenya**

*#PYVibes • Where every swirl tells a story* 🍨✨ 