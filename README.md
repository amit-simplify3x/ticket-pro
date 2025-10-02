# TicketPro - Counter-Based Ticket Booking Application

A modern, responsive web application for booking tickets similar to MakeMyTrip and ConfirmTkt. Built with React, TypeScript, and Tailwind CSS.

## Features

### 🎫 Ticket Booking
- **Comprehensive Booking Form**: Complete passenger details, journey information, and travel preferences
- **Multiple Passengers**: Support for booking multiple passengers in a single transaction
- **Real-time Validation**: Form validation with error handling and user feedback
- **Dynamic Fare Calculation**: Automatic fare calculation based on class and passenger count

### 🖨️ Ticket Management
- **Professional Ticket Design**: Matches the provided PDF format with all required fields
- **Barcode Generation**: Automatic barcode generation using JsBarcode library
- **PDF Export**: Generate and download tickets as PDF files
- **Print Support**: Optimized print styles for physical ticket printing

### 📱 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Booking History**: View and manage all previous bookings
- **Status Tracking**: Real-time booking status (Confirmed, Pending, Cancelled)

### 🔧 Technical Features
- **React Router**: Client-side routing for seamless navigation
- **Context API**: Centralized state management for ticket data
- **TypeScript**: Type-safe development with full TypeScript support
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Page footer
│   ├── Layout.tsx      # Main layout wrapper
│   └── TicketDisplay.tsx # Ticket display component
├── context/            # React Context for state management
│   └── TicketContext.tsx # Ticket data context
├── pages/              # Main application pages
│   ├── Home.tsx        # Landing page
│   ├── BookTicket.tsx  # Ticket booking form
│   ├── ViewTicket.tsx  # Individual ticket view
│   └── BookingHistory.tsx # Booking history page
├── App.tsx             # Main app component with routing
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ticket
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Dependencies

### Core Dependencies
- **React 19.1.1**: Modern React with latest features
- **React Router DOM**: Client-side routing
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework

### Feature-Specific Dependencies
- **JsBarcode**: Barcode generation for tickets
- **jsPDF**: PDF generation functionality
- **html2canvas**: Convert HTML elements to canvas for PDF
- **date-fns**: Date formatting and manipulation
- **Lucide React**: Modern icon library

## Usage Guide

### 1. Booking a Ticket
1. Navigate to "Book Ticket" from the main navigation
2. Fill in primary passenger details (name, passport, age)
3. Select journey details (from, to, date, time, class)
4. Add additional passengers if needed
5. Review fare summary and submit booking
6. Receive instant confirmation with ticket display

### 2. Viewing Tickets
- Access individual tickets via booking history
- View complete ticket details with barcode
- Print or download as PDF
- All ticket information matches the provided PDF format

### 3. Managing Bookings
- View all bookings in the history page
- Filter and search through past bookings
- Quick access to ticket details and downloads
- Status tracking for each booking

## Ticket Features

The generated tickets include all elements from the provided PDF:

### Header Section
- Company branding and logo
- Ticket serial number
- Booking date and confirmation

### Passenger Information
- Primary passenger details
- Complete passenger list with ID information
- Age, gender, and identification details

### Journey Details
- Departure and destination cities
- Travel date and time
- Class of service
- Booking status

### Additional Features
- Barcode for verification
- Fare breakdown and total cost
- Terms and conditions
- Contact information
- Print-optimized layout

## Responsive Design

The application is fully responsive with:
- **Mobile-first approach**: Optimized for mobile devices
- **Tablet support**: Adapted layouts for medium screens
- **Desktop experience**: Full-featured desktop interface
- **Print optimization**: Special styles for ticket printing

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Responsive design principles
- Accessibility considerations

## Future Enhancements

Potential features for future versions:
- Payment gateway integration
- Email ticket delivery
- SMS notifications
- Advanced search and filtering
- Multi-language support
- Admin dashboard
- Seat selection
- Real-time availability

## Support

For technical support or questions:
- Email: support@ticketpro.com
- Phone: +1 (555) 123-4567

## License

This project is developed as a custom solution for counter-based ticket booking operations.

---

**Note**: This application is designed to replicate the functionality and design of professional ticket booking systems like MakeMyTrip and ConfirmTkt, with a focus on counter-based operations and PDF ticket generation.