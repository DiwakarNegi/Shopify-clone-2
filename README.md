# RugCo — Premium Ruggable Clone

RugCo is a high-fidelity, interactive e-commerce replica of **Ruggable.com**, built using a modern frontend stack. The project showcases a sophisticated user interface, fluid animations, and real-time custom e-commerce product selectors that mimic a premium online shopping experience.

---

## 🌟 Key Features

### 1. Patented Two-Piece Washable Rug System
RugCo models the revolutionary washable rug architecture:
- **Rug Cover**: Lightweight, low-profile, interchangeable, water-resistant, and machine-washable.
- **Rug Pad**: Specially textured non-slip backing with Cling-Effect™ technology to hold the cover firmly in place.

### 2. Interactive Washing Machine Compatibility Calculator
Located on the **About Page** (`/about`), this custom calculator takes the guesswork out of purchasing.
- Select your rug size (from standard runners up to large 9×12 area rugs).
- Input your home washing machine's capacity and loading style (front-load, top-load with agitator, etc.).
- Instantly receive a clear compatibility status, fitting instructions, and specific laundering advice.

### 3. Dynamic Product Upgrades & Configurator
Each product page (`/product/:id`) contains a live purchasing funnel featuring:
- **Purchase Mode Toggle**: Easily switch between **Full Rug System (Cover + Pad)** and **Cover Only** (which dynamically applies a 30% discount).
- **Size Selector**: Instantly updates base prices depending on selected footprint.
- **Pad Type Upgrade Cards**: Switch between **Standard**, **Cushioned**, and **Tufted** pads:
  - *Standard Pad*: Low-profile, sleek, and perfect for door clearance.
  - *Cushioned Pad*: Adds dynamic, size-proportional comfort upgrades (+$20 to +$100).
  - *Tufted Pad*: Luxury high-pile upgrade (+$35 to +$130).
- **Auto-Calculated Pricing**: The total purchase price recalculates instantly based on your exact combination of size, purchase mode, and pad selection.
- **Dynamic Laundry Badge**: Direct product-page integration showing minimum wash capacity requirements for the selected rug size.

---

## 🛠️ Technology Stack

- **Core Framework**: React 18 & TypeScript (using consistent `.tsx` file extensions)
- **Build Tool**: Vite (blazing fast bundling and development server)
- **Styling**: Tailwind CSS (custom brand color system featuring `ivory`, `charcoal`, `terracotta`, and `sage`)
- **Animations**: Framer Motion (smooth, scroll-triggered page-entry, and component-level micro-interactions)
- **Icons**: Lucide React
- **Routing**: React Router Dom v6

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/DiwakarNegi/Shopify-clone-2.git
   cd Shopify-clone-2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
Launch the local dev environment with:
```bash
npm run dev
```
Open your browser and navigate to the local URL (usually `http://localhost:5173`) to view the application.

### Building for Production
To bundle the project for production, run:
```bash
npm run build
```
The compiled, optimized production assets will be placed in the `dist/` directory.

---

## 👤 Author & Contributor
- **Diwakar** — Lead Developer & Creator

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
