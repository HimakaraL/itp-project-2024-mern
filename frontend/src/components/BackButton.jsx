import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className="absolute top-0 left-0 ml-4 mt-4">
      <Link to={destination}>
        <BsArrowLeft className="h-10 w-10 text-black" />
      </Link>
    </div>
  );
};

export default BackButton;
