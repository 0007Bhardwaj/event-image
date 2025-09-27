# Event Photos App

A responsive React application for managing events and sharing photos, built with modern web technologies.

## 🚀 Features

### Authentication
- **Login Page**: Email + Password authentication with demo credentials
- **Register Page**: User registration with form validation
- **Google Login**: Placeholder integration for Cognito/Google authentication
- **Forgot Password**: UI-only password reset flow
- **Role-based Access**: Admin and regular user roles

### Event Management
- **Home Page**: Browse events with responsive card layout
- **Event Detail Page**: View event information and photos
- **Photo Upload**: Users can upload photos to events
- **Admin Features**: Create events and manage photos (admin only)

### UI/UX
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Modern Interface**: Clean, professional design
- **Navigation**: Simple navbar with role-based menu items
- **Loading States**: Proper loading indicators and error handling

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Axios** - HTTP client (configured but using dummy data)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd event-photo-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔐 Demo Credentials

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Features**: Can create events and delete photos

### Regular User Account
- **Email**: `user@example.com`
- **Password**: `user123`
- **Features**: Can upload photos to events

## 📱 Pages

### Public Pages
- **Home** (`/`) - Browse all events
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - Create new account
- **Forgot Password** (`/forgot-password`) - Password reset (UI only)
- **Event Detail** (`/event/:id`) - View event and photos

### Protected Pages
- **Create Event** (`/create-event`) - Admin only, create new events

## 🎨 Design Features

- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean design with proper spacing and typography
- **Interactive Elements**: Hover effects, loading states, and smooth transitions
- **Accessibility**: Proper form labels, keyboard navigation, and semantic HTML

## 🔧 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx       # Navigation bar
│   ├── EventCard.jsx    # Event display card
│   └── ProtectedRoute.jsx # Route protection
├── pages/               # Page components
│   ├── Home.jsx         # Home page
│   ├── Login.jsx        # Login page
│   ├── Register.jsx     # Registration page
│   ├── ForgotPassword.jsx # Password reset
│   ├── EventDetail.jsx  # Event details
│   └── CreateEvent.jsx  # Create event (admin)
├── store/               # Redux store
│   ├── index.js         # Store configuration
│   └── slices/          # Redux slices
│       ├── authSlice.js # Authentication state
│       └── eventsSlice.js # Events state
└── App.jsx              # Main app component
```

## 🚀 Getting Started

1. **Browse Events**: Visit the home page to see available events
2. **Sign In**: Use demo credentials to log in
3. **Upload Photos**: Click on an event to view details and upload photos
4. **Admin Features**: Log in as admin to create new events

## 🔮 Future Enhancements

- Real backend integration
- AWS Cognito authentication
- Image optimization and resizing
- Real-time photo updates
- User profiles and photo galleries
- Event categories and filtering
- Social features (likes, comments)

## 📄 License

This project is for demonstration purposes.