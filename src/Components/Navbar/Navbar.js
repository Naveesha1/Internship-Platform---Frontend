import React from 'react';
import logo from '../../Images/logo.png';
import envelop from '../../Images/Envelope.png';
import doorbell from '../../Images/Doorbell.png';
import profile from '../../Images/Profile.png';

const Navbar = () => {
  return (
    <div className="bg-white shadow-custom">
      <nav className="flex justify-between items-center px-6 py-0">
        {/* Logo aligned to the left */}
        <img src={logo} alt="Logo" className="h-20" />

        {/* Icons aligned to the right with some gap */}
        <div className="flex items-center space-x-6">
          <img src={envelop} alt="Envelope" className="h-6 cursor-pointer" />
          <img src={doorbell} alt="Doorbell" className="h-6 cursor-pointer" />
          <img src={profile} alt="Profile" className="h-6 cursor-pointer" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
