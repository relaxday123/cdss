/* eslint-disable react/prop-types */
import 'antd/dist/reset.css';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/png/logo-color.png';
import './sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar ({ renderContent }) {
  let activeStyle = {
    backgroundColor: '#046380',
    color: 'whitesmoke',
    textDecoration: 'none'
  };
  let inactiveStyle = {
    backgroundColor: '#e4e8eb',
    color: 'black',
    textDecoration: 'none'
  };

  return (
    <>
      <div style={{ width: '280px', display: 'inline-block', marginRight: '50px' }}>
        <div>
          <Link
            className="logo"
            to="/"
          >
            <img style={{ width: '150px', height: '150px' }} src={logo} alt="logo" />
          </Link>
          <p
            className="title"
            style={{
              color: "#046380",
              fontSize: '1.6rem',
              display: 'flex',
              justifyContent: 'center',
              fontFamily: 'TTNormsPro, sans-serif'
            }}>Heart Failure Prediction</p>
        </div>
        <ul className="nav nav-pills flex-column mb-auto nav-custom">
          {renderContent.map((item, index) => {
            return (
              <NavLink
                key={index}
                className="nav-item  nav-item-custom"
                to={item.route}
                style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
              >
                <p className="navlink-content">{item.content}</p>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default Sidebar;
