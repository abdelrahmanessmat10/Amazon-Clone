# Amazon Clone Project

This is a comprehensive, responsive Amazon clone built with vanilla HTML, CSS, and JavaScript. This project focuses on demonstrating modern JavaScript practices, Object-Oriented Programming (OOP), asynchronous data fetching, and automated testing.

## 🚀 Features Implemented

### 1. Main Storefront (`index.html`)
- **Product Display**: Dynamically renders products fetched from a backend API using JavaScript template literals.
- **Interactive Search Bar**: Users can search for products by name or keywords. The search works globally across all pages and accurately filters the homepage view. If no products are found, an empty state message is shown.
- **Cart Management**: Users can select quantities and add items to their cart. The cart quantity indicator updates seamlessly in the header.

### 2. Shopping Cart & Checkout (`checkout.html`)
- **Order Summary**: Displays all added items, their quantities, and prices.
- **Delivery Options**: Users can choose between multiple delivery speeds (e.g., Free, Standard, Expedited), which automatically updates the final pricing.
- **Cost Calculation**: Accurately computes subtotal, shipping costs, taxes, and final order totals before placing an order.

### 3. Orders Page (`orders.html`)
- **Order History**: Shows a list of previously placed orders along with the order ID, purchase date, and total cost.
- **"Buy It Again"**: Interactive buttons allow users to easily re-add previously purchased items directly to their cart.
- **Delivery Dates**: Uses the `dayjs` external library to calculate and beautifully format estimated delivery dates for each product in the order.

### 4. Order Tracking Page (`tracking.html`)
- **Real-Time Progress**: Reads URL parameters (`orderId` and `productId`) to find the exact order item and computes delivery progress.
- **Progress Bar**: Displays an interactive progress bar indicating the package's status (Preparing, Shipped, Delivered) based on the time elapsed between the order date and estimated delivery date.

## 🛠️ Technical Details & Architecture

- **Vanilla JavaScript**: Entirely built without heavy UI frameworks (No React/Vue).
- **Object-Oriented Programming (OOP)**: Products are represented using JavaScript Classes (`Product`, `Clothing`), demonstrating inheritance and polymorphism (e.g., rendering specific UI components for clothing items like size charts).
- **Asynchronous JavaScript**: Utilizes `fetch()` and `Promises` to retrieve product arrays and simulate backend operations.
- **URL Query Parameters**: Uses `URLSearchParams` to pass data between pages (like passing search queries or tracking IDs).
- **Automated Testing**: Includes unit tests using the Jasmine testing framework (`/tests` directory) to ensure business logic like cart calculations and money formatting remain accurate.
- **Responsive Design**: Designed with CSS Grid and Flexbox to ensure it works on both desktop and mobile devices.

## 📂 Project Structure

- `/*.html` - The main entry pages for the application (Store, Checkout, Orders, Tracking).
- `/scripts` - Contains the main JavaScript files driving the specific UI logic for each page.
- `/data` - Contains data models, OOP classes, cart logic, and backend simulation scripts.
- `/styles` - CSS stylesheets organized by shared components (headers, general) and page-specific styles.
- `/tests` - Jasmine unit tests.
- `/backend` - Contains local backend simulation code if applicable.

## 🏃 How to Run
1. Since the project uses ES6 Modules (`import`/`export`), it needs to be run on a local development server (like VS Code Live Server). 
2. Open the project in your editor.
3. Start the Live Server and navigate to `index.html`.
