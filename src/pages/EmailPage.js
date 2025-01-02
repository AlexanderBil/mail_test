import React, { useEffect, useMemo, useState } from 'react';
import { userService } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { COLUMNS } from '../table/columns';
import { BasicTable } from '../table/BasicTable';
import './../App.css';

const EmailPage = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    authdata: '',
  });

  const [userEmails, setUserEmails] = useState([]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => userEmails, [userEmails]);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${user.authdata}`,
      },
    };
    user.authdata !== '' &&
      fetch('http://68.183.74.14:4005/api/emails/', requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUserEmails(data.results);
        });
  }, [user]);

  return (
    <div className="header-email">
      <div className="header-data">
        <h2>Emails</h2>
        <div>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
      <div className="button-block">
        <button onClick={() => navigate('/send')}>Send Message</button>
        <button
          onClick={() => {
            userService.logout();
            navigate('/home');
          }}
        >
          Logout
        </button> 
      </div>

      <BasicTable columns={columns} data={data} />
    </div>
  );
};

export default EmailPage;
