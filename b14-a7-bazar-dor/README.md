# 🛒 বাজার দর — BazarDor

BazarDor (বাজার দর) is a modern, responsive web application that helps users keep track of daily market prices of essential goods in Bangladesh, such as rice, lentils, oil, vegetables, fish, meat and eggs.

The application presents prices in Bangla with Bengali numerals, shows daily price movement for every product, and lets signed-in users compare prices across different bazaars before they shop.

## 🛠️ Technologies Used

* **Next.js**
* **React**
* **Tailwind CSS**
* **DaisyUI**
* **Better Auth**
* **react-hot-toast**
* **JavaScript**

## ✨ Key Features
### 1. 📈 Live Price Ticker
An infinitely scrolling marquee below the navbar shows each product's emoji, name, price per unit, and a ▲ / ▼ percentage change, so users can see market movement at a glance.

### 2. 🔺🔻 Daily Price Risers & Fallers
The home page highlights the **top 6 products whose prices went up** and the **top 6 whose prices went down** today. Change badges are color coded: green for an increase, red for a decrease and gray for no change.

### 3. 🗂️ Category Browsing with Sorting
Browse products by category and sort them by:
* Default
* Price: low to high
* Price: high to low

Sorting works on the numeric value of Bengali digits, not on plain strings. A skeleton loader appears while data is being fetched.

### 4. 🏪 Product Details & Bazaar-wise Prices
Each product page (a protected route) shows:
* Product name, emoji and description
* Category tags and unit
* Minimum, maximum and average price
* Today's price at different bazaars

### 5. 🔐 Authentication
Users can sign up and sign in with email and password, or with **Google** and **GitHub**, using Better Auth. Protected pages redirect unauthenticated users to the sign-in page.

### 6. 🔔 Interactive Notifications
Toast notifications give feedback on login, signup, logout, validation errors and protected-route redirects.

### 7. 👤 Profile Update
Signed-in users can open **My Profile** and update their name from a dedicated update page.

### 8. 📱 Fully Responsive Design
The application works smoothly across:
* Mobile devices
* Tablets
* Desktop screens

## 📌 Main Pages
### Home Page
The home page contains:
* Navbar with category links and sign in / sign up buttons
* Price ticker
* Hero section with a call-to-action button
* Price risers and fallers sections
* All products grid

### Category Page
Displays all products of a category with a sort control, a loading skeleton and an empty state for invalid categories.

### Product Details Page
Displays the full price summary of one product and its bazaar-wise prices. Login is required.

### Sign In / Sign Up Pages
Email and password forms with Google and GitHub social login.

### My Profile Page
Shows the user's information and a button to update their name.

### 404 Page
A custom 404 page with a "হোম পেজে ফিরে যান" button is shown for invalid or unknown routes.
