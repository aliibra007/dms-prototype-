import React from 'react';

const HighlightedText = ({ text, highlight, theme }) => {
    if (!highlight || !highlight.trim()) {
        return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <span
                        key={i}
                        className="rounded px-0.5 transition-colors"
                        style={{ background: `${theme.warning}40`, color: theme.text }}
                    >
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </span>
    );
};

export default HighlightedText;
