import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageUserPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await ApiService.getAllUsers();
                const allUsers = response.userList;
                setUsers(allUsers);
                setFilteredUsers(allUsers);
            } catch (error) {
                toast.error('Error fetching users:', error.message);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers(searchTerm);
    }, [searchTerm, users]);

    const filterUsers = (term) => {
        if (term === '') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter((user) =>
                user.name && user.name.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='bookings-container'>
            <ToastContainer position="top-right" autoClose={5000} />
            <h2>All Users</h2>
            <div className='search-div'>
                <label>Filter by User's Name:</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter user's name"
                />
            </div>

            <div className="booking-results">
                {currentUsers.map((user) => (
                    <div key={user.id} className="booking-result-item">
                        <h4><strong>Name:</strong> {user.name}</h4>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                        <button
                            className="edit-room-button"
                            onClick={() => navigate(`/admin/edit-user/${user.id}`)}
                        >Manage User</button>
                    </div>
                ))}
            </div>

            <Pagination
                roomsPerPage={usersPerPage}
                totalRooms={filteredUsers.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default ManageUserPage;