/* src/components/TravelForm.js */

import React, { useState } from 'react';

const TravelForm = ({ onSubmit }) => {
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ location, startDate, endDate });
    };

    return (
        <div className="container-mt-4">
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Location:</label>
                    <input 
                        type="text" 
                        placeholder='Please add location...'
                        className="form-control" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Start:</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">End:</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Generate Itinerary</button>
            </form>
        </div>
    );
};

export default TravelForm;
