import React from "react";
import "./CowRescueList.css";

const CowRescueList = ({ rescues, onDelete }) => {
  return (
    <div className="cow-rescue-list">
      <div className="rescue-grid">
        {rescues.map((rescue) => (
          <div className="rescue-card" key={rescue._id}>
            <div className="image-container">
              <img src={rescue.imageUrl} alt="Rescued Cow" />
            </div>
            <div className="rescue-details">
              <h3>{rescue.username}</h3>
              <p><strong>Contact:</strong> {rescue.usercontact}</p>
              <p><strong>Location:</strong> {rescue.location}</p>
              <p><strong>Breed:</strong> {rescue.breed}</p>
              <p><strong>Health Status:</strong> {rescue.healthStatus}</p>
              <div className="rescue-actions">
                <button className="initiate-btn">Initiate Rescue</button>
                <button className="delete-btn" onClick={() => onDelete(rescue._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CowRescueList;
