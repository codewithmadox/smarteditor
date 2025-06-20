import React, { useState } from 'react'

interface TableControlsProps {
    onInsertTable: (rows: number, cols: number) => void
    onAddRowBefore: () => void
    onAddRowAfter: () => void
    onDeleteRow: () => void
    onAddColumnBefore: () => void
    onAddColumnAfter: () => void
    onDeleteColumn: () => void
    onDeleteTable: () => void
    isTableActive: boolean
}

export const TableControls: React.FC<TableControlsProps> = ({
    onInsertTable,
    onAddRowBefore,
    onAddRowAfter,
    onDeleteRow,
    onAddColumnBefore,
    onAddColumnAfter,
    onDeleteColumn,
    onDeleteTable,
    isTableActive,
}) => {
    const [showInsertDialog, setShowInsertDialog] = useState(false)
    const [rows, setRows] = useState(3)
    const [cols, setCols] = useState(3)

    const handleInsertTable = () => {
        onInsertTable(rows, cols)
        setShowInsertDialog(false)
    }

    if (!isTableActive) {
        return (
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setShowInsertDialog(true)}
                    className="px-2 py-1 rounded text-sm transition-colors bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    title="Insert Table"
                >
                    📊
                </button>

                {showInsertDialog && (
                    <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded shadow p-4 w-48">
                        <h4 className="font-medium mb-3">Insert Table</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Rows</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={rows}
                                    onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Columns</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={cols}
                                    onChange={(e) => setCols(parseInt(e.target.value) || 1)}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleInsertTable}
                                    className="flex-1 bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                                >
                                    Insert
                                </button>
                                <button
                                    onClick={() => setShowInsertDialog(false)}
                                    className="flex-1 bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="flex gap-1">
            <button
                type="button"
                onClick={onAddRowBefore}
                className="px-2 py-1 rounded text-sm transition-colors bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                title="Add Row Before"
            >
                ⬆️
            </button>
            <button
                type="button"
                onClick={onAddRowAfter}
                className="px-2 py-1 rounded text-sm transition-colors bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                title="Add Row After"
            >
                ⬇️
            </button>
            <button
                type="button"
                onClick={onDeleteRow}
                className="px-2 py-1 rounded text-sm transition-colors bg-red-500 text-white hover:bg-red-600"
                title="Delete Row"
            >
                🗑️
            </button>
            <button
                type="button"
                onClick={onAddColumnBefore}
                className="px-2 py-1 rounded text-sm transition-colors bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                title="Add Column Before"
            >
                ⬅️
            </button>
            <button
                type="button"
                onClick={onAddColumnAfter}
                className="px-2 py-1 rounded text-sm transition-colors bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                title="Add Column After"
            >
                ➡️
            </button>
            <button
                type="button"
                onClick={onDeleteColumn}
                className="px-2 py-1 rounded text-sm transition-colors bg-red-500 text-white hover:bg-red-600"
                title="Delete Column"
            >
                🗑️
            </button>
            <button
                type="button"
                onClick={onDeleteTable}
                className="px-2 py-1 rounded text-sm transition-colors bg-red-600 text-white hover:bg-red-700"
                title="Delete Table"
            >
                🗑️📊
            </button>
        </div>
    )
} 