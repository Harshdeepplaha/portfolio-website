---
name: Redesign Projects Section
overview: Completely redesign the projects section with a modern masonry grid layout featuring soft gradients, rounded corners, and a minimal clean aesthetic that fits within the viewport.
todos: []
---

# Redesign Projects Section

## Overview

Replace the current BentoGrid-based projects section with a modern masonry-style grid layout featuring soft gradients, rounded corners, and a minimal design language. The new design will be clean, modern, and fit within the viewport without scrolling.

## Design Direction

- **Layout**: Masonry/Pinterest-style grid with dynamic card heights
- **Aesthetic**: Soft gradients, rounded corners, minimal shadows
- **Style**: Clean, modern, friendly
- **Viewport**: Fit all projects in view without scrolling

## Implementation Plan

### 1. Redesign Projects Component

**File**: [components/projects.tsx](components/projects.tsx)

- Remove BentoGrid dependency
- Create new masonry grid layout using CSS Grid or Flexbox
- Implement soft gradient backgrounds for cards
- Add rounded corners (rounded-2xl or rounded-3xl)
- Use subtle shadows and hover effects
- Ensure cards have dynamic heights based on content
- Maintain case study modal functionality
- Keep project data structure intact

### 2. Create New Project Card Design

**File**: [components/projects.tsx](components/projects.tsx)

**Card Structure**:

- Soft gradient background (e.g., `bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900`)
- Rounded corners (`rounded-2xl` or `rounded-3xl`)
- Project image with rounded corners and subtle overlay
- Clean typography hierarchy
- Minimal tag design (small, subtle badges)
- Icon-based action buttons (GitHub, Demo) with soft hover effects
- Smooth transitions and hover states

**Visual Elements**:

- Remove heavy borders, use subtle shadows instead
- Soft color palette (pastels in light mode, muted in dark mode)
- Generous white space
- Clean, readable typography

### 3. Grid Layout Implementation

- Use CSS Grid with `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
- Or use masonry-style with `column-count` for true masonry effect
- Responsive breakpoints for mobile/tablet/desktop
- Ensure all 4 projects fit in viewport height
- Add subtle gap between cards

### 4. Responsive Design

- Mobile: Single column, stacked cards
- Tablet: 2 columns
- Desktop: 3-4 columns with masonry layout
- Ensure cards scale appropriately

### 5. Animation & Interactions

- Subtle fade-in animations on scroll (using framer-motion)
- Smooth hover effects (slight scale, shadow increase)
- Soft transitions for all interactive elements
- Maintain existing case study modal functionality

## Technical Details

### Color Scheme

- Light mode: Soft pastels (blue-50, purple-50, pink-50)
- Dark mode: Muted grays (gray-800, gray-900)
- Accent colors: Soft blues and purples
- Text: High contrast for readability

### Typography

- Clean, modern font hierarchy
- Reduced font sizes for minimal aesthetic
- Proper line heights for readability

### Spacing

- Generous padding within cards
- Consistent gaps between cards
- Proper margins for section spacing

## Files to Modify

1. [components/projects.tsx](components/projects.tsx) - Complete redesign
2. Potentially update [components/ui/bento-grid.tsx](components/ui/bento-grid.tsx) if we want to keep it for other uses, or remove dependency entirely

## Keep Intact

- Case study modal functionality
- Project data structure from [lib/data.ts](lib/data.ts)
- Section heading component
- useSectionInView hook integration