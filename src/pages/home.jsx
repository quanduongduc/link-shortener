import React, { useState } from 'react';
import './home.css'; // Import the CSS file
import { API_URL } from '../utils';
import Modal from './modal';

const Home = () => {
    const [url, setUrl] = useState('');
    const [shortenUrl, setShortenUrl] = useState('');
    const [modal, setModal] = useState({
        show: false,
    });

    const handleInputChange = (event) => {
        setUrl(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${API_URL}/links/shorten`, {
            method: "POST",
            body: JSON.stringify({
                url: url
            }),
        },).then(res => {
            console.log(res);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json()
        }).then(
            res => {
                setShortenUrl(res.data.shortenUrl)
            }
        ).catch(error => {
            setModal({
                title: "Error",
                message: error.message,
                show: true
            })
        })
    };

    const handleCloseModal = () => {
        setModal({
            show: false
        });
    };

    return (
        <div className="form-container">
            <h2>Form Example</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Input:
                    <input type="text" value={url} onChange={handleInputChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            <div className="display-container">
                <strong>Display:</strong> {shortenUrl}
            </div>
            {modal.show && (
                <Modal onClose={handleCloseModal}>
                    <h3>{modal.title}</h3>
                    <p>{modal.message}</p>
                </Modal>
            )}
        </div>
    );
};

export default Home;
