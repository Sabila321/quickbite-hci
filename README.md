# QuickBite 2026 | Next-Gen Food Ordering Application
### Human-Computer Interaction (HCI) — Individual Semester Project
**University:** University of Sindh, Thatta Campus  
**Department:** Department of Computer Science  
**Student Name:** Sabila Memon  
**Roll No:** 2K24/TCS/27  
**Semester:** 6th Semester  
**Subject:** Human Computer Interaction  
**Submitted to:** Ma'am Harmain Memon  
**Total Marks:** 100 | **Submission Deadline:** 21 November 2026  
**Selected Topic:** Topic 1 — Food Ordering Application  
**Technology Used:** HTML5, CSS3 (Glassmorphism & Advanced Animations), Modern Vanilla JavaScript

---

## 📌 Project Overview
**QuickBite** is a fully functional, highly interactive food ordering and delivery web application developed as an individual semester project for **Human-Computer Interaction (HCI)**.

The project is architected around classical and modern HCI principles—most notably **Jakob Nielsen's 10 Usability Heuristics**, **Don Norman's Design Concepts**, and **Fitts's Law**. It eliminates cognitive friction, provides continuous status transparency, prevents operational errors, and delivers an intuitive, appetizing dining experience.

---

## 🚀 How to Run the Application
1. **Direct Browser Execution (No setup or server required):**
   * Double-click [`index.html`](file:///d:/HCI-Project-Sabila/index.html) or right-click and open with **Google Chrome**, **Microsoft Edge**, **Firefox**, or **Safari**.
2. **Instant Live Interaction:**
   * All navigation, search filters, modal customizers, cart recalculations, live order status progressions, and profile reorders run natively and seamlessly in the browser.

---

## 🌟 Key Application Features & 6 Designed Screens
*(Exceeds the project requirement of minimum 5 screens)*

| Screen # | Screen Name | Key Features & Interactions | Applied HCI Principles |
| :--- | :--- | :--- | :--- |
| **Screen 1** | **Home / Discovery & Cuisine Filter** | Instant live search, touch-friendly cuisine categories, one-click filter pills (*Top Rated 4.8+, Fast <25 min, Free Delivery, Veg Only*), dynamic restaurant cards. | *Fitts's Law*, *Recognition over Recall*, *Aesthetic & Minimalist Design* |
| **Screen 2** | **Restaurant Menu & Food Details** | Contextual hero banner with verified ratings and delivery times, dietary badges (*🌱 Vegetarian, 🌶️ Spicy*), dish customization modal (*Portion size, addons, cooking notes*). | *Affordance*, *Consistency & Standards*, *User Freedom & Exit* |
| **Screen 3** | **Cart Review & Price Breakdown** | Ergonomic (+ / -) quantity steppers, itemized calculation, defensive "Clear Entire Bag" confirmation dialog, promo voucher system (`QUICK20`), transparent subtotal/taxes/fees. | *Visibility of System Status*, *Error Prevention*, *User Control & Undo* |
| **Screen 4** | **Checkout & Payment Specification** | Multi-step progress bar (Review → Delivery & Pay → Live Track), saved address selector (*Home, Campus, Office*), delivery speed selector, input-masked credit card form. | *Jakob's Law*, *Error Prevention*, *Recognition over Recall* |
| **Screen 5** | **Live Order Tracking & Telemetry** | 4-stage active status stepper (*Order Placed → In Kitchen → Out on Way → Delivered*), dynamic countdown timer, simulated vector route map with moving courier, driver contact card. | *Visibility of System Status (Nielsen #1)*, *Real-World Mental Models* |
| **Screen 6** | **User Profile & Order History** | Profile overview with loyalty reward points, saved delivery destinations, and **1-Click Fast Reorder** from past dining history. | *Recognition rather than Recall*, *Flexibility & Efficiency of Use* |

---

## 🎯 Special Feature: "HCI Principles Mode" Toggle
The application header includes an interactive button: **`🎯 HCI Principles Mode: ON/OFF`**.
* When toggled **ON**, the application highlights and annotates every element where an HCI heuristic has been implemented.
* Clicking any yellow inspection badge pops up an **HCI Heuristic Explainer Modal**, displaying:
  1. The formal heuristic name and Nielsen/ergonomic reference number.
  2. The theoretical HCI principle definition.
  3. The exact design rationale and concrete implementation within QuickBite.

---

## 📚 Explicit HCI Principles Applied in Design

1. **Visibility of System Status (Nielsen #1):**
   * Live 4-stage delivery tracking stepper with active pulsing nodes.
   * Real-time countdown timer (*e.g., "18 - 25 mins"*).
   * Animated bump effect on the header cart counter when items are added.
   * Clear real-time price updates when coupons or items are adjusted.

2. **Match Between System and the Real World (Nielsen #2):**
   * Familiar real-world metaphors: "Food Bag", "Receipt", "Doorstep Delivery".
   * Universal dietary icons: 🌱 for Vegetarian, 🌶️ for Spicy.
   * High-definition appetizing photography representing real restaurant dishes.

3. **User Control and Freedom (Nielsen #3):**
   * Instant **"Undo" recovery toast** whenever a dish is deleted from the bag.
   * Clearly marked "← Back to Restaurants" breadcrumb button on the menu page.
   * Order cancellation dialog with automated refund confirmation.

4. **Consistency and Standards (Nielsen #4):**
   * Cohesive design token system: Coral (`#FF5A36`) for primary affirmative CTAs, Emerald (`#10B981`) for positive status/success, and Crimson (`#EF4444`) for destructive actions.
   * Universal 3-stage e-commerce checkout flow adhering to Jakob's Law.

5. **Error Prevention (Nielsen #5):**
   * Confirmation modal dialog before allowing destructive actions like "Clear Entire Bag".
   * Input formatting and masking for credit card number, expiration date, and CVV.
   * Primary action buttons automatically disable when prerequisites are incomplete.

6. **Recognition Rather than Recall (Nielsen #6):**
   * Saved delivery addresses pre-populated with familiar labels (*Home, Campus, Office*).
   * **1-Click Fast Reorder** on past orders eliminates the cognitive burden of remembering past dish names.
   * Persistent sticky subtotal summary in the cart sidebar.

7. **Fitts's Law & Motor Ergonomics:**
   * Full-width, high-contrast primary CTA buttons positioned in prime thumb zones.
   * Large, generous category touch targets (minimum 48px height) to eliminate misclicks.

8. **Aesthetic and Minimalist Design (Nielsen #8):**
   * Uncluttered card layouts with high contrast white space.
   * Progressive disclosure: complex options remain hidden until the user clicks "+ Add Custom".

---

## 📂 Submission Deliverables Manifest
* **[`index.html`](file:///d:/HCI-Project-Sabila/index.html)** — Main Interactive Application.
* **[`report.html`](file:///d:/HCI-Project-Sabila/report.html)** — Formatted Academic HCI Project Report.
* **[`report.pdf`](file:///d:/HCI-Project-Sabila/report.pdf)** — Submission-Ready Printable PDF Project Report.
* **`screenshots/`** — High-resolution interface captures of all 6 screens:
  * `screen1_home_discovery.png`
  * `screen2_restaurant_menu.png`
  * `screen3_cart_review.png`
  * `screen4_checkout_payment.png`
  * `screen5_live_order_tracking.png`
  * `screen6_profile_history.png`
* **`css/styles.css`** — Modular design system with responsive breakpoints.
* **`js/app.js`** — Application state machine, routing, cart logic, and HCI inspector.
* **`js/data.js`** — Rich mock datasets for restaurants, dishes, vouchers, and heuristics.
