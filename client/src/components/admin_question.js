import React from 'react';

export default ({answer, created, pid, question, test}) => {
    
    return (
        <div>
            <div><strong>Question:</strong></div>
            <p className="ml-4">{question}</p>

            <div><strong>Answer:</strong></div>
            <div className="ml-4"><pre>{answer}</pre></div>

            <div><strong>Test:</strong></div>
            <div className="ml-4"><pre>{test}</pre></div>

            <p className="text-secondary mt-3">Created: {new Date(created).toLocaleString()}</p>
        </div>
    )
}
