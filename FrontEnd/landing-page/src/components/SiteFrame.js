import { NavLink } from 'react-router-dom';

export default function SiteFrame({ children }) {
  return (
    <div className="page">
      <header className="topbar">
        <span className="logo">Meridian</span>
        <nav>
          <NavLink to="/" end>
            Buy a course
          </NavLink>
          <NavLink to="/enroll">Enroll now</NavLink>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
