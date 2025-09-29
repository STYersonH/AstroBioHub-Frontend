# Figma Variables to CSS Documentation

This document explains how to use the CSS classes generated from your Figma variables.

## Generated Files

- `figma-variables.css` - The main CSS file containing all generated classes
- `generate-css-from-figma-variables.js` - The script used to generate the CSS

## Class Categories

### 1. Spacing Classes

The spacing classes are based on your Figma spacing tokens and provide both margin and padding utilities.

#### Margin Classes
```css
.spacing-{size}        /* All sides */
.spacing-{size}-x      /* Left and right */
.spacing-{size}-y      /* Top and bottom */
.spacing-{size}-t      /* Top only */
.spacing-{size}-r      /* Right only */
.spacing-{size}-b      /* Bottom only */
.spacing-{size}-l      /* Left only */
```

#### Padding Classes
```css
.p-{size}              /* All sides */
.p-{size}-x            /* Left and right */
.p-{size}-y            /* Top and bottom */
.p-{size}-t            /* Top only */
.p-{size}-r            /* Right only */
.p-{size}-b            /* Bottom only */
.p-{size}-l            /* Left only */
```

#### Available Sizes
- `none` (0px)
- `2xs` (2px)
- `xs` (4px)
- `sm` (8px)
- `md` (12px)
- `lg` (16px)
- `xl` (24px)
- `2xl` (32px)
- `3xl` (40px)
- `4xl` (48px)
- `5xl` (56px)
- `6xl` (64px)
- `7xl` (80px)
- `8xl` (120px)
- `9xl` (140px)
- `10xl` (180px)

#### Examples
```html
<div class="spacing-lg">Content with 16px margin</div>
<div class="p-md-x">Content with 12px horizontal padding</div>
<div class="spacing-xl-t">Content with 24px top margin</div>
```

### 2. Border Radius Classes

```css
.radius-{size}
```

#### Available Sizes
- `none` (0px)
- `2xs` (4px)
- `xs` (6px)
- `sm` (8px)
- `md` (12px)
- `lg` (16px)
- `xl` (20px)
- `2xl` (24px)
- `3xl` (28px)
- `4xl` (32px)
- `5xl` (40px)
- `full` (999px)

#### Examples
```html
<div class="radius-md">Medium rounded corners</div>
<div class="radius-full">Fully rounded (pill shape)</div>
```

### 3. Color Classes

Color classes are generated from your Figma primitives and provide text color, background color, and border color utilities.

#### Text Color
```css
.color-{color-name}
```

#### Background Color
```css
.bg-{color-name}
```

#### Border Color
```css
.border-{color-name}
```

#### Examples
```html
<div class="color-red-400">Red text</div>
<div class="bg-blue-500">Blue background</div>
<div class="border-gray-300">Gray border</div>
```

### 4. Typography Classes

#### Font Size Utilities
```css
.text-{size}
```

Available sizes: 8px, 10px, 12px, 14px, 16px, 18px, 20px, 22px, 24px, 26px, 32px, 40px, 48px, 64px, 78px, 100px, 120px

#### Font Family Utilities
```css
.font-{family-name}
```

Available families:
- `poppins`
- `merriweather`
- `source-serif-pro`
- `cambria`
- `inter`

#### Font Weight Utilities
```css
.font-{weight}
```

Available weights:
- `r` (Regular - 400)
- `m` (Medium - 500)
- `sb` (SemiBold - 600)
- `b` (Bold - 700)

### 5. Complete Text Style Classes

These classes combine font family, size, weight, and line height based on your Figma text tokens.

#### UI Text Styles
```css
.text-ui-{size}-{weight}
```

Examples:
- `.text-ui-lg-b` - UI Large Bold (Inter, 20px, Bold, 145% line height)
- `.text-ui-md-r` - UI Medium Regular (Inter, 16px, Regular, 145% line height)
- `.text-ui-sm-sb` - UI Small SemiBold (Inter, 14px, SemiBold, 145% line height)

#### Body Text Styles
```css
.text-body-{variant}-{size}-{weight}
```

Examples:
- `.text-body-c-body-lg-b` - Body Large Bold (Source Serif Pro, 20px, Bold, 160% line height)
- `.text-body-s-body-md-r` - Body Medium Regular (Cambria, 14px, Regular, 160% line height)

#### Heading Text Styles
```css
.text-heading-{variant}-{size}-{weight}
```

Examples:
- `.text-heading-s-heading-xl-b` - Heading Extra Large Bold (Merriweather, 40px, Bold, 150% line height)
- `.text-heading-c-heading-lg-sb` - Heading Large SemiBold (Poppins, 32px, SemiBold, 150% line height)

## Usage Examples

### Complete Component Example
```html
<div class="p-lg radius-md bg-blue-50">
  <h1 class="text-heading-s-heading-xl-b color-gray-900">
    Main Heading
  </h1>
  <p class="text-body-c-body-md-r color-gray-600 spacing-md-t">
    This is a paragraph with proper spacing and typography.
  </p>
  <button class="p-md radius-sm bg-blue-500 color-white text-ui-sm-b">
    Click Me
  </button>
</div>
```

### Card Component
```html
<div class="p-xl radius-lg bg-white border-gray-200">
  <h2 class="text-heading-c-heading-md-b color-gray-900">
    Card Title
  </h2>
  <p class="text-body-c-body-sm-r color-gray-600 spacing-md-t">
    Card description text goes here.
  </p>
  <div class="spacing-lg-t">
    <button class="p-sm radius-xs bg-blue-500 color-white text-ui-xs-b">
      Action
    </button>
  </div>
</div>
```

## Regenerating the CSS

To regenerate the CSS file with updated Figma variables:

1. Update your Figma variables in the `src/figma variables/` directory
2. Run the generation script:
   ```bash
   node generate-css-from-figma-variables.js
   ```

The script will automatically:
- Parse all JSON files from your Figma variables
- Convert RGB colors to hex values
- Generate utility classes for spacing, colors, typography, and border radius
- Create complete text style classes with proper font families, sizes, weights, and line heights
- Convert line height percentages (e.g., 145 becomes 145%)

## File Structure

```
src/figma variables/
├── Spacing Tokens.json      # Spacing values
├── Radius Tokens.json       # Border radius values
├── Primitives.json          # Color values
├── Text Style.json          # Font families, sizes, weights
├── Text tokens.json         # Complete text style combinations
└── Number base.json         # Base number values
```

## Notes

- Line heights are converted to percentages (145 → 145%)
- Color values are converted from RGB to hex format
- Class names are sanitized to be CSS-safe (lowercase, hyphens)
- All classes are prefixed to avoid conflicts with existing CSS
- The generated CSS is optimized for utility-first usage
