import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import './CheckoutPage.css';

Modal.setAppElement('#root');

function CheckoutPage() {
    const [addresses, setAddresses] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAddress, setNewAddress] = useState({ name: '', address: '', city: '', postalCode: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const storedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
        setAddresses(storedAddresses);

        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    const handleAddNewAddress = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewAddress({ name: '', address: '', city: '', postalCode: '' });
    };

    const handleSaveAddress = (e) => {
        e.preventDefault();
        const updatedAddresses = [...addresses, newAddress];
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
        handleCloseModal();
    };

    const handleEditAddress = (index) => {
        const addressToEdit = addresses[index];
        setNewAddress(addressToEdit);
        setIsModalOpen(true);
        const updatedAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(updatedAddresses);
    };

    const handleRemoveAddress = (index) => {
        const updatedAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price) * item.count, 0);
    };

    return (
        <>
        <div className="checkout-page">
            <div className="left-column">
            <button className="add-address-button" onClick={handleAddNewAddress}><FontAwesomeIcon icon={faPlus} /> Add New Address</button>
                <h2>Select Delivery Address</h2>
                {addresses.length === 0 ? (
                    <p>No addresses available. Add a new address.</p>
                ) : (
                    <ul>
                        {addresses.map((address, index) => (
                            <li key={index}>
                                <div className="address-card">
                                    <div>
                                        <p><strong>{address.name}</strong></p>
                                        <p>{address.address}</p>
                                        <p>{address.city}, {address.postalCode}</p>
                                    </div>
                                    <div>
                                        <button onClick={() => handleEditAddress(index)}><FontAwesomeIcon icon={faEdit} /></button>
                                        <button onClick={() => handleRemoveAddress(index)}><FontAwesomeIcon icon={faTrash} /></button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                
            </div>
            <div className="right-column">
                <h2>Order Summary</h2>
                {cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <img className='images' src={item.img} alt={item.name} />
                        <div className="item-details">
                            <p><strong>{item.name}</strong></p>
                            <p>Quantity: {item.count}</p>
                            <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
                <div className="summary-details">
                    <p>Total Items: {cartItems.reduce((total, item) => total + item.count, 0)}</p>
                    <p>Total Price: ${calculateTotal().toFixed(2)}</p>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Add New Address"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Add New Address</h2>
                <form className="address-form" onSubmit={handleSaveAddress}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                            required
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            type="text"
                            value={newAddress.address}
                            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                            required
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            required
                        />
                    </label>
                    <label>
                        Postal Code:
                        <input
                            type="text"
                            value={newAddress.postalCode}
                            onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                            required
                        />
                    </label>
                    <div className="modal-buttons">
                        <button className='form-btn' type="submit">Save</button>
                        <button className='form-btn' type="button" onClick={handleCloseModal}>Cancel</button>
                    </div>
                </form>
            </Modal>
            
        </div>
        <div className='btnContainer'>
        <button className='next-button'>NEXT</button>
        </div>
        </>
    );
}

export default CheckoutPage;
