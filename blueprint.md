# Project Blueprint

## Overview

This project is a simple web application that demonstrates the use of modern web technologies, including Web Components, to create interactive features.

## Implemented Features

### Initial Project
- A simple HTML page (`index.html`) with a "Hello, world!" message.
- A basic CSS file (`style.css`).
- A JavaScript file (`main.js`).

### Toto Random Number Generator
- Created a `<toto-generator>` Web Component.
- Displays 6 random numbers from 1 to 49.
- Styled for a modern look.

## Current Plan: Day and Night Mode UI

### Overview
Implement a theme switching feature that allows users to toggle between Light (Day) and Dark (Night) modes. The application will respect system preferences and persist the user's choice.

### Steps
1.  **Define CSS Variables:**
    *   In `style.css`, define a set of CSS variables for colors (background, text, primary, card background, etc.) in the `:root`.
    *   Create a `.dark-theme` class that overrides these variables for the night version.
2.  **Update Web Component Styling:**
    *   Modify the `<toto-generator>` component in `main.js` to use the CSS variables instead of hardcoded colors.
3.  **Add Theme Toggle UI:**
    *   Add a toggle button or switch to `index.html` to allow manual theme switching.
4.  **Implement Toggle Logic in `main.js`:**
    *   Add a script to handle the click event on the toggle.
    *   Toggle the `.dark-theme` class on the `<body>` or `<html>` element.
    *   Persist the theme choice in `localStorage`.
    *   Automatically apply the dark theme if the user's system preference is set to dark.
5.  **Refine Design:**
    *   Ensure the transitions between themes are smooth using CSS transitions.
    *   Improve the overall aesthetics of both modes according to modern design principles.
