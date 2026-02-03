import React from 'react';
import './StrategicTimeline.css';

const StrategicTimeline = () => {
  const timelineData = [
    { year: '2022', event: 'Established', details: 'Company was founded.' },
    { year: '2023', event: 'Growth', details: 'Expanded product line.' },
    { year: '2024', event: 'Partnership', details: 'Joined forces with XYZ Corp.' },
    { year: '2025', event: 'Innovation', details: 'Launched new AI feature.' },
    { year: '2026', event: 'Target', details: 'Aiming for 1M users.' },
  ];

  return (
    <div className="timeline">
      <h2>Strategic Timeline</h2>
      <ul>
        {timelineData.map((item, index) => (
          <li key={index} className="timeline-item">
            <span className="timeline-year">{item.year}</span>
            <div className="timeline-event">
              <strong>{item.event}</strong>
              <p>{item.details}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StrategicTimeline;