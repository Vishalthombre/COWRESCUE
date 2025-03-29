import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import "./CowRescueForm.css"; // Import CSS

const CowRescueForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    usercontact: "",
    location: "",
    breed: "",
    healthStatus: "Healthy",
    image: null,
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraOn, setCameraOn] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cameraOn) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } }) // Use back camera
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => console.error("Camera access error:", error));
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraOn]);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);
    setFormData((prevData) => ({ ...prevData, image: imageData }));

    if (video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
    }
    setCameraOn(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please capture an image before submitting.");
      return;
    }
    setLoading(true);
    onSubmit(formData).finally(() => {
      setLoading(false);
      setFormData({
        username: "",
        usercontact: "",
        location: "",
        breed: "",
        healthStatus: "Healthy",
        image: null,
      });
      setCapturedImage(null);
      setCameraOn(true);
    });
  };

  return (
    <div className="rescue-form-container">
      {/* Camera Section */}
      <div className="camera-container">
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className="captured-image" />
        ) : (
          <video ref={videoRef} autoPlay playsInline className="camera-view"></video>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>

      {/* Capture Button */}
      {cameraOn && (
        <Button onClick={captureImage} variant="danger" className="capture-btn">
          📷 Capture
        </Button>
      )}

      {/* Form Section */}
      <Form onSubmit={handleSubmit} className="rescue-form">
        <div className="form-row">
          <Form.Group className="form-group">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              name="usercontact"
              value={formData.usercontact}
              onChange={handleChange}
              placeholder="Enter your contact number"
              required
            />
          </Form.Group>
        </div>

        <div className="form-row">
          <Form.Group className="form-group">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter the rescue location"
              required
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Breed</Form.Label>
            <Form.Control
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Enter breed type"
              required
            />
          </Form.Group>
        </div>

        <Form.Group className="form-group">
          <Form.Label>Health Status</Form.Label>
          <Form.Select name="healthStatus" value={formData.healthStatus} onChange={handleChange}>
            <option value="Healthy">Healthy</option>
            <option value="Injured">Injured</option>
            <option value="Critical">Critical</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary" className="submit-btn" disabled={loading}>
          {loading && <Spinner animation="border" size="sm" className="me-2" />}
          🚑 Submit Rescue Request
        </Button>
      </Form>
    </div>
  );
};

export default CowRescueForm;
