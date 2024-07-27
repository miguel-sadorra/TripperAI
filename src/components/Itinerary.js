// src/components/Itinerary.js
import React from 'react';
import './Itinerary.css';

const Itinerary = ({ itinerary }) => {
    if (!itinerary) {
        return (
            <div className="welcome-text">
                <h1>Welcome to TripperAI!</h1>
                <p>Embark on your next adventure with ease and confidence using TripperAI, your ultimate travel itinerary planner. Whether you're a seasoned traveler or embarking on your first journey, TripperAI is here to simplify your trip planning process.</p>
                
                <h2>How It Works:</h2>
                <ul>
                    <li><strong>Enter Your Destination:</strong> Let us know where you're headed.</li>
                    <li><strong>Set Your Dates:</strong> Choose the start and end dates for your trip.</li>
                    <li><strong>Get Your Itinerary:</strong> Receive a personalized, day-by-day travel plan tailored to your preferences and schedule.</li>
                </ul>
                
                <p>With TripperAI, you can explore new places, discover hidden gems, and create unforgettable memories without the hassle of meticulous planning. Our advanced AI technology curates the perfect itinerary for you, so all you need to do is pack your bags and enjoy the journey.</p>
                
                <h2>Why Choose TripperAI?</h2>
                <ul>
                    <li><strong>Personalized Plans:</strong> Tailored to your interests and travel style.</li>
                    <li><strong>Time-Saving:</strong> Spend less time planning and more time exploring.</li>
                    <li><strong>Expert Recommendations:</strong> Discover the best attractions, restaurants, and activities.</li>
                </ul>
                
                <p>Start planning your dream trip today with TripperAI, and let us turn your travel dreams into reality. Adventure awaits!</p>
    
            </div>
        );
    }

    return (
        <div className="itinerary">
            {itinerary.map((day, index) => (
                <div key={index} className="day">
                    <h2>{day.title}</h2>
                        <span className='items'>
                        {day.activities.map((activity, idx) => (
                            <h3 key={idx}>{activity}</h3>
                        
                        ))}
                        </span>
                </div>
            ))}
        </div>
    );
};

export default Itinerary;
