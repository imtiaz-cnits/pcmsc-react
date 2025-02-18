import { useState } from 'react';
import { Link } from 'react-router-dom';

const Toggle = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = (e) => {
    console.log('is open');
    console.log(e);
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <li
        className={`submenu-active ${isMenuOpen ? 'active' : ''}`}
        onClick={handleMenuOpen} 
      >
        <Link>
          <svg
            width="40"
            height="42"
            viewBox="0 0 40 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
        
          </svg>

          <span className="text">Academic Management</span>
          <i className="arrow fa-solid fa-angle-down"></i>
        </Link>

        {isMenuOpen && (
          <ul className="sub-menu">
            <li>
              <Link to="./className.html">
                <span className="text">ClassName</span>
              </Link>
            </li>
            <li>
              <Link to="./shift.html">
                <span className="text">Shift</span>
              </Link>
            </li>
            <li>
              <Link to="./section.html">
                <span className="text">Section</span>
              </Link>
            </li>
            <li>
              <Link to="./session.html">
                <span className="text">Session</span>
              </Link>
            </li>
          </ul>
        )}
      </li>
    </>
  );
};

export default Toggle;
