import React, { useState, useEffect } from 'react'

interface LinkDialogProps {
    isOpen: boolean
    onClose: () => void
    onSave: (url: string, text: string) => void
    initialUrl?: string
    initialText?: string
}

export const LinkDialog: React.FC<LinkDialogProps> = ({
    isOpen,
    onClose,
    onSave,
    initialUrl = '',
    initialText = '',
}) => {
    const [url, setUrl] = useState(initialUrl)
    const [text, setText] = useState(initialText)

    useEffect(() => {
        if (isOpen) {
            setUrl(initialUrl)
            setText(initialText)
        }
    }, [isOpen, initialUrl, initialText])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (url.trim()) {
            onSave(url.trim(), text.trim() || url.trim())
            onClose()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]" onKeyDown={handleKeyDown}>
                <h3 className="text-lg font-semibold mb-4">Insert Link</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                            URL
                        </label>
                        <input
                            type="url"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            autoFocus
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                            Link Text (optional)
                        </label>
                        <input
                            type="text"
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Display text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Insert Link
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
} 