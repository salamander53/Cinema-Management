import React from "react";
import { useNavigate } from "react-router-dom";
import "./FlashCard.css";

const FlashCard = ({ title, description, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div className="flashcard" onClick={handleClick}>
      <h2 className="flashcard-title">{title}</h2>
      <p className="flashcard-description">{description}</p>
    </div>
  );
};

export default FlashCard;
