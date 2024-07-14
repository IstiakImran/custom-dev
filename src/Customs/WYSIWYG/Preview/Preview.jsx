import React from 'react';

function Preview({ elements }) {
    const renderElement = (element, index) => {
        const Tag = element.type;
        return (
            <Tag key={index} style={element.styles}>
                {element.children.length > 0
                    ? element.children.map((child, idx) => renderElement(child, idx))
                    : element.type === 'img'
                        ? 'Image'
                        : `This is a ${element.type}`}
            </Tag>
        );
    };

    return <div className="preview">{elements.map(renderElement)}</div>;
}

export default Preview;
