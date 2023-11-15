/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import useAuth from '../hooks/useAuth';
import { ADMIN_SIDEBAR, ROLE, STAFF_SIDEBAR } from '../util/enum';
import './layout.css';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { FloatButton, Switch } from 'antd';
import { faCaretUp, faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Layout({ title, children }) {
  const { user } = useAuth();

  let role = user.role[0].authority;
  let username = user.sub;

  return (
    <section>
      <Navbar title={title} username={username} />
      <div className="page-wrapper">
        <Sidebar renderContent={role === ROLE.ADMIN ? ADMIN_SIDEBAR : STAFF_SIDEBAR} />
        <div
          style={{
            display: 'inline-block',
            marginLeft: '30px',
            marginTop: '30px',
            width: "70%"
          }}
        >
          {children}
        </div>
        <div>
          <FloatButton.Group
            trigger="click"
            type="primary"
            style={{ right: 24 }}
            icon={<FontAwesomeIcon icon={faCaretUp} />}
          >
            <FloatButton icon={<FontAwesomeIcon icon={faRobot} />} />
          </FloatButton.Group>
        </div>
      </div>
    </section>
  );
}

export default Layout;
