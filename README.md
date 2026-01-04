# Smart Learners.ai - Next.js Website

A modern, responsive AI-powered learning platform built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **SEO Optimized** with meta tags, sitemap, and robots.txt
- **Responsive Design** - works on all devices
- **Fast Performance** with modern web technologies

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smartlearners-nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
smartlearners-nextjs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with SEO meta tags
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── courses/           # Courses page
│   ├── features/          # Features page
│   ├── contact/           # Contact page
│   ├── sitemap.xml/       # Dynamic sitemap
│   ├── robots.txt/        # Dynamic robots.txt
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── pages/            # Page components
│   ├── Button.tsx        # Button component
│   ├── Card.tsx          # Card component
│   ├── Navbar.tsx        # Navigation component
│   └── Footer.tsx        # Footer component
├── package.json
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md
```

## 🎨 Key Features Implemented

### SEO Optimization
- **Meta Tags**: Comprehensive meta tags for each page including title, description, keywords
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Canonical URLs**: Proper canonical link structure
- **Sitemap**: Dynamic XML sitemap generation
- **Robots.txt**: Search engine crawling instructions

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Flexible grid layouts
- Responsive typography and spacing

### Performance
- Next.js App Router for optimal performance
- Image optimization ready
- Code splitting by default
- Fast page transitions

### Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- Alt texts ready for images
- Keyboard navigation support

## 🔧 Customization

### Colors and Styling
The design system uses a purple-to-blue gradient theme. You can customize colors in:
- `tailwind.config.js` - Tailwind color palette
- `app/globals.css` - Custom CSS classes and gradients

### Content
- Update meta descriptions and keywords in each page's `metadata` object
- Modify course content in `components/pages/Courses.tsx`
- Update company information in the About page
- Customize contact details in Footer and Contact components

### SEO Settings
- Update the base URL in `app/sitemap.xml/route.ts`
- Modify robots.txt rules in `app/robots.txt/route.ts`
- Update Open Graph images in `app/layout.tsx`

## 📱 Pages Overview

1. **Home** - Hero section with features overview and statistics
2. **About** - Company story, mission, values, and milestones
3. **Courses** - CBSE NCERT courses with filtering by class and subject
4. **Features** - Detailed AI-powered learning features
5. **Contact** - Contact form with company information and FAQs

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📈 SEO Features

- **Structured Data**: Ready for rich snippets implementation
- **Page Speed**: Optimized for Core Web Vitals
- **Mobile-First**: Google mobile-first indexing ready
- **Local SEO**: Schema markup ready for local business
- **Analytics Ready**: Google Analytics and Search Console integration ready

## 🔮 Future Enhancements

- Blog section for content marketing
- Student dashboard
- Course detail pages
- Payment integration
- Multi-language support
- Dark mode toggle

## 📞 Support

For any questions or issues, please contact:
- Email: info@smartlearners.ai
- Phone: +91 123 456 7890

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
