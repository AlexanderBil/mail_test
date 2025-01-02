import { Buffer } from 'buffer';

const config = {
  apiUrl: 'http://68.183.74.14:4005/api',
};


const login = async (username, password) => {

  const base64encodedData = Buffer.from(`${username}:${password}`).toString(
    'base64'
  );

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64encodedData}`,
    },
  };

  return await fetch(`${config.apiUrl}/users/current/`, requestOptions)
    .then((data) => {
      return data.json();
    })
    .then((user) => {
      if (user.id) {
        console.log('user', user);

        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
};

const register = async (username, email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  };

  return await fetch(`${config.apiUrl}/users/`, requestOptions)
    .then((data) => {
      return data.json();
    })
    .then((user) => {
      if (user) {
        console.log('user', user);

        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
};

const logout = () => {
  localStorage.removeItem("user");
}

const sendMessage = async (sender, recipient, subject, message, authdata) => {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
      Authorization: `Basic ${authdata}`,
     },
    body: JSON.stringify({ sender, recipient, subject, message }),
  };

  return await fetch(`${config.apiUrl}/emails/`, requestOptions)
    .then((data) => {
      return data.json();
    })
};


export const userService = {
  login,
  register,
  logout,
  sendMessage
};
