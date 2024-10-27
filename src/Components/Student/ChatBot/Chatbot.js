import React, { useState, useRef, useEffect } from 'react';
import { FaRobot } from "react-icons/fa6";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Need help? Reach out to us right here, we will get back to you as soon as we can!'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Sample Q&A database - in a real app, this would come from your backend
  const qaPairs = {
    'how do i filter internships based on my skills': 'Use the filter options on the internship listing page to sort by degree, location, industry, and required skills.',
    'what is dashboard': 'The dashboard provides an overview of your account, including active applications and upcoming deadlines.',
    'how do i update my profile': 'Go to the Profile section to update your personal information, education, skills, and work experience.',
    'default': 'I apologize, but I don\'t have specific information about that. Please try rephrasing your question or contact support for more help.'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (question) => {
    const normalizedQuestion = question.toLowerCase().trim();
    return qaPairs[normalizedQuestion] || qaPairs['default'];
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      content: inputMessage
    };

    // Get bot response
    const botResponse = {
      type: 'bot',
      content: findAnswer(inputMessage)
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputMessage('');
  };

  return (
    <div className="mt-2 flex flex-col h-screen mb-4 bg-gray-100 rounded-lg ml-4 mr-4">
      {/* Chat header */}
      <div className="bg-white p-4 rounded-t-lg border-b">
        <h2 className="text-xl font-semibold text-gray-800">Hello there!</h2>
      </div>

      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center mr-2">
                  <FaRobot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-100 ml-auto'
                    : 'bg-gray-200'
                }`}
              >
                <p className="text-gray-800">{message.content}</p>
              </div>
              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ml-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Message"
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-600"
          />
          <button
            type="submit"
            className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              className="w-5 h-5 transform rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
