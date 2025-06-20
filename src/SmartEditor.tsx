import React, { useEffect, useState, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { LinkDialog } from './LinkDialog'
import './styles.css'

export interface SmartEditorProps {
    content?: string
    onChange?: (html: string) => void
    className?: string
    placeholder?: string
    readOnly?: boolean
    onImageUpload?: (file: File) => Promise<string>
}

const headingOptions = [
    { label: 'Paragraph', level: null },
    { label: 'Heading 1', level: 1 },
    { label: 'Heading 2', level: 2 },
    { label: 'Heading 3', level: 3 },
]

export const SmartEditor: React.FC<SmartEditorProps> = ({
    content = '',
    onChange,
    className = '',
    placeholder = 'Start writing...',
    readOnly = false,
    onImageUpload,
}) => {
    const [headingDropdown, setHeadingDropdown] = useState(false)
    const [linkDialog, setLinkDialog] = useState(false)
    const [linkDialogData, setLinkDialogData] = useState({ url: '', text: '' })
    const fileInputRef = useRef<HTMLInputElement>(null)

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Strike,
            Placeholder.configure({
                placeholder,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline cursor-pointer hover:text-blue-800',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded',
                },
            }),
        ],
        content,
        editable: !readOnly,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onChange?.(html)
        },
    })

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content)
        }
    }, [content, editor])

    useEffect(() => {
        if (editor) {
            editor.setEditable(!readOnly)
        }
    }, [readOnly, editor])

    if (!editor) {
        return null
    }

    // Toolbar actions
    const toggleBold = () => editor.chain().focus().toggleBold().run()
    const toggleItalic = () => editor.chain().focus().toggleItalic().run()
    const toggleUnderline = () => editor.chain().focus().toggleUnderline().run()
    const toggleStrike = () => editor.chain().focus().toggleStrike().run()
    const toggleCode = () => editor.chain().focus().toggleCode().run()
    const toggleBlockquote = () => editor.chain().focus().toggleBlockquote().run()
    const toggleBulletList = () => editor.chain().focus().toggleBulletList().run()
    const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run()
    const setHeading = (level: number | null) => {
        if (level) {
            editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run()
        } else {
            editor.chain().focus().setParagraph().run()
        }
        setHeadingDropdown(false)
    }
    const undo = () => editor.chain().focus().undo().run()
    const redo = () => editor.chain().focus().redo().run()

    // Link actions
    const insertLink = () => {
        const { from, to } = editor.state.selection
        const text = editor.state.doc.textBetween(from, to)
        setLinkDialogData({ url: '', text })
        setLinkDialog(true)
    }

    const editLink = () => {
        const { href } = editor.getAttributes('link')
        const text = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to
        )
        setLinkDialogData({ url: href || '', text })
        setLinkDialog(true)
    }

    const removeLink = () => {
        editor.chain().focus().unsetLink().run()
    }

    const handleLinkSave = (url: string, text: string) => {
        if (editor.state.selection.empty) {
            // Insert new link
            editor.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run()
        } else {
            // Update existing selection
            editor.chain().focus().setLink({ href: url }).run()
        }
    }

    // Image actions
    const insertImage = () => {
        fileInputRef.current?.click()
    }

    const handleImageUpload = async (file: File) => {
        if (!onImageUpload) {
            // Default behavior: create object URL
            const url = URL.createObjectURL(file)
            editor.chain().focus().setImage({ src: url }).run()
            return
        }

        try {
            const url = await onImageUpload(file)
            editor.chain().focus().setImage({ src: url }).run()
        } catch (error) {
            console.error('Image upload failed:', error)
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            handleImageUpload(file)
        }
        // Reset input
        event.target.value = ''
    }

    // Drag and drop for images
    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault()
        const files = Array.from(event.dataTransfer.files)
        const imageFile = files.find(file => file.type.startsWith('image/'))
        if (imageFile) {
            handleImageUpload(imageFile)
        }
    }

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault()
    }

    return (
        <div className={`smarteditor ${className} ${readOnly ? 'smarteditor-readonly' : ''}`}>
            {/* Hidden file input for image upload */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Link Dialog */}
            <LinkDialog
                isOpen={linkDialog}
                onClose={() => setLinkDialog(false)}
                onSave={handleLinkSave}
                initialUrl={linkDialogData.url}
                initialText={linkDialogData.text}
            />

            {/* Toolbar - Hidden when read-only */}
            {!readOnly && (
                <div className="smarteditor-toolbar border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex gap-2 flex-wrap">
                    <button
                        type="button"
                        onClick={toggleBold}
                        className={`px-2 py-1 rounded text-sm font-bold transition-colors ${editor.isActive('bold')
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                        title="Bold (Ctrl+B)"
                    >
                        B
                    </button>
                    <button
                        type="button"
                        onClick={toggleItalic}
                        className={`px-2 py-1 rounded text-sm italic font-medium transition-colors ${editor.isActive('italic')
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                        title="Italic (Ctrl+I)"
                    >
                        I
                    </button>
                    <button
                        type="button"
                        onClick={toggleUnderline}
                        className={`px-2 py-1 rounded text-sm underline font-medium transition-colors ${editor.isActive('underline')
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                        title="Underline (Ctrl+U)"
                    >
                        U
                    </button>
                    <button
                        type="button"
                        onClick={toggleStrike}
                        className={`px-2 py-1 rounded text-sm line-through font-medium transition-colors ${editor.isActive('strike')
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                        title="Strikethrough (Ctrl+Shift+X)"
                    >
                        S
                    </button>
                    <button
                        type="button"
                        onClick={toggleCode}
                        className={`px-2 py-1 rounded text-sm font-mono transition-colors ${editor.isActive('code')
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                        title="Inline Code (Ctrl+E)"
                    >
                        {'<>'}
                    </button>
                    <button
                        type="button"
                        onClick={toggleBlockquote}
                        className={`px-2 py-1 rounded text-sm transition-colors ${editor.isActive('blockquote')
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                        title="Blockquote (Ctrl+Shift+B)"
                    >
                        
                    </button>
                    {/* Headings Dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setHeadingDropdown((v) => !v)}
                            className={`px-2 py-1 rounded text-sm font-medium transition-colors flex items-center gap-1 ${editor.isActive('heading', { level: 1 }) || editor.isActive('heading', { level: 2 }) || editor.isActive('heading', { level: 3 })
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                }`}
                            title="Headings"
                        >
                            {editor.isActive('heading', { level: 1 })
                                ? 'H1'
                                : editor.isActive('heading', { level: 2 })
                                    ? 'H2'
                                    : editor.isActive('heading', { level: 3 })
                                        ? 'H3'
                                        : '¶'}
                            <svg className="w-3 h-3 ml-1" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.085l3.71-3.855a.75.75 0 1 1 1.08 1.04l-4.24 4.4a.75.75 0 0 1-1.08 0l-4.24-4.4a.75.75 0 0 1 .02-1.06z" /></svg>
                        </button>
                        {headingDropdown && (
                            <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded shadow w-32">
                                {headingOptions.map((opt) => (
                                    <button
                                        key={opt.label}
                                        type="button"
                                        onClick={() => setHeading(opt.level)}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${(opt.level
                                            ? editor.isActive('heading', { level: opt.level })
                                            : editor.isActive('paragraph'))
                                            ? 'bg-blue-100 text-blue-700'
                                            : ''
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={toggleBulletList}
                        className={`px-2 py-1 rounded text-sm transition-colors ${editor.isActive('bulletList')
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                        title="Bullet List (Ctrl+Shift+8)"
                    >
                        •
                    </button>
                    <button
                        type="button"
                        onClick={toggleOrderedList}
                        className={`px-2 py-1 rounded text-sm transition-colors ${editor.isActive('orderedList')
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                        title="Ordered List (Ctrl+Shift+7)"
                    >
                        1.
                    </button>
                    {/* Link buttons */}
                    <div className="flex gap-1">
                        <button
                            type="button"
                            onClick={editor.isActive('link') ? editLink : insertLink}
                            className={`px-2 py-1 rounded text-sm transition-colors ${editor.isActive('link')
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                }`}
                            title={editor.isActive('link') ? 'Edit Link' : 'Insert Link'}
                        >
                            🔗
                        </button>
                        {editor.isActive('link') && (
                            <button
                                type="button"
                                onClick={removeLink}
                                className="px-2 py-1 rounded text-sm transition-colors bg-red-500 text-white hover:bg-red-600"
                                title="Remove Link"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    {/* Image button */}
                    <button
                        type="button"
                        onClick={insertImage}
                        className="px-2 py-1 rounded text-sm transition-colors bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        title="Insert Image"
                    >
                        🖼️
                    </button>
                    <button
                        type="button"
                        onClick={undo}
                        className="px-2 py-1 rounded text-sm transition-colors bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        title="Undo (Ctrl+Z)"
                    >
                        ⎌
                    </button>
                    <button
                        type="button"
                        onClick={redo}
                        className="px-2 py-1 rounded text-sm transition-colors bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        title="Redo (Ctrl+Y)"
                    >
                        ↻
                    </button>
                </div>
            )}

            {/* Editor Content */}
            <div
                className={`smarteditor-content border border-gray-300 ${!readOnly ? 'border-t-0 rounded-b-lg' : 'rounded-lg'} ${readOnly ? 'bg-gray-50' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <EditorContent
                    editor={editor}
                    className={`prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none ${readOnly ? 'cursor-default' : ''}`}
                />
            </div>
        </div>
    )
} 