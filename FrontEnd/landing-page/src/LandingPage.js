import { useState } from 'react';
import { Link } from 'react-router-dom';
import SiteFrame from './components/SiteFrame';

const LandingPage = () => {
  const [status, setStatus] = useState('idle');

  const handleBuyCourseClick = () => {
    setStatus('sending');
    fetch('http://localhost:8080/producer/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: 'userClick' }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to emit event');
        }
        setStatus('sent');
      })
      .catch((error) => {
        console.error('Error emitting event:', error);
        setStatus('error');
      });
  };

  return (
    <SiteFrame>
      <section className="card">
        <p className="kicker">Course</p>
        <h1>Buy a course</h1>
        <p>
          Six short weeks. Learn the basics, make a small project, and keep it.
        </p>
        <p className="price">$240</p>
        <button type="button" onClick={handleBuyCourseClick} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Buy this course'}
        </button>
        <p className="status" role="status">
          {status === 'sent' && 'Saved. You are on the list.'}
          {status === 'error' && 'That did not go through. Try again.'}
        </p>
        <p className="switch">
          Not ready yet? <Link to="/enroll">Enroll now</Link>
        </p>
      </section>
    </SiteFrame>
  );
};

export default LandingPage;
