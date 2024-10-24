import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { MdShoppingBag } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; 
import x99 from '../../Images/dashboard/99x.png';

const InternshipCard = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/InternshipDetailsPage'); 
  };

  return (
    <div
      className='relative p-4 bg-zinc-200 rounded-lg shadow-lg hover:bg-zinc-300 cursor-pointer' // Add cursor-pointer for better UX
      onClick={handleCardClick}
    >
      <button className="absolute top-4 left-4 p-2 bg-white rounded-lg">
        <img src={x99} alt='99x' className="w-16 h-12 object-fill" />
      </button>
      <div className="text-zinc-400 text-sm absolute top-2 right-4">
        10 days left
      </div>
      <div className="mt-20">
        <div className="text-lg font-semibold text-zinc-800 mb-1">
          Software Tester
        </div>
        <div className="text-slate-500 text-sm mb-2">
          99x Technology
        </div>
        <div className="text-slate-600 text-sm flex items-center mb-2">
          <FaLocationDot className="mr-2" />
          Colombo 06
        </div>
        <div className="text-slate-600 text-sm flex items-center">
          <MdShoppingBag className="mr-2" />
          Part-time
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
