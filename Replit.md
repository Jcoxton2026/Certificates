# Certificate Maker Application

## Overview

This is a full-stack certificate maker application built with React (frontend) and Express.js (backend). The application allows users to create, customize, and generate professional certificates using pre-designed templates. It features a modern UI built with shadcn/ui components, database integration with Drizzle ORM and PostgreSQL, and real-time canvas-based certificate editing.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: shadcn/ui (Radix UI primitives with Tailwind CSS)
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Canvas Rendering**: HTML5 Canvas API for certificate generation and editing

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (DatabaseStorage implementation)
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Pattern**: RESTful API with JSON responses
- **Development**: Hot reload with tsx for TypeScript execution
- **Data Layer**: DatabaseStorage class implements IStorage interface for database operations

## Key Components

### Database Schema
- **Certificate Templates**: Stores template metadata, categories, and configuration
- **Certificates**: Stores individual certificate instances with customization data
- Templates include fields for layout, styling, premium status, and visual configuration
- Certificates link to templates and store recipient information and customizations

### Core Features
1. **Template Gallery**: Browse and select from categorized certificate templates
2. **Certificate Canvas**: Real-time visual editor for certificate customization
3. **Customization Panel**: Controls for fonts, colors, sizes, and content
4. **Preview System**: Full-screen preview with print/export capabilities
5. **Export Options**: PDF generation and image download functionality

### UI Components
- **Template Gallery**: Filterable grid of certificate templates with search
- **Certificate Canvas**: Interactive canvas with zoom, undo/redo functionality
- **Customization Panel**: Form controls for certificate personalization
- **Preview Modal**: Full-screen certificate preview with export options

## Data Flow

1. **Template Loading**: Fetch available templates from `/api/templates`
2. **Template Selection**: User selects template, loads configuration into canvas
3. **Real-time Editing**: Canvas updates as user modifies certificate data and styling
4. **Customization**: Panel controls update certificate appearance in real-time
5. **Export Process**: Generate PDF or image from canvas data for download

## External Dependencies

### Frontend Dependencies
- **@radix-ui/***: Accessible UI primitives for components
- **@tanstack/react-query**: Server state management and caching
- **class-variance-authority**: Utility for component variant management
- **clsx**: Conditional CSS class composition
- **date-fns**: Date manipulation and formatting
- **embla-carousel-react**: Carousel/slider functionality
- **lucide-react**: Icon library

### Backend Dependencies
- **@neondatabase/serverless**: Neon database connection adapter
- **drizzle-orm**: Type-safe SQL query builder
- **drizzle-zod**: Zod schema integration for validation
- **connect-pg-simple**: PostgreSQL session store
- **express**: Web application framework

### Development Tools
- **drizzle-kit**: Database migrations and schema management
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Development Environment
- Vite dev server for frontend with HMR
- Express server with tsx for backend hot reload
- Environment variables for database configuration
- Replit-specific plugins for development banner and cartographer

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Single deployment artifact with both frontend and backend
- Environment variable `DATABASE_URL` required for PostgreSQL connection

### Database Management
- Drizzle migrations stored in `./migrations`
- Schema defined in `shared/schema.ts` for type sharing
- Push schema changes with `npm run db:push`
- PostgreSQL dialect with connection pooling via Neon
