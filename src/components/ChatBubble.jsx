import React from 'react';

const formatMessage = (message) => {
  if (!message) return '';
  
  // Replace Markdown-style formatting with HTML tags
  return message
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
    .replace(/\n/g, '<br />'); // Line breaks
};

const ChatBubble = ({ message, isUser = false, isSystemMessage = false, className = '' }) => {
  return (
    <div 
      className={`
        flex ${isUser ? 'justify-end' : 'justify-start'}
        mb-4
        ${className}
      `}
    >
      <div
        className={`
          max-w-[80%] backdrop-blur-sm px-4 py-3 border rounded-2xl
          ${isUser 
            ? 'bg-green-50 dark:bg-neutral-700 border-green-100 dark:border-neutral-600 rounded-tr-none text-gray-800 dark:text-neutral-100' 
            : isSystemMessage
              ? 'bg-blue-50/70 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800/50 text-gray-700 dark:text-blue-100'
              : 'bg-white/70 dark:bg-neutral-700/70 border-green-100 dark:border-neutral-600 rounded-tl-none text-gray-800 dark:text-neutral-100'
          }
          shadow-md
          animate-fadeIn
        `}
      >
        {isUser ? (
          <p className="text-sm">{message}</p>
        ) : (
          <p 
            className={`text-sm ${isSystemMessage ? 'italic' : ''}`}
            dangerouslySetInnerHTML={{ __html: formatMessage(message) }}
          />
        )}
      </div>
    </div>
  );
};

export default ChatBubble;