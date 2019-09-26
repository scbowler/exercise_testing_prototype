import React from 'react';
import Editor from './editor';

export default ({answer, created, pid, question, test}) => {
    
    return (
        <div>
            <div><strong>Question:</strong></div>
            <p className="ml-4">{question}</p>

            <div className="mb-2"><strong>Answer:</strong></div>
            <Editor
                height="162px"
                highlightActiveLine={false}
                name={`${pid}-answer`}
                value={answer}
                theme="eclipse"
                readOnly
            />

            <div className="mb-2"><strong>Test:</strong></div>
            <Editor
                height="324px"
                highlightActiveLine={false}
                name={`${pid}-test`}
                value={test}
                theme="eclipse"
                readOnly
            />

            <p className="text-secondary mt-3">Created: {new Date(created).toLocaleString()}</p>
        </div>
    )
}
