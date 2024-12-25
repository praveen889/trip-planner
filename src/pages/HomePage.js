import React, { useRef, useState } from 'react';
import './css/home.css';
import Carousel from './Carousel';
import trips from '../Data/data.json'; 

const HomePage = () => {
  const secondDivRef = useRef(null);
  const thirdDivRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    preference: 'mountain',
    type: 'adventure',
    budget: 'low',
  });
  const [results, setResults] = useState([]);

  const handleClick = () => {
    if (secondDivRef.current) {
      secondDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const selectedCategory = trips[formData.preference] || [];
    if (thirdDivRef.current) {
      thirdDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    const filteredTrips = selectedCategory.filter(
      (trip) =>
        trip.type.toLowerCase() === formData.type.toLowerCase() &&
        trip.budget.toLowerCase() === formData.budget.toLowerCase()
    );
    setResults(filteredTrips);
  };

  const images = [
    '/images/mountain1.jpg',
    '/images/beach1.jpg',
    '/images/mountain2.jpg',
    '/images/beach2.jpg',
    '/images/mountain3.jpg',
    '/images/beach3.jpg',
    '/images/mountain4.jpg',
    '/images/beach4.jpg',
    '/images/mountain5.jpg',
    '/images/beach5.jpg',
  ];

  return (
    <div className="main-h">
      <div className="main-home">
        <Carousel images={images} interval={5000} />
      </div>
      <div className="home-text">
        <h1 className="first-h">Welcome!</h1>
        <h2 className="second-h">Trip Planner</h2>
        <button className="home-page-btn" onClick={handleClick}>Get Started</button>
      </div>
      <div className="second-div" ref={secondDivRef}>
        <h1 className="second-heading">Fill the form and get a personalized<br />trip for you</h1>
        <div className="main-form">
          <h1 className="form-heading">Fill Your Details</h1>
          {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label className="input-label">Your Name</label>
            <input
              name="name"
              placeholder="Your Name"
              className="form-input"
              onChange={handleChange}
              value={formData.name}
            />
          </div> */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label className="input-label">What You Prefer?</label>
            <select
              name="preference"
              className="form-input"
              onChange={handleChange}
              value={formData.preference}
            >
              <option value="mountain">Mountain</option>
              <option value="beach">Beach</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label className="input-label">Looking for?</label>
            <select
              name="type"
              className="form-input"
              onChange={handleChange}
              value={formData.type}
            >
              <option value="adventure">Adventure</option>
              <option value="relax">Relax</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label className="input-label">Your Budget?</label>
            <select
              name="budget"
              className="form-input"
              onChange={handleChange}
              value={formData.budget}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="results" ref={thirdDivRef}>
          <h2 className='result-heading'>Prefered Destination</h2>
          <div className='main-result'>
            {results.length > 0 ? (
              results.map((result, index) => (
                <div key={index} className="result-card">
                  <img src={result.image} alt='' style={{width: '100%', borderTopLeftRadius: '16px', borderTopRightRadius:'16px'}}/>
                  <div className='result-text'>
                    <h3>{result.location}</h3>
                    <p><strong>Country:</strong> {result.country}</p>
                    <p><strong>Activity:</strong> {result.activity}</p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{marginLeft:'35%', fontWeight:'bold', fontSize:'x-large'}}>Please Select Your Prefrences and Get Your Result.</p>
            )}
          </div>
        </div>
    </div>
  );
};

export default HomePage;
