# Header Component -- Product Requirements Document (PRD)

## 1. Overview

The Header component is a top navigation bar used across the application
to provide quick access to global features such as navigation,
notifications, and user profile. It remains fixed at the top of the
screen and follows the application's brand styling.

## 2. Goals

-   Provide consistent navigation entry points across all screens.
-   Display user notifications with badge indicators.
-   Provide access to the user's profile menu.
-   Maintain a clean, responsive layout.

## 3. Functional Requirements

### 3.1 Navigation Menu Button

-   Positioned on the left side of the header.
-   Displays a hamburger icon (☰).
-   When clicked:
    -   Opens the side navigation drawer.
-   Icon must have clear tap/click area (\~40x40px).

### 3.2 App Icon Button

-   Displays a stethoscope icon.
-   Positioned next to the navigation menu button.
-   Acts as a shortcut to the Dashboard / Home.

### 3.3 Notifications

-   Bell icon displayed on the right side.
-   Includes a red badge showing unread notifications count.
-   When clicked:
    -   Opens the notifications panel or dropdown.

### 3.4 User Avatar (Profile Button)

-   Displayed on the far right.
-   Shows user initials inside a circular avatar.
-   When clicked:
    -   Opens a profile menu with settings and logout.

## 4. UI / Styling Requirements

### 4.1 General Layout

-   Header height: 56--64px
-   Background: Primary brand color (purple)
-   Horizontal alignment with proper spacing.

### 4.2 Colors

-   Icons: white or light variant.
-   Badge: #FF3B30 red.
-   Avatar background: lighter purple.

### 4.3 Typography

-   Avatar initials: Bold.
-   Badge text: 10--12px bold.

## 5. Interaction Requirements

-   Buttons must have hover, focus, and active states.
-   Header stays fixed on top during scroll.
-   Full keyboard accessibility.
-   Screen reader labels required.

## 6. Responsiveness

-   Spacing adjusts on small screens.
-   Badge remains readable.
-   Icons remain visible on all widths.

## 7. Non-Functional Requirements

-   Must load instantly (\<100ms).
-   Cross-browser compatibility.
-   Lightweight DOM structure.
