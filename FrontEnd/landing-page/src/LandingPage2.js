import { useState } from 'react';
import { Link } from 'react-router-dom';
import SiteFrame from './components/SiteFrame';

const EnrollPage = () => {
  const [status, setStatus] = useState('idle');

  const handleEnrollClick = () => {
    setStatus('sending');
    fetch('http://localhost:8080/producer/enroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: 'enrollNow' }),
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
        <p className="kicker">Next group</p>
        <h1>Enroll now</h1>
        <p>Save a seat for Monday evening. You can buy the course later.</p>
        <button type="button" className="green" onClick={handleEnrollClick} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Enroll now'}
        </button>
        <p className="status" role="status">
          {status === 'sent' && 'Your seat is saved.'}
          {status === 'error' && 'That did not go through. Try again.'}
        </p>
        <p className="switch">
          Ready to commit? <Link to="/">Buy the course</Link>
        </p>
      </section>
    </SiteFrame>
  );
};

export default EnrollPage;
