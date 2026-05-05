# Rauhan Ali - Developer Portfolio

A modern, high-performance portfolio website built with Next.js, React, and Tailwind CSS. Featuring dynamic 3D visualizations with Three.js and fluid animations using Framer Motion.

## Features

- **Next.js App Router**: Optimized for performance and SEO.
- **Responsive Design**: Tailored experiences across desktop, tablet, and mobile devices.
- **3D Visualizations**: Interactive elements powered by Three.js and React Three Fiber, including custom blockchain visualizations.
- **Fluid Animations**: Smooth page transitions, custom cursor, noise overlays, and micro-interactions using Framer Motion.
- **Tailwind CSS**: Utility-first styling for rapid UI development and visually stunning custom themes.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Library:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics:** [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)

## Getting Started

### Prerequisites

Ensure you have Node.js and a package manager (npm, yarn, pnpm, or bun) installed on your machine.

### Installation

1. Clone the repository and navigate into the project directory.

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
   Copy the `.env.example` file to a `.env` file and fill in any required values.

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Application routes and main pages.
- `components/` - Reusable UI components.
- `public/` - Static assets such as images and fonts.
- `lib/` - Shared utility functions and configurations.
- `hooks/` - Custom React hooks.

## Deployment

This project is optimized and ready to be easily deployed on [Vercel](https://vercel.com/new).

## License

This project is licensed under the MIT License.
