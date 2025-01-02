import React, { useState } from 'react';
import { userService } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import './../App.css';

const SendMessagePage = () => {

    const {authdata} = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

  const [sendData, setSendData] = useState({
    sender: 0,
    recipient: '',
    subject: '',
    message: '',
    submitted: false,
    loading: false,
    error: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSendData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSendData((prev) => ({
      ...prev,
      submitted: true,
    }));
    const { sender, recipient, subject, message } = sendData;

    if (!(sender && recipient && subject && message)) {
      return;
    }

    setSendData((prev) => ({
      ...prev,
      loading: true,
    }));
    userService.sendMessage(sender, recipient, subject, message, authdata ).then(
      (message) => {
        navigate('/')
        setSendData((prev) => ({
            ...prev,
            loading: false,
          }))
      },
      (error) =>
        setSendData((prev) => ({
          ...prev,
          error,
          loading: false,
        }))
    );
  };
  const { sender, recipient, subject, message, submitted, loading, error } = sendData;
  return (
    <div className="header-messages">
      <h2>Send Mssage</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sender">Sender Id </label>
          <input
            type="number"
            name="sender"
            value={sender}
            onChange={handleChange}
          />
          {submitted && !sender && (
            <div className="help-block">Sender Id is required</div>
          )}
        </div>
        <div
          className={
            'form-group' + (submitted && !recipient ? ' has-error' : '')
          }
        >
          <label htmlFor="recipient">Recipient Email </label>
          <input
            type="text"
            name="recipient"
            value={recipient}
            onChange={handleChange}
          />
          {submitted && !recipient && (
            <div className="help-block">Recipient email is required</div>
          )}
        </div>
        <div
          className={
            'form-group' + (submitted && !subject ? ' has-error' : '')
          }
        >
          <label htmlFor="recipient">Subject </label>
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={handleChange}
          />
          {submitted && !subject && (
            <div className="help-block">Subject is required</div>
          )}
        </div>
        <div
          className={
            'form-group' + (submitted && !message ? ' has-error' : '')
          }
        >
          <label htmlFor="recipient">Message </label>
          <input
            type="text"
            name="message"
            value={message}
            onChange={handleChange}
          />
          {submitted && !message && (
            <div className="help-block">Message is required</div>
          )}
        </div>
        <div className="form-group">
          <button type='submit' className="btn btn-primary" disabled={loading}>
            Send Message
          </button>
          <button onClick={() => navigate(-1)} >Back</button>
          {loading && (
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          )}
        </div>
        {error && <div className={'alert alert-danger'}>{error}</div>}
      </form>
    </div>
  );
};

export default SendMessagePage;
