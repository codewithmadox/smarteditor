import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'SmartEditor',
            formats: ['es', 'umd'],
            fileName: (format) => `smarteditor.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', '@tiptap/react', '@tiptap/starter-kit'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    '@tiptap/react': 'TiptapReact',
                    '@tiptap/starter-kit': 'TiptapStarterKit',
                },
            },
        },
    },
}) 