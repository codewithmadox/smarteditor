# SmartEditor

A React component library providing a reusable, developer-friendly rich text editor powered by TipTap.

## Features

- 🎨 Rich text editing with TipTap
- 🛠️ Comprehensive toolbar with Bold, Italic, Underline, Strikethrough, Code, Blockquote, Headings, Lists, Undo/Redo
- 🔗 Link insertion and editing with URL dialog
- 🖼️ Image upload with drag & drop support
- 📝 Full HTML output support
- 🎯 TypeScript support with full type definitions
- 🎨 Styled with Tailwind CSS
- 📦 Built as a library with Vite
- 🔧 Easy to integrate and customize
- 📍 Placeholder text support
- 👁️ Read-only mode for content display

## Installation

```bash
npm install smarteditor
# or
yarn add smarteditor
# or
pnpm add smarteditor
```

## Usage

```tsx
import React, { useState } from 'react'
import { SmartEditor } from 'smarteditor'

function App() {
  const [content, setContent] = useState('<p>Hello, World!</p>')

  const handleChange = (html: string) => {
    setContent(html)
    console.log('Updated content:', html)
  }

  // Custom image upload handler
  const handleImageUpload = async (file: File): Promise<string> => {
    // Upload to your server/CDN here
    const formData = new FormData()
    formData.append('image', file)
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    
    const { url } = await response.json()
    return url
  }

  return (
    <div className="p-4">
      <h1>SmartEditor Demo</h1>
      
      {/* Basic Usage */}
      <SmartEditor
        content={content}
        onChange={handleChange}
        placeholder="Start writing your content..."
        className="max-w-2xl"
      />

      {/* With Image Upload */}
      <SmartEditor
        content={content}
        onChange={handleChange}
        onImageUpload={handleImageUpload}
        className="max-w-2xl mt-4"
      />

      {/* Read-only Mode */}
      <SmartEditor
        content="<h1>Read-only Content</h1><p>This content cannot be edited.</p>"
        readOnly={true}
        className="max-w-2xl mt-4"
      />
    </div>
  )
}

export default App
```

## API

### SmartEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `''` | Initial HTML content for the editor |
| `onChange` | `(html: string) => void` | `undefined` | Callback function called when content changes |
| `className` | `string` | `''` | Additional CSS classes for the editor container |
| `placeholder` | `string` | `'Start writing...'` | Placeholder text shown when editor is empty |
| `readOnly` | `boolean` | `false` | When true, disables editing and hides toolbar |
| `onImageUpload` | `(file: File) => Promise<string>` | `undefined` | Custom image upload handler |

### Features Included

The SmartEditor includes a comprehensive set of formatting options:

#### Text Formatting
- **Bold** (`Ctrl+B` or toolbar button)
- **Italic** (`Ctrl+I` or toolbar button)
- **Underline** (`Ctrl+U` or toolbar button)
- **Strikethrough** (`Ctrl+Shift+X` or toolbar button)
- **Inline Code** (`Ctrl+E` or toolbar button)

#### Block Elements
- **Headings** (H1, H2, H3) via dropdown menu
- **Bullet Lists** (`Ctrl+Shift+8` or toolbar button)
- **Ordered Lists** (`Ctrl+Shift+7` or toolbar button)
- **Blockquotes** (`Ctrl+Shift+B` or toolbar button)
- **Code Blocks** (`Ctrl+Alt+C`)
- **Horizontal Rules** (`Ctrl+Shift+H`)

#### Links & Media
- **Insert Links** - Click the link button to add URLs with custom text
- **Edit Links** - Click on existing links to modify them
- **Remove Links** - One-click link removal
- **Image Upload** - File picker or drag & drop support
- **Custom Upload Handlers** - Integrate with your own upload service

#### Actions
- **Undo** (`Ctrl+Z` or toolbar button)
- **Redo** (`Ctrl+Y` or toolbar button)

## Development

### Prerequisites

- Node.js 16+
- pnpm (recommended)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start development server:
   ```bash
   pnpm dev
   ```

4. Build the library:
   ```bash
   pnpm build
   ```

### Project Structure

```
smarteditor/
├── src/
│   ├── SmartEditor.tsx    # Main component
│   ├── LinkDialog.tsx     # Link insertion dialog
│   ├── index.ts          # Library exports
│   ├── demo.tsx          # Development demo
│   ├── main.tsx          # Demo entry point
│   ├── styles.css        # Tailwind styles
│   └── types.d.ts        # Type declarations
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind configuration
└── package.json          # Package configuration
```

## Building

The library is built using Vite in library mode and outputs:

- **ES Module**: `dist/smarteditor.es.js`
- **UMD**: `dist/smarteditor.umd.js`
- **TypeScript declarations**: `dist/index.d.ts`

## Peer Dependencies

This library has the following peer dependencies:

- `react` ^18.0.0
- `react-dom` ^18.0.0

## License

MIT 