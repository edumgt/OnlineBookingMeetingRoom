import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditRoomPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        roomName: '',
        roomType: '',
        roomPhotoURL: '',
        capacity: '',
        description: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await ApiService.getRoomById(roomId);
                setRoomDetails({
                    roomName: response.room.roomName,
                    roomType: response.room.roomType,
                    roomPhotoURL: response.room.roomPhotoURL,
                    capacity: response.room.capacity,
                    description: response.room.description,
                });
            } catch (error) {
                toast.error(error.response?.data?.message || error.message);
            }
        };
        fetchRoomDetails();
    }, [roomId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };


    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('roomName', roomDetails.roomName);
            formData.append('roomType', roomDetails.roomType);
            formData.append('capacity', roomDetails.capacity);
            formData.append('description', roomDetails.description);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.updateRoom(roomId, formData);
            if (result.statusCode === 200) {
                toast.success('Room updated successfully.');
                window.scrollTo({ top: 0, behavior: 'smooth' });

                setTimeout(() => {
                    navigate('/admin/manage-rooms');
                }, 3000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Do you want to delete this room?')) {
            try {
                const result = await ApiService.deleteRoom(roomId);
                if (result.statusCode === 200) {
                    toast.success('Room Deleted successfully.');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    setTimeout(() => {
                        navigate('/admin/manage-rooms');
                    }, 3000);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || error.message);
            }
        }
    };

    return (
        <div className="edit-room-container">
            <ToastContainer position="top-right" autoClose={5000} />
            <h2>Edit Room</h2>
            <div className="edit-room-form">
                <div className="form-group">
                    {preview ? (
                        <img src={preview} alt="Room Preview" className="room-photo-preview" />
                    ) : (
                        roomDetails.roomPhotoURL && (
                            <img src={roomDetails.roomPhotoURL} alt="Room" className="room-photo" />
                        )
                    )}
                    <input
                        type="file"
                        name="roomPhoto"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label>Room Name</label>
                    <input
                        type="text"
                        name="roomName"
                        value={roomDetails.roomName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Room Type</label>
                    <input
                        type="text"
                        name="roomType"
                        value={roomDetails.roomType}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Room Capacity</label>
                    <input
                        type="number"
                        name="capacity"
                        value={roomDetails.capacity}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Room Description</label>
                    <textarea
                        name="description"
                        value={roomDetails.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button className="update-button" onClick={handleUpdate}>Update Room</button>
                <button className="delete-button" onClick={handleDelete}>Delete Room</button>
            </div>
        </div>
    );
};

export default EditRoomPage;