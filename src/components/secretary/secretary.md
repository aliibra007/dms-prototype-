# Secretary Dashboard - Product Requirements Document (PRD)

## 1. Overview

The Secretary Dashboard is a comprehensive clinic management system designed for healthcare administrative staff to manage patient records, appointments, prescriptions, finances, and communication. The system features a modern, responsive design with dark/light theme support and an animated background, providing secretaries with the tools they need to efficiently support the clinic's operations.

## 2. Architecture & Structure

### 2.1 Component Structure
```
src/components/secretary/
├── components/          # Reusable UI components
│   ├── dashboard/      # Dashboard-specific components
│   ├── messaging/      # Messaging system components
│   ├── patients/       # Patient management components (merged records & prescriptions)
│   ├── profile/        # Profile management components
│   ├── schedules/      # Scheduling components
│   └── shared/         # Shared components
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
  - Secretary name and role
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
  3. Patients (Users icon) - **MERGED SECTION**
  4. Invoices & Finance (DollarSign icon)
  5. Messaging (MessageSquare icon)
  6. Profile & Settings (Settings icon)

**Note:** Website Settings removed from secretary dashboard

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
  - Pending Prescriptions (Pill icon)
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
  
- **Appointments Overview Chart:**
  - Bar chart showing monthly appointments
  - Custom color (#0EA5E9)
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
- Activities include: appointments, prescriptions, payments, patient registrations

#### 3.2.4 Upcoming Appointments
**Features:**
- List of upcoming appointments
- Patient name and appointment type
- Time display with clock icon
- "Add Appointment" button opens modal
- Appointment cards with theme colors

#### 3.2.5 Quick Actions Panel
**Features:**
- Quick access buttons for common tasks:
  - Register New Patient
  - Add Appointment
  - Create Invoice
  - Add Prescription
- Icon-based buttons with labels
- Gradient backgrounds

#### 3.2.6 Modals
- **Recent Activity Modal:**
  - Full list of activities
  - Scrollable content
  - Close on Escape key
  
- **Add Appointment Modal:**
  - Form to add new appointment
  - Patient selection
  - Doctor selection
  - Date/time picker
  - Appointment type selection
  - Notes field

#### 3.2.7 Pro Tips
**Features:**
- Dismissible tip banner
- Lightbulb icon
- Accent color background
- Close button (X icon)
- Secretary-specific tips

### 3.3 Patients Page (Merged Records & Prescriptions)

#### 3.3.1 Tab Navigation
**Tabs:**
- Medical Records
- Prescriptions

#### 3.3.2 Patient List Sidebar (Shared)
**Features:**
- Searchable patient list
- Patient cards showing:
  - Avatar image
  - Name
  - Age
  - Contact information
  - Last visit date
- Search functionality with real-time filtering
- Selected patient highlighting
- Scrollable list
- "Add New Patient" button at top

**Add Patient Modal:**
- Full name input
- Date of birth picker
- Gender selection
- Blood type selection
- Contact information (phone, email)
- Address field
- Emergency contact
- Save/Cancel buttons

#### 3.3.3 Medical Records Tab

**Features:**
- **Patient Header:**
  - Large avatar with colored border
  - Patient name and ID
  - Age, gender, blood type badges
  - Contact information display
  - "New Record" button
  
- **Medical History Timeline:**
  - Chronological list of records
  - Each record shows:
    - Date
    - Diagnosis
    - Symptoms
    - Treatment
    - Doctor name
    - Secretary name (who created the record)
    - Attachments (if any)
  - View and edit actions (no delete for secretary)
  - View attachment functionality
  - Scroll to record feature
  - Status badge (Completed/In Progress)

**Add/Edit Record Modal:**
- Patient information display (read-only)
- Date picker
- Doctor selection dropdown
- Diagnosis input
- Symptoms textarea
- Treatment plan textarea
- Attachment upload (images, PDFs)
- Status selection (In Progress/Completed)
- Save/Cancel buttons
- **Note:** Secretary cannot delete records, only add and edit

#### 3.3.4 Prescriptions Tab

**Features:**
- **Patient Header:**
  - Patient avatar and details
  - Prescription count badge
  - "New Prescription" button
  - "View All Prescriptions" toggle

- **Prescription Management:**
  - List of all prescriptions for selected patient
  - Prescription cards showing:
    - Date created
    - Doctor name
    - Medicines list with dosage
    - Prescription number
    - Status (Draft/Sent/Completed)
  - View prescription button
  - Download functionality
  - Send prescription button (if not sent)
  - Mark as completed

**Add Prescription Modal:**
- Patient information display (read-only)
- Date picker (defaults to today)
- Doctor selection dropdown (required)
- Medicine search and autocomplete
- Medicine suggestion list
- Add/remove medicines
- For each medicine:
  - Medicine name (searchable)
  - Dosage input
  - Frequency selection (Once/Twice/Three times daily, etc.)
  - Duration input (number of days)
- Instructions/Notes textarea
- Save as Draft button
- Save and Send button

**View Prescription Modal:**
- Full prescription details
- Formatted medicine list
- Doctor signature area
- Download as PDF button
- Send to patient button
- Print functionality
- Mark as completed button

#### 3.3.5 Empty State
- Displayed when no patient selected
- Centered message with icon
- Theme-aware styling
- "Select a patient" prompt

### 3.4 Finance & Invoicing Page

#### 3.4.1 Tab Navigation
**Tabs:**
- Overview
- Invoices
- Payments

#### 3.4.2 Overview Tab
**Features:**
- Financial statistics cards:
  - Total Revenue (with percentage change)
  - Pending Payments (with count)
  - Overdue Invoices (with count)
  - This Month Revenue (with comparison)
- Revenue chart (line chart)
- Payment methods breakdown (pie chart)
- Date range filter
- Export button (PDF/CSV)

#### 3.4.3 Invoices Tab
**Features:**
- Invoice list with:
  - Invoice number (auto-generated)
  - Patient name
  - Amount
  - Status (Paid/Pending/Overdue)
  - Due date
  - Actions (View, Mark as Paid, Send Reminder, Download)
- Search functionality
- Status filter (All/Paid/Pending/Overdue)
- Date range filter
- Create invoice button
- Bulk actions (select multiple invoices)

**Invoice Details:**
- Patient information
- Service/treatment breakdown
- Subtotal, tax, total
- Payment status
- Payment method (if paid)
- Notes

#### 3.4.4 Payments Tab
**Features:**
- Payment history list
- Payment details:
  - Date and time
  - Amount
  - Payment method (Cash/Card/Insurance/Online)
  - Invoice reference
  - Patient name
  - Receipt number
- Search and filter options
- Export functionality
- Add manual payment button

**Record Payment Modal:**
- Invoice selection
- Amount input (auto-filled from invoice)
- Payment method selection
- Payment date picker
- Reference number input
- Notes field
- Save button

#### 3.4.5 Create Invoice Modal
**Features:**
- Patient selection (searchable dropdown)
- Service/treatment items:
  - Add multiple items
  - Item description
  - Quantity
  - Unit price
  - Subtotal (auto-calculated)
- Discount field (percentage or fixed)
- Tax calculation (auto-calculated)
- Total amount display
- Due date picker
- Payment terms selection
- Notes field
- Save as Draft button
- Save and Send button

### 3.5 Messaging Page

#### 3.5.1 Contact List
**Features:**
- Sidebar with contacts
- Contact cards showing:
  - Avatar
  - Name
  - Role badge (Doctor/Secretary/Patient)
  - Last message preview
  - Timestamp
  - Online status indicator
  - Unread message count badge
- Filter by role (All/Doctors/Patients/Secretaries)
- Search contacts
- Selected contact highlighting
- Scrollable list

#### 3.5.2 Chat Window
**Features:**
- Chat header with:
  - Contact avatar and name
  - Online status
  - Role badge
  - Info button (opens contact details)
- Message list with:
  - Message bubbles (sent/received)
  - Sender name and role
  - Timestamp
  - Read receipts
  - Role badges
- Message input field with:
  - Text input
  - Attachment button (images, documents)
  - Emoji picker
  - Send button
- Auto-scroll to latest message
- Typing indicator

#### 3.5.3 Message Components
- **Message Bubble:**
  - Different styles for sent/received
  - Theme-aware colors
  - Role badge display
  - Attachment preview
  - Message actions (delete for own messages)
  
- **Role Badge:**
  - Color-coded by role
  - Doctor: Blue
  - Secretary: Green
  - Patient: Purple

#### 3.5.4 Contact Details Panel
**Features:**
- Contact information
- Shared files
- Quick actions (call, email)

### 3.6 Schedule & Availability Page

#### 3.6.1 Schedule Manager
**Features:**
- Calendar view (month/week/day views)
- Doctor filter (view specific doctor's schedule)
- Appointment queue
- Time slot management
- Add/edit/delete appointments
- View doctor availability

#### 3.6.2 Calendar View
**Features:**
- Monthly/weekly/daily calendar display
- Appointment markers with color coding by doctor
- Date selection
- Navigation (prev/next month/week/day)
- Today button
- Appointment details on hover
- Click to view/edit appointment

#### 3.6.3 Appointment Queue
**Features:**
- List of appointments for selected date
- Grouped by doctor
- Appointment details:
  - Patient name and photo
  - Doctor name
  - Appointment time
  - Appointment type
  - Status (Scheduled/In Progress/Completed/Cancelled)
- Quick actions:
  - Check-in patient
  - Reschedule
  - Cancel
  - Mark as completed
- Filter by status
- Search appointments

#### 3.6.4 Add/Edit Appointment Modal
**Features:**
- Patient selection (searchable)
- Doctor selection (with availability indicator)
- Date picker
- Time slot selection (shows available slots)
- Appointment type selection
- Duration selection
- Reason for visit
- Notes field
- Reminder settings (SMS/Email)
- Save button

#### 3.6.5 Doctor Availability View
**Features:**
- View each doctor's working hours
- Weekly schedule grid
- Available/Unavailable status
- **Note:** Secretary can view but not edit doctor availability

### 3.7 Profile & Settings Page

#### 3.7.1 Profile Header
**Features:**
- Page title
- Breadcrumb navigation
- "Secretary Dashboard" subtitle

#### 3.7.2 Profile Avatar Section
**Features:**
- Large avatar display
- Change photo button
- Upload functionality
- Remove photo option

#### 3.7.3 Profile Form
**Features:**
- Full name input
- Email input (read-only for work email)
- Phone number input (formatted)
- Personal email input
- Department/Role display
- Save/Cancel buttons
- Success/error notifications

#### 3.7.4 Password Section
**Features:**
- Toggle to show password fields
- Current password input
- New password input with strength indicator
- Confirm password field
- Password strength meter:
  - Weak (red)
  - Medium (orange)
  - Strong (green)
- Password match validation
- Password requirements list
- Change password button

#### 3.7.5 Preferences Section
**Features:**
- Notification preferences:
  - Email notifications toggle
  - SMS notifications toggle
  - Desktop notifications toggle
- Language selection
- Date format preference
- Time format preference (12h/24h)
- Default dashboard view

## 4. Design System & Styling

### 4.1 Color Theme

#### 4.1.1 Light Theme
```javascript
{
  primary: '#0EA5E9',       // Sky blue (instead of purple)
  secondary: '#F1F5F9',     // Light gray
  accent: '#10B981',        // Green
  muted: '#E2E8F0',         // Light gray
  text: '#1F2937',          // Dark gray
  cardBg: '#FFFFFF',        // White
  success: '#10B981',       // Green
  warning: '#F59E0B',       // Orange
  danger: '#EF4444',        // Red
  border: '#E5E7EB',        // Light border
  info: '#3B82F6'          // Blue
}
```

#### 4.1.2 Dark Theme
```javascript
{
  primary: '#38BDF8',       // Light sky blue
  secondary: '#1E293B',     // Dark slate
  accent: '#34D399',        // Light green
  muted: '#475569',         // Slate gray
  text: '#F1F5F9',          // Light gray
  cardBg: '#1E293B',        // Dark slate
  background: '#0F172A',    // Very dark blue
  success: '#34D399',       // Light green
  warning: '#FBBF24',       // Yellow
  danger: '#F87171',        // Light red
  border: '#334155',        // Dark border
  info: '#60A5FA'          // Light blue
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
  - Bottom navigation bar (optional)
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
  - Deselects patient
- **Ctrl/Cmd + K:**
  - Opens quick search
- **Ctrl/Cmd + N:**
  - New appointment (when on schedule page)

### 5.2 Mouse Interactions
- **Hover Effects:**
  - Button scale animations
  - Color transitions
  - Icon scale effects
  - Tooltip displays
- **Click Actions:**
  - Modal open/close
  - Navigation
  - Form submissions
  - Item selection
- **Right-click:**
  - Context menus (appointments, patients)

### 5.3 Touch Interactions (Mobile)
- **Swipe Gestures:**
  - Sidebar swipe to close
  - Card swipe for actions
- **Tap Actions:**
  - Modal open/close
  - Navigation
  - Form interactions
- **Long Press:**
  - Context menus

## 6. Data Management

### 6.1 Mock Data Structure
- **Patients:** Array of patient objects with medical history and prescriptions
- **Appointments:** Array of appointment objects with doctor and patient references
- **Invoices:** Array of invoice objects
- **Payments:** Array of payment objects
- **Notifications:** Array of notification objects
- **Messages:** Array of message objects grouped by conversation

### 6.2 State Management
- React useState hooks for local state
- React useEffect for side effects
- Custom hooks (useFinanceData, usePatientsData, useAppointments)
- Context API for:
  - Theme management
  - User authentication
  - Notification system

### 6.3 Local Storage
- User preferences
- Theme selection
- Recent searches
- Draft messages

## 7. API Integration

### 7.1 Services
- **patientsApi.js:**
  - getPatients()
  - getPatientById()
  - createPatient()
  - updatePatient()
  - getMedicalRecords()
  - createMedicalRecord()
  - updateMedicalRecord()
  - getPrescriptions()
  - createPrescription()
  - updatePrescription()
  
- **appointmentsApi.js:**
  - getAppointments()
  - createAppointment()
  - updateAppointment()
  - cancelAppointment()
  - getDoctorAvailability()
  
- **financeApi.js:**
  - getInvoices()
  - createInvoice()
  - updateInvoice()
  - recordPayment()
  - getFinanceStats()
  
- **messagingApi.js:**
  - getConversations()
  - getMessages()
  - sendMessage()
  - markAsRead()

### 7.2 API Endpoints (Planned)
- Patient management CRUD
- Medical records CRUD
- Prescription management
- Appointment scheduling
- Invoice creation and management
- Payment tracking
- Messaging system
- Notifications

## 8. Accessibility Features

### 8.1 Keyboard Navigation
- Tab navigation through interactive elements
- Enter/Space for button activation
- Escape for closing modals
- Arrow keys for dropdown navigation

### 8.2 Screen Reader Support
- Semantic HTML elements
- ARIA labels for all interactive elements
- ARIA live regions for notifications
- Alt text for all images
- Role attributes for custom components

### 8.3 Visual Accessibility
- High contrast color schemes
- WCAG AA compliance (minimum)
- Clear focus indicators
- Readable font sizes (minimum 14px)
- Icon + text labels for actions
- Color is not the only indicator of state

## 9. Performance Optimizations

### 9.1 Code Splitting
- Route-based code splitting
- Lazy loading of components
- Dynamic imports for heavy features

### 9.2 Rendering Optimizations
- React.memo for expensive components
- useMemo for computed values
- useCallback for event handlers
- Virtual scrolling for long lists
- Debounced search inputs

### 9.3 Asset Optimization
- Image lazy loading
- Image optimization (WebP format)
- CSS minification
- JavaScript bundling
- Font subsetting

### 9.4 Caching Strategy
- API response caching
- Local storage for preferences
- Service worker for offline support

## 10. Browser Compatibility

### 10.1 Supported Browsers
- Chrome (latest, latest-1)
- Firefox (latest, latest-1)
- Safari (latest, latest-1)
- Edge (latest, latest-1)

### 10.2 Mobile Support
- iOS Safari (iOS 14+)
- Chrome Mobile (latest)
- Samsung Internet
- Responsive design for all screen sizes (320px - 4K)

## 11. Security & Permissions

### 11.1 Secretary Permissions
**Allowed Actions:**
- View all patient records
- Add and edit medical records
- Create and manage prescriptions (with doctor assignment)
- Manage all appointments
- Create and manage invoices
- Record payments
- Send messages to doctors and patients
- View financial reports

**Restricted Actions:**
- Cannot delete medical records (only doctors can)
- Cannot modify doctor availability settings
- Cannot update website settings
- Cannot access system administration features
- Cannot delete patients from the system
- Cannot modify other secretary's records without permission

### 11.2 Data Privacy
- Patient data encryption
- Secure authentication
- Session management
- Activity logging
- HIPAA compliance considerations

## 12. Notifications & Alerts

### 12.1 Notification Types
- **Appointment Reminders:**
  - Upcoming appointments
  - Appointment confirmations
  - Cancellations
  
- **Patient Notifications:**
  - New patient registrations
  - Patient check-ins
  - Pending prescriptions
  
- **Financial Notifications:**
  - Payment received
  - Invoice overdue
  - Payment reminders sent
  
- **System Notifications:**
  - Low stock alerts
  - System updates
  - Important announcements

### 12.2 Notification Settings
- Enable/disable by type
- Email notifications
- SMS notifications
- Desktop push notifications
- In-app notification center

## 13. Future Enhancements

### 13.1 Planned Features
- Bulk appointment scheduling
- Patient portal integration
- Insurance claim management
- Inventory management
- Lab results integration
- Automated appointment reminders
- Video consultation scheduling
- Multi-language support
- Advanced reporting and analytics
- Export functionality (PDF, Excel, CSV)
- Email integration
- SMS gateway integration
- WhatsApp integration
- Telehealth scheduling
- Waiting room management system

### 13.2 Technical Improvements
- Real-time collaboration features
- Offline mode with sync
- Mobile app (React Native)
- Advanced search with filters
- Barcode/QR code scanning for patient check-in
- Voice commands
- Integration with EHR systems
- Integration with accounting software
- Automated backup system
- Multi-clinic support
- Role-based dashboards
- Unit and integration tests
- E2E testing
- Performance monitoring
- Error tracking and reporting

## 14. Component Dependencies

### 14.1 External Libraries
- **React:** ^18.2.0
- **React Router DOM:** ^7.9.6
- **Recharts:** ^3.5.1 (for charts)
- **Lucide React:** ^0.294.0 (for icons)
- **Framer Motion:** ^10.16.16 (for animations)
- **React Day Picker:** ^9.11.3 (for date pickers)
- **FullCalendar:** ^6.1.19 (for calendar views)
- **React Hook Form:** ^7.45.0 (for form management)
- **Date-fns:** ^2.30.0 (for date formatting)

### 14.2 Internal Components
- StatCard
- MedicalBackground
- Various modal components
- Form components
- List components
- Table components
- Search components
- Filter components

## 15. File Structure Reference

```
src/components/secretary/
├── components/
│   ├── dashboard/
│   │   ├── AddAppointmentModal.jsx
│   │   ├── QuickActionsPanel.jsx
│   │   └── RecentActivityModal.jsx
│   ├── messaging/
│   │   ├── ChatWindow.jsx
│   │   ├── ContactDetailsPanel.jsx
│   │   ├── ContactList.jsx
│   │   ├── MessageBubble.jsx
│   │   └── RoleBadge.jsx
│   ├── patients/
│   │   ├── medical-records/
│   │   │   ├── AddRecordModal.jsx
│   │   │   ├── AttachmentViewModal.jsx
│   │   │   ├── MedicalHistoryTimeline.jsx
│   │   │   └── PatientDetailsHeader.jsx
│   │   ├── prescriptions/
│   │   │   ├── AddPrescriptionModal.jsx
│   │   │   ├── MedicineSuggestionList.jsx
│   │   │   ├── PrescriptionCard.jsx
│   │   │   ├── PrescriptionHistoryList.jsx
│   │   │   └── ViewPrescriptionModal.jsx
│   │   ├── AddPatientModal.jsx
│   │   ├── EmptyPatientState.jsx
│   │   ├── PatientListSidebar.jsx
│   │   └── PatientTabNavigation.jsx
│   ├── profile/
│   │   ├── PreferencesSection.jsx
│   │   ├── ProfileAvatarSection.jsx
│   │   ├── ProfileForm.jsx
│   │   ├── ProfileHeader.jsx
│   │   └── ProfilePasswordSection.jsx
│   ├── schedules/
│   │   ├── components/
│   │   │   ├── AddAppointmentModal.jsx
│   │   │   ├── AppointmentQueue.jsx
│   │   │   ├── CalendarView.jsx
│   │   │   ├── DoctorAvailabilityView.jsx
│   │   │   └── ScheduleManager.jsx
│   │   └── ScheduleFilters.jsx
│   └── shared/
│       ├── MedicalBackground.jsx
│       ├── StatCard.jsx
│       └── StatusBadge.jsx
├── data/
│   └── MockData.js
├── finance/
│   ├── CreateInvoiceModal.jsx
│   ├── Finance.jsx
│   ├── RecordPaymentModal.jsx
│   ├── SearchFilter.jsx
│   ├── StatCard.jsx
│   ├── StatusBadge.jsx
│   └── tabs/
│       ├── InvoicesTab.jsx
│       ├── OverviewTab.jsx
│       └── PaymentsTab.jsx
├── hooks/
│   ├── useAppointments.js
│   ├── useFinanceData.js
│   └── usePatientsData.js
├── layout/
│   └── SecretaryLayout.jsx
├── pages/
│   ├── AppointmentsPage.jsx
│   ├── DashboardPage.jsx
│   ├── FinancePage.jsx
│   ├── MessagingPage.jsx
│   ├── PatientsPage.jsx
│   └── ProfilePage.jsx
├── services/
│   ├── appointmentsApi.js
│   ├── financeApi.js
│   ├── messagingApi.js
│   └── patientsApi.js
└── styles/
    ├── App.css
    ├── index.css
    ├── secretary.css
    └── theme.js
```

## 16. Key Differences from Doctor Dashboard

### 16.1 Removed Features
- **Website Settings Page:** Secretaries cannot modify the clinic's website
- **Delete Medical Records:** Secretaries can only add and edit, not delete
- **Modify Doctor Availability:** Secretaries can view but not change doctor schedules

### 16.2 Modified Features
- **Merged Patient Section:** Patient Records and Prescriptions are now in one "Patients" page with tabs
- **Color Scheme:** Primary color changed from purple to sky blue
- **Dashboard Stats:** Changed to reflect secretary-relevant metrics
- **Prescription Creation:** Must assign a doctor when creating prescriptions
- **Medical Records:** Secretary name is displayed instead of being hidden

### 16.3 Added Features
- **Quick Actions Panel:** Fast access to common tasks on dashboard
- **Add Patient Functionality:** Dedicated modal for registering new patients
- **Record Payment Modal:** Simplified payment recording
- **Doctor Selection:** Added to appointment and prescription creation
- **Preferences Section:** More detailed user preferences in profile

### 16.4 Permission-Based UI
- Buttons and actions are shown/hidden based on secretary permissions
- Read-only fields for restricted data
- Warning messages for restricted actions
- Role badge displays "Secretary" instead of "Doctor"

## 17. Conclusion

This PRD documents all functionalities, features, styles, and components of the Secretary Dashboard system. The system provides a comprehensive solution for healthcare administrative staff to efficiently manage clinic operations with a modern, user-friendly interface that supports both light and dark themes, responsive design, and smooth animations. The secretary dashboard is designed to complement the doctor dashboar