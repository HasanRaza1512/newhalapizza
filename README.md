# Hala Pizza - Food Ordering App

A modern, scalable React food ordering application built with Vite, React 19, and Tailwind CSS. This app demonstrates clean architecture patterns and is ready for backend integration.

## 🏗️ Architecture Overview

### Clean Architecture Pattern
The application follows a clean, modular architecture that separates concerns and prepares for future backend integration:

```
src/
├── components/          # Reusable UI components
├── pages/              # Route-level components
├── services/           # API layer and business logic
├── stores/             # State management (Zustand)
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── data/               # Static/mock data (to be replaced by API)
└── assets/             # Static assets
```

## 🚀 Key Features

### ✅ Completed Features
- **Product Management**: Async product fetching with loading states
- **Shopping Cart**: Full cart functionality with persistence
- **Checkout Flow**: Complete form validation and order submission
- **Location Services**: Delivery area validation
- **Toast Notifications**: Comprehensive notification system
- **Loading States**: Skeleton loaders and empty states
- **Error Handling**: Robust error management
- **Responsive Design**: Mobile-first design with Tailwind CSS

### 🔧 Technical Implementation

#### State Management (Zustand)
- **Cart Store**: Shopping cart logic and persistence
- **Product Store**: Product data and fetching logic
- **Location Store**: Delivery area management
- **UI Store**: Global UI state management

#### Services Layer
- **Product Service**: Product-related API calls
- **Order Service**: Order submission and management

#### Validation System
- Form validation with real-time feedback
- Phone number validation
- Address validation
- Required field validation

#### Notification System
- React Hot Toast integration
- Contextual notifications
- Success/error/loading states

## 📦 Dependencies

### Core Dependencies
- `react@19.2.5` - UI framework
- `react-dom@19.2.5` - DOM rendering
- `react-router-dom@7.14.2` - Routing
- `zustand@5.0.12` - State management
- `framer-motion@12.38.0` - Animations
- `react-hot-toast@2.6.0` - Notifications
- `react-icons@5.6.0` - Icon library

### Development Dependencies
- `vite@8.0.10` - Build tool
- `tailwindcss@4.2.4` - Styling
- `eslint@10.2.1` - Code linting

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone repository
git clone <repository-url>
cd halapizza

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Usage

### Customer Flow
1. Browse menu items by category
2. Add items to cart with custom options
3. View cart and adjust quantities
4. Proceed to checkout
5. Fill delivery/pickup information
6. Place order and receive confirmation

### Admin Features
- Product management (mock)
- Order tracking (mock)
- Analytics dashboard (mock)

## 🔌 Backend Integration Guide

### API Endpoints Structure
The app is designed to easily integrate with REST APIs. Here's expected structure:

#### Products API
```javascript
GET /api/products          // Get all products
GET /api/products/:id      // Get product by ID
GET /api/categories        // Get categories
GET /api/products/search   // Search products
```

#### Orders API
```javascript
POST /api/orders          // Create new order
GET /api/orders/:id       // Get order status
GET /api/orders/history   // Get order history
DELETE /api/orders/:id     // Cancel order
```

#### Location API
```javascript
POST /api/location/validate // Validate delivery area
GET /api/location/areas     // Get delivery areas
```

### Integration Steps
1. Replace mock data in `services/` with actual API calls
2. Update environment variables for API endpoints
3. Add authentication middleware
4. Implement error handling for API responses
5. Add real-time updates (WebSocket/SSE)

## 🏗️ Component Structure

### Reusable Components
- `LoadingSkeleton.jsx` - Various skeleton loaders
- `EmptyStates.jsx` - Empty state components
- `ProductCard.jsx` - Product display card
- `CartItem.jsx` - Shopping cart item
- `Button.jsx` - Custom button component

### Page Components
- `HomePage.jsx` - Landing page with hero and featured items
- `MenuPage.jsx` - Product browsing and filtering
- `CheckoutPage.jsx` - Complete checkout flow
- `AdminPage.jsx` - Admin dashboard

## 🎨 Styling

### Tailwind CSS Configuration
- Custom color palette (orange/gray theme)
- Responsive breakpoints
- Custom animations
- Component variants

### Design System
- Consistent spacing and typography
- Rounded corners and shadows
- Hover and active states
- Loading and error states

## 🔄 State Management

### Zustand Store Structure
```javascript
// Cart Store
{
  items: CartItem[],
  isCartOpen: boolean,
  fulfillment: FulfillmentDetails,
  // ... cart actions
}

// Product Store
{
  products: Product[],
  categories: string[],
  isLoading: boolean,
  error: string | null,
  // ... product actions
}

// Location Store
{
  selectedArea: string,
  isValidDeliveryArea: boolean,
  deliveryFee: number,
  // ... location actions
}

// UI Store
{
  isLoading: boolean,
  notifications: Notification[],
  theme: 'light' | 'dark',
  // ... UI actions
}
```

## 🧪 Testing

### Testing Strategy
- Unit tests for utilities and hooks
- Component tests for UI components
- Integration tests for user flows
- E2E tests for critical paths

### Running Tests
```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
```env
VITE_API_URL=https://api.halapizza.com
VITE_ENVIRONMENT=production
VITE_ENABLE_ANALYTICS=true
```

### Deployment Platforms
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- Docker containers

## 📈 Performance

### Optimization Features
- Code splitting by route
- Lazy loading components
- Image optimization
- Bundle size optimization
- Service worker for caching

### Performance Metrics
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)

## 🔒 Security

### Security Measures
- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure API communication
- Environment variable protection

## 🤝 Contributing

### Development Guidelines
1. Follow the established folder structure
2. Use TypeScript for new components
3. Write tests for new features
4. Follow existing code style
5. Update documentation

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Email: support@halapizza.com
- Documentation: [Wiki](link-to-wiki)

---

**Note**: This is a frontend demonstration. Backend integration is required for production use.
