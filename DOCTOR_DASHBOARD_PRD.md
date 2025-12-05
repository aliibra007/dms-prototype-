# Doctor Dashboard - Product Requirements Document (PRD)

## 1. Overview

The Doctor Dashboard is a comprehensive clinic management system designed for healthcare providers to manage their practice, patients, appointments, prescriptions, finances, and website settings. The system features a modern, responsive design with dark/light theme support and an animated background.

## 2. Architecture & Structure

### 2.1 Component Structure
```
src/components/doctor/
├── components/          # Reusable UI components
│   ├── dashboard/      # Dashboard-specific components
│   ├── messaging/      # Messaging system components
│   ├── patient-records/ # Patient management components
│   ├── prescriptions/   # Prescription management components
│   ├── profile/         # Profile management components
│   ├── schedules/       # Scheduling components
│   ├── shared/          # Shared components
│   └── websiteSettings/ # Website customization components
├── data/               # Mock data and data structures
├── finance/            # Finance and invoicing components
├── hooks/              # Custom React hooks
├── layout/             # Layout components (Navbar, Sidebar)
├── pages/              # Main page components
├── services/           # API services
└── styles/             # Styling files
```

## 3. Core Features & Functionalities

### 3.1 Layout & Navigation

#### 3.1.1 Navbar (Top Bar)
**Location:** Fixed at top of screen
**Features:**
- **Logo & Branding:**
  - Heart icon with "MediCare" branding
  - Clinic Management subtitle (hidden on mobile)
- **Menu Toggle Button:**
  - Hamburger menu icon
  - Toggles sidebar visibility
  - Responsive behavior (overlay on mobile, push on desktop)
- **Theme Toggle:**
  - Sun/Moon icons (React icons from lucide-react)
  - Toggles between light and dark mode
  - Smooth transition animations
- **Notifications:**
  - Bell icon with unread count indicator (red dot)
  - Dropdown menu showing notifications
  - Unread notifications highlighted
  - Click outside to close
- **User Profile:**
  - Avatar image
  - Doctor name and role
  - Dropdown menu with:
    - Edit Profile (links to profile page)
    - Change Password
    - Logout (red text)

**Styling:**
- Fixed position with backdrop blur
- Height: 64px (4rem)
- Z-index: 40
- Border bottom with theme-aware colors
- Responsive padding

#### 3.1.2 Sidebar Navigation
**Location:** Fixed left side, below navbar
**Features:**
- **Menu Items:**
  1. Dashboard (LayoutDashboard icon)
  2. Schedule & Availability (Calendar icon)
  3. Patient Records (Users icon)
  4. Prescription (Pill icon)
  5. Invoices & Finance (DollarSign icon)
  6. Messaging (MessageSquare icon)
  7. Website Settings (Globe icon)
  8. Profile & Settings (Settings icon)

- **Behavior:**
  - Active route highlighting with gradient background
  - Hover effects with icon scale animation
  - Mobile: Overlays content with backdrop
  - Desktop: Pushes content when open
  - Auto-closes on mobile when link clicked
  - Smooth slide animations (300ms duration)

**Styling:**
- Width: 260px
- Fixed position
- Height: calc(100vh - 4rem)
- Theme-aware colors
- Border right with shadow
- Scrollable content area

#### 3.1.3 Animated Background
**Features:**
- Grid pattern animation
- 30 floating particles with random positions and animations
- 3 wave animations with gradient effects
- 3 floating orbs
- Geometric shapes (circle, square, triangle)
- Radial pulse effect
- All animations respect theme colors

**Styling:**
- Fixed position, full viewport
- Z-index: 0 (behind all content)
- Opacity variations for depth
- Smooth CSS animations

### 3.2 Dashboard Page

#### 3.2.1 Overview Statistics
**Features:**
- 4 stat cards displaying:
  - Total Patients (Users icon)
  - Today's Appointments (Calendar icon)
  - Active Cases (Activity icon)
  - Revenue (DollarSign icon)
- Color-coded cards with theme support
- Icon-based visual indicators

#### 3.2.2 Charts & Analytics
**Features:**
- **Patient Flow Chart:**
  - Line chart showing patient visits over time
  - Recharts library integration
  - Responsive container
  - Theme-aware colors
  - Tooltip on hover
  
- **Revenue Overview Chart:**
  - Bar chart showing monthly revenue
  - Custom color (#F59E0B)
  - Rounded bar corners
  - Theme-aware grid and axes

#### 3.2.3 Recent Activity Section
**Features:**
- List of recent activities with:
  - Activity icon
  - Action description
  - Patient name
  - Timestamp
- "View All" button opens modal
- Activity icon badges with accent colors

#### 3.2.4 Upcoming Appointments
**Features:**
- List of upcoming appointments
- Patient name and appointment type
- Time display with clock icon
- "Add Slot" button opens modal
- Appointment cards with theme colors

#### 3.2.5 Modals
- **Recent Activity Modal:**
  - Full list of activities
  - Scrollable content
  - Close on Escape key
  
- **Add Slot Modal:**
  - Form to add new appointment
  - Patient selection
  - Date/time picker
  - Appointment type selection

#### 3.2.6 Pro Tips
**Features:**
- Dismissible tip banner
- Lightbulb icon
- Accent color background
- Close button (X icon)

### 3.3 Patient Records Page

#### 3.3.1 Patient List Sidebar
**Features:**
- Searchable patient list
- Patient cards showing:
  - Avatar image
  - Name
  - Age
  - Contact information
- Search functionality with real-time filtering
- Selected patient highlighting
- Scrollable list

#### 3.3.2 Patient Details View
**Features:**
- **Patient Header:**
  - Large avatar with colored border
  - Patient name and ID
  - Age, gender, blood type badges
  - "New Entry" button
  
- **Medical History Timeline:**
  - Chronological list of records
  - Each record shows:
    - Date
    - Diagnosis
    - Symptoms
    - Treatment
    - Doctor and secretary names
    - Attachments (if any)
  - Edit and delete actions
  - View attachment functionality
  - Scroll to record feature

#### 3.3.3 Modals
- **Add/Edit Record Modal:**
  - Form fields for diagnosis, symptoms, treatment
  - Date picker
  - Attachment upload
  - Save/Cancel buttons
  
- **Delete Record Modal:**
  - Confirmation dialog
  - Warning message
  
- **Attachment View Modal:**
  - Full-screen attachment viewer
  - Close button

#### 3.3.4 Empty State
- Displayed when no patient selected
- Centered message with icon
- Theme-aware styling

### 3.4 Prescriptions Page

#### 3.4.1 Patient Selector
**Features:**
- Sidebar with patient list
- Search functionality
- Selected patient highlighting
- Similar to Patient Records sidebar

#### 3.4.2 Prescription Management
**Features:**
- **Patient Header:**
  - Patient avatar and details
  - Prescription count badge
  - "New Prescription" button
  
- **Prescription History:**
  - List of all prescriptions for selected patient
  - Prescription cards showing:
    - Date
    - Medicines list
    - Dosage information
    - Status (draft/sent)
  - View prescription button
  - Download functionality
  - Send prescription button

#### 3.4.3 Prescription Form Modal
**Features:**
- Patient information display
- Medicine search and autocomplete
- Medicine suggestion list
- Add/remove medicines
- Dosage and frequency inputs
- Instructions field
- Save and send options

#### 3.4.4 View Prescription Modal
**Features:**
- Full prescription details
- Formatted medicine list
- Download as PDF button
- Send to patient button
- Print functionality

### 3.5 Finance & Invoicing Page

#### 3.5.1 Tab Navigation
**Tabs:**
- Overview
- Invoices
- Payments

#### 3.5.2 Overview Tab
**Features:**
- Financial statistics cards:
  - Total Revenue
  - Pending Payments
  - Overdue Invoices
  - This Month Revenue
- Revenue chart (line chart)
- Payment methods breakdown (pie chart)
- Date range filter

#### 3.5.3 Invoices Tab
**Features:**
- Invoice list with:
  - Invoice number
  - Patient name
  - Amount
  - Status (Paid/Pending/Overdue)
  - Due date
  - Actions (View, Mark as Paid)
- Search functionality
- Status filter
- Create invoice button

#### 3.5.4 Payments Tab
**Features:**
- Payment history list
- Payment details:
  - Date
  - Amount
  - Method
  - Invoice reference
- Search and filter options

#### 3.5.5 Create Invoice Modal
**Features:**
- Patient selection
- Service description
- Amount input
- Due date picker
- Notes field
- Save button

### 3.6 Messaging Page

#### 3.6.1 Contact List
**Features:**
- Sidebar with contacts
- Contact cards showing:
  - Avatar
  - Name
  - Role badge (Doctor/Secretary/Patient)
  - Last message preview
  - Timestamp
  - Online status indicator
- Selected contact highlighting
- Scrollable list

#### 3.6.2 Chat Window
**Features:**
- Chat header with contact info
- Message list with:
  - Message bubbles (sent/received)
  - Sender name and role
  - Timestamp
  - Role badges
- Message input field
- Send button
- Auto-scroll to latest message

#### 3.6.3 Message Components
- **Message Bubble:**
  - Different styles for sent/received
  - Theme-aware colors
  - Role badge display
  
- **Role Badge:**
  - Color-coded by role
  - Doctor: Blue
  - Secretary: Green
  - Patient: Purple

### 3.7 Schedule & Availability Page

#### 3.7.1 Schedule Manager
**Features:**
- Calendar view
- Appointment queue
- Time slot management
- Add/edit/delete appointments
- Availability settings

#### 3.7.2 Calendar View
**Features:**
- Monthly calendar display
- Appointment markers
- Date selection
- Navigation (prev/next month)

#### 3.7.3 Appointment Queue
**Features:**
- List of appointments for selected date
- Appointment details
- Status indicators
- Quick actions

### 3.8 Profile & Settings Page

#### 3.8.1 Profile Header
**Features:**
- Page title
- Breadcrumb navigation
- Action buttons

#### 3.8.2 Profile Avatar Section
**Features:**
- Large avatar display
- Change photo button
- Upload functionality

#### 3.8.3 Profile Form
**Features:**
- Full name input
- Email input
- Phone number input (formatted)
- Save/Cancel buttons

#### 3.8.4 Password Section
**Features:**
- Toggle to show password fields
- Password input with strength indicator
- Confirm password field
- Password strength meter:
  - Weak (red)
  - Medium (orange)
  - Strong (green)
- Password match validation

### 3.9 Website Settings Page

#### 3.9.1 Tab Navigation
**Tabs:**
- Header Settings
- Treatments
- Footer Settings

#### 3.9.2 Header Settings
**Features:**
- Logo upload
- Hero image upload
- Title and subtitle inputs
- Navigation links management

#### 3.9.3 Treatments Settings
**Features:**
- Treatment cards list
- Add/edit/delete treatments
- Treatment card editor:
  - Image upload
  - Title input
  - Description input
  - Link input

#### 3.9.4 Footer Settings
**Features:**
- Logo upload
- Description textarea
- Contact information:
  - Phone
  - Email
  - Address
- Copyright text
- Social media links

## 4. Design System & Styling

### 4.1 Color Theme

#### 4.1.1 Light Theme
```javascript
{
  primary: '#7C3AED',      // Purple
  secondary: '#F1F5F9',      // Light gray
  accent: '#0EA5E9',        // Sky blue
  muted: '#E2E8F0',         // Light gray
  text: '#1F2937',          // Dark gray
  cardBg: '#FFFFFF',        // White
  success: '#10B981',       // Green
  warning: '#F59E0B',       // Orange
  danger: '#EF4444',        // Red
  border: '#E5E7EB'         // Light border
}
```

#### 4.1.2 Dark Theme
```javascript
{
  primary: '#A78BFA',       // Light purple
  secondary: '#1E293B',     // Dark slate
  accent: '#38BDF8',        // Light blue
  muted: '#475569',         // Slate gray
  text: '#F1F5F9',          // Light gray
  cardBg: '#1E293B',        // Dark slate
  background: '#0F172A',    // Very dark blue
  success: '#34D399',       // Light green
  warning: '#FBBF24',       // Yellow
  danger: '#F87171',        // Light red
  border: '#334155'         // Dark border
}
```

### 4.2 Typography
- **Font Family:** Inter, system-ui, sans-serif
- **Font Sizes:**
  - Headings: text-2xl, text-3xl, text-lg
  - Body: text-sm, text-base
  - Small text: text-xs
- **Font Weights:**
  - Regular: 400
  - Medium: 500
  - Semibold: 600
  - Bold: 700
  - Black: 900

### 4.3 Spacing & Layout
- **Container Padding:**
  - Mobile: 1rem (16px)
  - Desktop: 2rem (32px)
- **Card Padding:**
  - Standard: p-6 (24px)
  - Large: p-8 (32px)
- **Gap Spacing:**
  - Small: gap-2 (8px)
  - Medium: gap-4 (16px)
  - Large: gap-6 (24px)

### 4.4 Border Radius
- **Small:** rounded-lg (8px)
- **Medium:** rounded-xl (12px)
- **Large:** rounded-2xl (16px)
- **Full:** rounded-full (9999px)

### 4.5 Shadows
- **Card Shadow:** shadow-lg
- **Modal Shadow:** shadow-2xl
- **Hover Effects:** scale-105, scale-110

### 4.6 Animations
- **Fade In:** animate-fade-in
- **Slide Transitions:** transition-all duration-300
- **Hover Effects:** transition-transform, transition-colors
- **Background Animations:**
  - Grid animation
  - Particle floating
  - Wave animations
  - Orb movements
  - Radial pulse

### 4.7 Responsive Design
- **Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Mobile Features:**
  - Sidebar overlays content
  - Backdrop blur on sidebar open
  - Collapsible sections
  - Stacked layouts
- **Desktop Features:**
  - Sidebar pushes content
  - Multi-column layouts
  - Hover effects
  - Expanded information display

## 5. User Interactions

### 5.1 Keyboard Shortcuts
- **Escape Key:**
  - Closes open modals
  - Closes dropdowns
  - Deselects patient (Patient Records)

### 5.2 Mouse Interactions
- **Hover Effects:**
  - Button scale animations
  - Color transitions
  - Icon scale effects
- **Click Actions:**
  - Modal open/close
  - Navigation
  - Form submissions
  - Item selection

### 5.3 Touch Interactions (Mobile)
- **Swipe Gestures:**
  - Sidebar swipe to close
- **Tap Actions:**
  - Modal open/close
  - Navigation
  - Form interactions

## 6. Data Management

### 6.1 Mock Data Structure
- **Patients:** Array of patient objects with history
- **Prescriptions:** Array of prescription objects
- **Appointments:** Array of appointment objects
- **Invoices:** Array of invoice objects
- **Payments:** Array of payment objects
- **Notifications:** Array of notification objects

### 6.2 State Management
- React useState hooks for local state
- React useEffect for side effects
- Custom hooks (useFinanceData)
- Context API for theme management

## 7. API Integration

### 7.1 Services
- **landingPageApi.js:**
  - getLandingPageSettings()
  - updateLandingPageSettings()
  - Image upload handling

### 7.2 API Endpoints (Planned)
- Patient records CRUD
- Prescription management
- Invoice creation and management
- Payment tracking
- Appointment scheduling
- Messaging system

## 8. Accessibility Features

### 8.1 Keyboard Navigation
- Tab navigation through interactive elements
- Enter/Space for button activation
- Escape for closing modals

### 8.2 Screen Reader Support
- Semantic HTML elements
- ARIA labels (to be implemented)
- Alt text for images

### 8.3 Visual Accessibility
- High contrast color schemes
- Clear focus indicators
- Readable font sizes
- Icon + text labels

## 9. Performance Optimizations

### 9.1 Code Splitting
- Route-based code splitting
- Lazy loading of components

### 9.2 Rendering Optimizations
- React.memo for expensive components
- useMemo for computed values
- useCallback for event handlers

### 9.3 Asset Optimization
- Image optimization
- CSS minification
- JavaScript bundling

## 10. Browser Compatibility

### 10.1 Supported Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### 10.2 Mobile Support
- iOS Safari
- Chrome Mobile
- Responsive design for all screen sizes

## 11. Future Enhancements

### 11.1 Planned Features
- Real-time notifications
- Video consultation integration
- Advanced analytics dashboard
- Export functionality (PDF, CSV)
- Multi-language support
- Advanced search and filters
- Calendar integration (Google Calendar, Outlook)
- Email notifications
- SMS reminders
- Patient portal integration

### 11.2 Technical Improvements
- Backend API integration
- Database connectivity
- Authentication system
- Role-based access control
- File upload to cloud storage
- Real-time messaging (WebSocket)
- Offline support (PWA)
- Unit and integration tests
- Performance monitoring
- Error tracking

## 12. Component Dependencies

### 12.1 External Libraries
- **React:** ^18.2.0
- **React Router DOM:** ^7.9.6
- **Recharts:** ^3.5.1 (for charts)
- **Lucide React:** ^0.294.0 (for icons)
- **Framer Motion:** ^10.16.16 (for animations)
- **React Day Picker:** ^9.11.3 (for date pickers)
- **FullCalendar:** ^6.1.19 (for calendar views)

### 12.2 Internal Components
- StatCard
- MedicalBackground
- Various modal components
- Form components
- List components

## 13. File Structure Reference

```
src/components/doctor/
├── components/
│   ├── dashboard/
│   │   ├── AddSlotModal.jsx
│   │   └── RecentActivityModal.jsx
│   ├── messaging/
│   │   ├── ChatWindow.jsx
│   │   ├── ContactList.jsx
│   │   ├── MessageBubble.jsx
│   │   └── RoleBadge.jsx
│   ├── patient-records/
│   │   ├── AddRecordModal.jsx
│   │   ├── AttachmentViewModal.jsx
│   │   ├── DeleteRecordModal.jsx
│   │   ├── EmptyPatientState.jsx
│   │   ├── MedicalHistoryTimeline.jsx
│   │   ├── PatientDetailsHeader.jsx
│   │   └── PatientListSidebar.jsx
│   ├── prescriptions/
│   │   ├── DownloadButton.jsx
│   │   ├── MedicineSuggestionList.jsx
│   │   ├── PatientSelector.jsx
│   │   ├── PrescriptionCard.jsx
│   │   ├── PrescriptionForm.jsx
│   │   ├── PrescriptionHistoryList.jsx
│   │   ├── SendPrescriptionButton.jsx
│   │   └── ViewPrescriptionModal.jsx
│   ├── profile/
│   │   ├── ProfileAvatarSection.jsx
│   │   ├── ProfileForm.jsx
│   │   ├── ProfileHeader.jsx
│   │   └── ProfilePasswordSection.jsx
│   ├── schedules/
│   │   ├── components/
│   │   │   ├── AppointmentQueue.jsx
│   │   │   ├── CalendarView.jsx
│   │   │   └── ScheduleManager.jsx
│   │   └── ScheduleQueue.jsx
│   ├── shared/
│   │   ├── MedicalBackground.jsx
│   │   └── StatCard.jsx
│   └── websiteSettings/
│       ├── components/
│       │   ├── ImageUploader.jsx
│       │   └── TreatmentCardEditor.jsx
│       ├── FooterSettings.jsx
│       ├── HeaderSettings.jsx
│       └── TreatmentsSettings.jsx
├── data/
│   └── MockData.js
├── finance/
│   ├── CreateInvoiceModal.jsx
│   ├── Finance.jsx
│   ├── SearchFilter.jsx
│   ├── StatCard.jsx
│   ├── StatusBadge.jsx
│   └── tabs/
│       ├── InvoicesTab.jsx
│       ├── OverviewTab.jsx
│       └── PaymentsTab.jsx
├── hooks/
│   └── useFinanceData.js
├── layout/
│   └── DoctorLayout.jsx
├── pages/
│   ├── AppointmentsPage.jsx
│   ├── DashboardPage.jsx
│   ├── FinancePage.jsx
│   ├── MessagingPage.jsx
│   ├── PatientRecordsPage.jsx
│   ├── PlaceholderPage.jsx
│   ├── PrescriptionsPage.jsx
│   ├── ProfilePage.jsx
│   └── WebsiteSettings.jsx
├── services/
│   └── landingPageApi.js
└── styles/
    ├── App.css
    ├── doctor.css
    ├── index.css
    └── theme.js
```

## 14. Conclusion

This PRD documents all functionalities, features, styles, and components of the Doctor Dashboard system. The system provides a comprehensive solution for healthcare providers to manage their practice efficiently with a modern, user-friendly interface that supports both light and dark themes, responsive design, and smooth animations.

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Maintained By:** Development Team

