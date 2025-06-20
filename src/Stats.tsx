import React from 'react'

interface StatsProps {
    characterCount: number
    wordCount: number
    lineCount: number
    className?: string
}

export const Stats: React.FC<StatsProps> = ({
    characterCount,
    wordCount,
    lineCount,
    className = '',
}) => {
    return (
        <div className={`text-xs text-gray-500 flex gap-4 ${className}`}>
            <span>{characterCount} characters</span>
            <span>{wordCount} words</span>
            <span>{lineCount} lines</span>
        </div>
    )
} 