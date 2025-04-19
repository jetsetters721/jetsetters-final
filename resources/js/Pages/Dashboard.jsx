import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    React.useEffect(() => {
        document.title = 'Dashboard - JetSetters';
    }, []);

    return (
        <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Dashboard</h1>
                <Link 
                    to="/"
                    style={{ padding: '8px 15px', background: '#0066B2', color: 'white', border: 'none', borderRadius: '4px', textDecoration: 'none' }}
                >
                    Back to Home
                </Link>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Cruises</h2>
                    <p>Browse available cruise options</p>
                    <Link to="/cruises" style={{ display: 'inline-block', marginTop: '10px', color: '#0066B2', textDecoration: 'none' }}>
                        View Cruises →
                    </Link>
                </div>
                
                <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Packages</h2>
                    <p>Find vacation packages and deals</p>
                    <Link to="/packages" style={{ display: 'inline-block', marginTop: '10px', color: '#0066B2', textDecoration: 'none' }}>
                        Browse Packages →
                    </Link>
                </div>
                
                <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Itineraries</h2>
                    <p>View detailed travel plans</p>
                    <Link to="/itinerary" style={{ display: 'inline-block', marginTop: '10px', color: '#0066B2', textDecoration: 'none' }}>
                        View Itinerary →
                    </Link>
                </div>
            </div>
        </div>
    );
}
