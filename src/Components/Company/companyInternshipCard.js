import React,{ useContext } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { MdShoppingBag } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; 
import { StoreContext } from "../../Context/StoreContext.js";


const InternshipCard = ({ internships }) => {
  const navigate = useNavigate();
  const { setSelectedInternship } = useContext(StoreContext);
  
  const handleCardClick = () => {
    setSelectedInternship(internships);
    navigate("/InternshipDetailsPage");  
  };

  return (
    <div
      className='relative p-4 bg-zinc-200 rounded-lg shadow-lg hover:bg-zinc-300 cursor-pointer' // Add cursor-pointer for better UX
      onClick={handleCardClick}
    >
      <button className="absolute top-4 left-4 p-2 bg-white rounded-lg">
        <img src={internships.companyLogo} alt='99x' className="w-16 h-12 object-fill" />
      </button>
      <div className="text-zinc-400 text-sm absolute top-2 right-4">
        Posted: {internships.date}
      </div>
      <div className="mt-20">
        <div className="text-lg font-semibold text-zinc-800 mb-1">
          {internships.position}
        </div>
        <div className="text-slate-500 text-sm mb-2">
          {internships.companyName}
        </div>
        <div className="text-slate-600 text-sm flex items-center mb-2">
          <FaLocationDot className="mr-2" />
          {internships.location}
        </div>
        <div className="text-slate-600 text-sm flex items-center">
          <MdShoppingBag className="mr-2" />
          {internships.jobType}
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
