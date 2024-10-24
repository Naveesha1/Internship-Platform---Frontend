import React,{useState} from 'react';
import x99 from '../../Images/dashboard/99x.png'
import { IoLocationSharp} from "react-icons/io5";
import { MdShoppingBag } from "react-icons/md";
import CvSelectionModal from '../../Components/Student/CVSelectionModal'

function InternshipDetails() {
    const [isOpen, setIsOpen] = useState(false);

  const handleApplySubmit = async (selectedCvId) => {
    try {
      // Replace with actual API call
      await fetch('/api/apply', {
        method: 'POST',
        body: JSON.stringify({ cvId: selectedCvId }),
      });
      
      alert('Application submitted successfully!');
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application');
    }
  };
    return (
        <div className="flex justify-center items-center min-h-screen mt-4 mb-4">
    
            <div className="box-border w-full max-w-[900px] h-auto p-6 border rounded-sm shadow-md bg-slate-100">
                {/* Card content */}
                <div className="flex items-center mb-4">
                    <img src={x99} alt="Company Logo" className="h-16 w-18 mr-4 border-2 border-slate-200 bg-white" />
                    <h2 className="font-serif text-xl text-cyan-600">99x Technology</h2>
                </div>
                <div className=''>
                    <h1 className="font-serif text-2xl  font-semibold mb-2">Software Developer Intern</h1>
                    <p className="text-sm text-slate-500">
                        <span className="text-cyan-600">5 hours ago</span> &nbsp; • &nbsp; 50 Applications
                    </p>
                </div>

                <div className="text-gray-600 mb-4 mt-4">
                    <p className="flex items-center"><span className="mr-2"><MdShoppingBag /></span>Remote • Physical</p>
                    <p className="flex items-center"><span className="mr-2"><IoLocationSharp /></span>349 Colombo Main Rd, Colombo 00300</p>
                </div>

                <div className="mb-4">
                    <h3 className="font-bold text-gray-700">About Us...</h3>
                    <p className="text-gray-600 text-sm">
                        We are seeking a Software Engineer to manage WS02 Developer Operations, handle cloud infrastructure, automate tasks, and support continuous delivery. The role requires a passion for learning new technologies.
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="font-bold text-gray-700">Responsibilities</h3>
                    <ul className="text-gray-600 text-sm list-disc ml-5">
                        <li>Analyzing logs and identifying potential issues with computer systems.</li>
                        <li>Introducing and integrating new technologies into existing data center environments.</li>
                        <li>Performing backups and routine audits.</li>
                        <li>Applying system updates, patches, and configuration changes.</li>
                        <li>Responsibility for documenting the configuration of the system.</li>
                    </ul>
                </div>

                <div className="mb-4">
                    <h3 className="font-bold text-gray-700">Requirements</h3>
                    <ul className="text-gray-600 text-sm list-disc ml-5">
                        <li>Unix</li>
                        <li>C/C++</li>
                        <li>Perl</li>
                        <li>Linux</li>
                        <li>Oracle databases & PL/SQL</li>
                        <li>Tuxedo</li>
                    </ul>
                </div>

                <div className="flex justify-end">
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-teal-600 text-white px-12 py-2 rounded-full shadow-md hover:bg-teal-700"
          >
            Apply
          </button>
        </div>

        <CvSelectionModal 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSubmit={handleApplySubmit}
        />
      </div>
    </div>
  );
};

export default InternshipDetails;
