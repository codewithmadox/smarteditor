import React, { useState } from 'react'
import { SmartEditor } from './SmartEditor'

export const Demo: React.FC = () => {
    const [content, setContent] = useState('<p>Hello, SmartEditor! Start typing here...</p>')
    const [readOnly, setReadOnly] = useState(false)

    const handleChange = (html: string) => {
        setContent(html)
        console.log('Updated content:', html)
    }

    // Mock image upload function
    const handleImageUpload = async (file: File): Promise<string> => {
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // In a real app, you would upload to your server/CDN here
        // For demo purposes, we'll create an object URL
        const url = URL.createObjectURL(file)
        console.log('Image uploaded:', file.name, 'Size:', file.size, 'bytes')
        return url
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">SmartEditor Demo</h1>

            {/* Controls */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Controls</h2>
                <div className="flex gap-4 items-center">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={readOnly}
                            onChange={(e) => setReadOnly(e.target.checked)}
                            className="rounded"
                        />
                        <span>Read-only mode</span>
                    </label>
                </div>
            </div>

            {/* Main Editor */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Rich Text Editor</h2>
                <SmartEditor
                    content={content}
                    onChange={handleChange}
                    placeholder="Start writing your content here..."
                    readOnly={readOnly}
                    onImageUpload={handleImageUpload}
                    className="max-w-4xl"
                />
            </div>

            {/* Content with Links and Images Example */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Example with Links and Images</h2>
                <SmartEditor
                    content={`
                        <h1>Welcome to SmartEditor</h1>
                        <p>This is a <strong>powerful rich text editor</strong> with support for:</p>
                        <ul>
                            <li><a href="https://tiptap.dev" target="_blank">Links to external websites</a></li>
                            <li>Image uploads and drag & drop</li>
                            <li>All common text formatting</li>
                        </ul>
                        <p>Try adding your own links and images using the toolbar!</p>
                        <blockquote>
                            <p>SmartEditor makes content creation easy and enjoyable.</p>
                        </blockquote>
                    `}
                    readOnly={true}
                    className="max-w-4xl"
                />
            </div>

            {/* Read-only Example */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Read-only Example</h2>
                <SmartEditor
                    content="<h1>This is a read-only editor</h1><p>You can see the content but cannot edit it. The toolbar is hidden and the editor is disabled.</p><ul><li>Perfect for displaying content</li><li>Great for previews</li><li>Useful for documentation</li></ul>"
                    readOnly={true}
                    className="max-w-4xl"
                />
            </div>

            {/* Empty with Placeholder */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Empty Editor with Custom Placeholder</h2>
                <SmartEditor
                    content=""
                    placeholder="Type your thoughts here... This is a custom placeholder message."
                    className="max-w-4xl"
                />
            </div>

            {/* HTML Output */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">HTML Output</h2>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto border">
                    {content}
                </pre>
            </div>

            {/* Features */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Features</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="font-semibold mb-2">Text Formatting</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            <li>Bold text (Ctrl+B or toolbar button)</li>
                            <li>Italic text (Ctrl+I or toolbar button)</li>
                            <li>Underline text (Ctrl+U or toolbar button)</li>
                            <li>Strikethrough text (Ctrl+Shift+X or toolbar button)</li>
                            <li>Inline code (Ctrl+E or toolbar button)</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Block Elements</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            <li>Headings (H1, H2, H3) via dropdown</li>
                            <li>Bullet lists (Ctrl+Shift+8 or toolbar button)</li>
                            <li>Ordered lists (Ctrl+Shift+7 or toolbar button)</li>
                            <li>Blockquotes (Ctrl+Shift+B or toolbar button)</li>
                            <li>Undo/Redo (Ctrl+Z/Ctrl+Y or toolbar buttons)</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Links & Media</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            <li>Insert/edit links with dialog</li>
                            <li>Remove links with one click</li>
                            <li>Image upload via file picker</li>
                            <li>Drag & drop images</li>
                            <li>Custom image upload handlers</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Props */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Available Props</h2>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2">Prop</th>
                                <th className="text-left py-2">Type</th>
                                <th className="text-left py-2">Default</th>
                                <th className="text-left py-2">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-2 font-mono">content</td>
                                <td className="py-2">string</td>
                                <td className="py-2">{`''`}</td>
                                <td className="py-2">Initial HTML content</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 font-mono">onChange</td>
                                <td className="py-2">(html: string) =&gt; void</td>
                                <td className="py-2">undefined</td>
                                <td className="py-2">Callback when content changes</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 font-mono">className</td>
                                <td className="py-2">string</td>
                                <td className="py-2">{`''`}</td>
                                <td className="py-2">Additional CSS classes</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 font-mono">placeholder</td>
                                <td className="py-2">string</td>
                                <td className="py-2">{`'Start writing...'`}</td>
                                <td className="py-2">Placeholder text when empty</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 font-mono">readOnly</td>
                                <td className="py-2">boolean</td>
                                <td className="py-2">false</td>
                                <td className="py-2">Disable editing and hide toolbar</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-mono">onImageUpload</td>
                                <td className="py-2">(file: File) =&gt; Promise&lt;string&gt;</td>
                                <td className="py-2">undefined</td>
                                <td className="py-2">Custom image upload handler</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Usage Examples */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Usage Examples</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Basic Usage</h3>
                        <pre className="text-xs overflow-x-auto">
                            {`<SmartEditor
  content={content}
  onChange={setContent}
  placeholder="Start writing..."
/>`}
                        </pre>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">With Image Upload</h3>
                        <pre className="text-xs overflow-x-auto">
                            {`<SmartEditor
  content={content}
  onChange={setContent}
  onImageUpload={async (file) => {
    // Upload to your server/CDN
    const url = await uploadToServer(file)
    return url
  }}
/>`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
} 