# Color Scheme Update Plan

This document outlines the step-by-step plan to update the project's color scheme to match the colors provided in `static/colors-scheme.png`. 

## 1. Extract Colors from the Scheme Image
The provided image `static/colors-scheme.png` consists of three main colors. Using a color picker, the approximate hex and HSL values are:
*   **Color 1 (Orange):** Hex `#F25C22` -> HSL `20, 89%, 54%`
*   **Color 2 (Yellow):** Hex `#FFC745` -> HSL `42, 100%, 64%`
*   **Color 3 (Dark Red):** Hex `#8A0A14` -> HSL `355, 86%, 29%`

*Note: Please verify these exact color codes with a color picker tool before applying them to ensure 100% accuracy.*

## 2. Update Global CSS Variables (`src/app.css`)
The project uses Tailwind CSS with custom CSS variables for theming. The main theme variables are located in `src/app.css`.

### Action Items:
1.  Open `src/app.css`.
2.  Locate the `:root` block and the `[data-theme='default']` block (or whichever theme is currently active).
3.  Update the core color variables (which use HSL format without the `hsl()` wrapper). 
    *   Set `--primary` to the **Orange** value (e.g., `20 89% 54%`).
    *   Set `--secondary` or `--accent` to the **Yellow** value (e.g., `42 100% 64%`).
    *   Set `--destructive` or other accent/dark elements to the **Dark Red** value (e.g., `355 86% 29%`).
4.  Update the `--ring` variable to match the new `--primary` color.
5.  If you are updating a specific named theme (like `wine`, `organic`, or `lime`), ensure you update the variables inside that specific `[data-theme='...']` block.

## 3. Check for Hardcoded Colors
Some components might have hardcoded hex codes instead of using the Tailwind theme variables.

### Action Items:
1.  Search the `src/` directory for hardcoded inline colors that might conflict with the new scheme. Look for classes like `bg-[#...]` or `text-[#...]`.
    *   Command: `grep -rn -E "(bg-\[#|text-\[#|border-\[#)" src/`
2.  Replace any hardcoded primary/accent colors with their Tailwind equivalents (e.g., `bg-primary`, `text-accent`).

## 4. Update Theme-Specific Hardcoded Variables
There are several custom variables defined in `src/app.css` like `--wine-red`, `--wine-gold`, etc. 

### Action Items:
1.  If the new scheme is meant to replace a specific theme (e.g., `wine`), update these specific variables to match the new colors:
    *   `--wine-red` -> Orange
    *   `--wine-gold` -> Yellow
    *   `--wine-dark` -> Dark Red (if applicable)

## 5. Review & Testing
Once the CSS variables are updated, verify the changes across the application.

### Action Items:
1.  Run the development server (`npm run dev`).
2.  Check the **Homepage**, **Product Listing Page**, and **Product Detail Page**.
3.  Verify that **Buttons**, **Links**, and **Icons** are clearly visible and have proper contrast.
4.  Ensure that hover states (which might rely on opacity or secondary colors) still look good with the new color palette.
5.  Run any existing visual or E2E tests to ensure no unexpected styling regressions occurred.
