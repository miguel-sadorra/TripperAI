// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import TravelForm from './components/TravelForm';
import Itinerary from './components/Itinerary';
import './App.css'; 

const App = () => {
    const [itinerary, setItinerary] = useState(null);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const handleFormSubmit = async ({ location, startDate, endDate }) => {
        try {
            // API Connection Response
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful travel assistant."
                    },
                    {
                        role: "user",
                        content: `Generate a travel itinerary for a trip to ${location} from ${startDate} to ${endDate}. Include descriptions and locations for each point.`
                    }
                ],
                max_tokens: 1500,
            }, {
                headers: {
                    'Authorization': `Bearer sk-svcacct-tpfTuPn1hBBQpuMAOOc3T3BlbkFJurQoiZECakMkz4Ida2RF`,
                    'Content-Type': 'application/json'
                }
            });
            
            // response text
            const responseText = response.data.choices && response.data.choices[0] && response.data.choices[0].message && response.data.choices[0].message.content;
            // Debug statement:
            // console.log(responseText)
            
            // sanitize response text
            const formattedText = responseText
                .replace(/[\r\n]+/g, '\n') 
                .replace(/[*#]/g, '') 
                .trim()  
                .split('\n')  
                .filter(line => line.trim()) 
                .map(line => line.startsWith('-') ? `• ${line.substring(1).trim()}` : line) 
                .join('\n');  

            // Debug statement
            // console.log(formattedText)
            if (!responseText) {
                throw new Error("No response text received");
            }

            const itineraryLines = formattedText.split('\n').filter(line => line.trim() !== '');
            const days = [];
            let currentDay = null;

            itineraryLines.forEach(line => {
                if (line.startsWith('Day')) {
                    if (currentDay) days.push(currentDay);
                    currentDay = { title: line, activities: [] };
                } else if (currentDay) {
                    currentDay.activities.push(line);
                }
            });
            if (currentDay) days.push(currentDay);

            setItinerary(days);

            // History Storage Allocation
            const formattedDate = new Date(startDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });

            setHistory([{ location, startDate: formattedDate, itinerary: days }, ...history]);

        } catch (error) {
            console.error('Error fetching the itinerary:', error.response ? error.response.data : error.message);
        }
    };

    const handleHistoryClick = (index) => {
        const selectedItinerary = history[index].itinerary;
        setItinerary(selectedItinerary);
        setShowHistory(false);
    };

    return (
        <div className="app-container">
            <div className="hamburger-menu">
                <button onClick={() => setShowHistory(!showHistory)} className="menu-btn">
                    HISTORY
                </button>
                {showHistory && (
                    <div className="history-box">
                        <h2>History</h2>
                        <ul>
                            {history.map((entry, index) => (
                                <li key={index} onClick={() => handleHistoryClick(index)}>
                                    <strong>{entry.location}</strong><br />
                                    {entry.startDate}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <h1>TripperAI</h1>
            <TravelForm onSubmit={handleFormSubmit} />
            <div className="itinerary-box">
                <Itinerary itinerary={itinerary} />
            </div>
        </div>
    );
};

export default App;
