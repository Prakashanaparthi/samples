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
    const [newAddress, setNewAddress] = useState({
        name: '', mobile: '', address: '', postalCode: '', town: '', city: '', type: 'home'
    });
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
        setNewAddress({
            name: '', mobile: '', address: '', postalCode: '', town: '', city: '', type: 'home'
        });
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

    const handleBack = () => {
        navigate(-1); // Navigates to the previous page
    };

    return (
        <div className='fullPage'>
            <button className='back-button' onClick={handleBack}>Back</button>
            <div className="checkout-page">
                {addresses.length > 0 ? (
                    <div className="left-column">
                        <h2>Select Delivery Address</h2>
                        <ul className="address-list">
                            {addresses.map((address, index) => (
                                <li key={index} className="address-card">
                                    <div className="address-details">
                                        <p><strong>{address.name}</strong></p>
                                        <p>{address.mobile}</p>
                                        <p>{address.address}, {address.town}, {address.city}</p>
                                        <p>{address.postalCode}</p>
                                    </div>
                                    <div className="address-actions">
                                        <button onClick={() => handleEditAddress(index)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button onClick={() => handleRemoveAddress(index)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className="add-address-button" onClick={handleAddNewAddress}>
                            <FontAwesomeIcon icon={faPlus} /> Add New Address
                        </button>
                    </div>
                ) : (
                    <div className="right-column">
                        <h2>Add New Address</h2>
                        <form className="address-form" onSubmit={handleSaveAddress}>
                            <div className="form-group">
                                <label>Contact Details:</label>
                                <div className="input-row">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={newAddress.name}
                                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Mobile No"
                                        value={newAddress.mobile}
                                        onChange={(e) => setNewAddress({ ...newAddress, mobile: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Address:</label>
                                <div className='addressIcons'>
                                    <input
                                        type="text"
                                        placeholder="Pincode"
                                        value={newAddress.postalCode}
                                        onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='addressIcons'>
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        value={newAddress.address}
                                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='addressIcons'>
                                    <input
                                        type="text"
                                        placeholder="Town"
                                        value={newAddress.town}
                                        onChange={(e) => setNewAddress({ ...newAddress, town: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>City:</label>
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={newAddress.city}
                                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <div className="button-group">
                                    <button
                                        type="button"
                                        className={`type-btn ${newAddress.type === 'home' ? 'active' : ''}`}
                                        onClick={() => setNewAddress({ ...newAddress, type: 'home' })}
                                    >
                                        Home
                                    </button>
                                    <button
                                        type="button"
                                        className={`type-btn ${newAddress.type === 'work' ? 'active' : ''}`}
                                        onClick={() => setNewAddress({ ...newAddress, type: 'work' })}
                                    >
                                        Work
                                    </button>
                                </div>
                            </div>
                            <div className="modal-buttons">
                                <button className='form-btn save-btn' type="submit">Add Address</button>
                                <button className='form-btn cancel-btn' type="button" onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}
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
                        <div className="form-group">
                            <label>Contact Details:</label>
                            <div className="input-row">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newAddress.name}
                                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Mobile No"
                                    value={newAddress.mobile}
                                    onChange={(e) => setNewAddress({ ...newAddress, mobile: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <div className='addressInputs'>
                                <input
                                    type="text"
                                    placeholder="Pincode"
                                    value={newAddress.postalCode}
                                    onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                                    required
                                />
                            </div>
                            <div className='addressInputs'>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={newAddress.address}
                                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                    required
                                />
                            </div>
                            <div className='addressInputs'>
                                <input 
                                    type="text"
                                    placeholder="Town"
                                    value={newAddress.town}
                                    onChange={(e) => setNewAddress({ ...newAddress, town: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>City:</label>
                            <input
                                type="text"
                                placeholder="City"
                                value={newAddress.city}
                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Type:</label>
                            <div className="button-group">
                                <button
                                    type="button"
                                    className={`type-btn ${newAddress.type === 'home' ? 'active' : ''}`}
                                    onClick={() => setNewAddress({ ...newAddress, type: 'home' })}
                                >
                                    Home
                                </button>
                                <button
                                    type="button"
                                    className={`type-btn ${newAddress.type === 'work' ? 'active' : ''}`}
                                    onClick={() => setNewAddress({ ...newAddress, type: 'work' })}
                                >
                                    Work
                                </button>
                            </div>
                        </div>
                        <div className="modal-buttons">
                            <button className='form-btn save-btn' type="submit">Add Address</button>
                            <button className='form-btn cancel-btn' type="button" onClick={handleCloseModal}>Cancel</button>
                        </div>
                    </form>
                </Modal>
            </div>
            <div className='btnContainer'>
                <button className='next-button'>NEXT</button>
            </div>
        </div>
    );
}

export default CheckoutPage;
