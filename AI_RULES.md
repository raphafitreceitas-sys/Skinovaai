# Skinovaai AI - Development Rules

This document outlines the core technologies and best practices for developing the Skinovaai application, ensuring consistency, maintainability, and adherence to project standards.

## Tech Stack Overview

The Skinovaai application is built using a modern web development stack, focusing on performance, user experience, and AI integration.

*   **Frontend Framework:** React
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn/ui (built on Radix UI primitives)
*   **Routing:** React Router (as per project guidelines)
*   **AI Integration:** Google Gemini API (`@google/genai`)
*   **Build Tool:** Vite
*   **Icons:** Lucide-react
*   **Notifications:** react-hot-toast

## Library Usage Rules

To maintain a cohesive and efficient codebase, please adhere to the following rules when using libraries:

*   **React:** This is the foundational library for building all user interfaces and managing component logic. All UI elements should be developed as React components.
*   **TypeScript:** All new and modified files **must** be written in TypeScript. This ensures type safety, improves code readability, and reduces potential errors.
*   **Tailwind CSS:** Use Tailwind CSS exclusively for all styling. Leverage its utility-first classes for responsive design, layout, spacing, colors, and other design aspects. Avoid creating custom CSS files unless absolutely necessary for highly specific, complex animations or overrides not achievable with Tailwind.
*   **Shadcn/ui & Radix UI:** Prioritize using components from the shadcn/ui library (which is built on Radix UI) for common UI elements such as buttons, forms, modals, and cards. If a specific component is needed that isn't directly available or requires significant customization, create a new component following the design principles and structure of shadcn/ui.
*   **React Router:** This library should be used for defining and managing all application routes. All route configurations should be kept within `src/App.tsx` to centralize navigation logic.
*   **Google Gemini API (`@google/genai`):** This is the designated library for all interactions with Google Gemini AI models, including content generation, facial analysis, and other AI-powered features.
*   **Lucide-react:** Use this library for all icons throughout the application to ensure a consistent and scalable icon set.
*   **react-hot-toast:** Implement this library for all user notifications (e.g., success messages, error alerts, loading indicators) to provide clear, non-intrusive, and consistent feedback to the user.
*   **File Structure:** Adhere to the established directory structure: `src/pages/` for main views, `src/components/` for reusable UI elements, `src/services/` for API interactions, and `src/utils/` for utility functions.
*   **Responsiveness:** All components and layouts **must** be designed to be fully responsive, adapting gracefully across various screen sizes and devices (mobile, tablet, desktop).
*   **Complete Implementations:** All code changes and new features must be fully functional and complete. Avoid leaving placeholders, partial implementations, or `TODO` comments for core functionality.