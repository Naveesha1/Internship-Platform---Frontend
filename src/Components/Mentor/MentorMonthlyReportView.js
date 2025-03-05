import React from 'react';

const MentorMonthlyReportView = () => {
  // Dummy data that would typically come from an API
  const formData = {
    name: 'Kasun Perera',
    regNo: '19/IT/0123',
    address: '123 Temple Road, Colombo 07',
    phone: '+94 77 123 4567',
    email: 'kasun.p@gmail.com',
    trainingStage: 'Level 3 / Repeat',
    trainingPeriodFrom: '2025-01-15',
    trainingPeriodTo: '2025-07-15',
    trainingEstablishment: 'XYZ Software Solutions\n45 Tech Park, Colombo 10',
    officerInCharge: 'Mr. Saman Fernando - Senior Engineer',
    officerPhone: '+94 11 234 5678',
    reportPeriodFrom: '2025-02-01',
    reportPeriodTo: '2025-02-28',
    work: 'Good',
    conduct: 'Excellent',
    attendance: 'Good',
    leave: 'Authorised',
    comments: 'Kasun has shown great initiative during this period. He has completed all assigned tasks on time and has shown a willingness to learn new technologies.',
    signature: 'S. Fernando\nSenior Software Engineer\nXYZ Software Solutions'
  };

  // Function to render date boxes with values
  const renderDateBoxes = (dateString, count) => {
    const dateArray = dateString ? dateString.split('-').join('').split('') : [];
    
    return (
      <div className="grid grid-cols-8 gap-1">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="w-6 h-6 border border-gray-800 flex items-center justify-center">
            {dateArray[i] || ''}
          </div>
        ))}
      </div>
    );
  };

  // Function to render empty boxes
  const renderEmptyBoxes = (count) => {
    return (
      <div className="grid grid-cols-10 gap-1">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="w-6 h-6 border border-gray-800"></div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white overflow-y-auto h-screen mt-4">
      <div className="text-center mb-6">
        <h1 className="text-lg font-bold uppercase">Faculty of Information Technology</h1>
        <h2 className="text-lg font-bold uppercase">University of Moratuwa, Sri Lanka</h2>
        <h3 className="text-lg font-bold mt-2">FOUR - WEEKLY CONTINUOUS ASSESSMENT REPORT SHEET</h3>
        <p className="text-sm italic mt-1">(To be submitted Four-Weekly (every four weeks) to the Training Division and a total of 6 reports are expected by the end of training period)</p>
        <p className="text-sm mt-1">Refer also page 5 of Training Handbook</p>
      </div>

      <div className="border border-gray-800">
        <div className="grid grid-cols-1 gap-0">
          {/* Row 1 - Name */}
          <div className="border-b border-gray-800 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
              <p className="font-bold">1. Name of Undergraduate (as appearing in the Undergraduate Register at the University)</p>
            </div>
            <div className="col-span-12 md:col-span-6 p-2">
              <p className="p-1">{formData.name}</p>
            </div>
          </div>

          {/* Row 2 - Registration Number */}
          <div className="border-b border-gray-800 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
              <p className="font-bold">2. Undergraduate Registration No.</p>
            </div>
            <div className="col-span-12 md:col-span-6 p-2">
              <p className="p-1">{formData.regNo}</p>
            </div>
          </div>

          {/* Row 3 - Contact Details */}
          <div className="border-b border-gray-800 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
              <p className="font-bold">3. Address, Phone Number and E-mail contact details during training</p>
            </div>
            <div className="col-span-12 md:col-span-6 p-2">
              <p className="p-1 mb-2">{formData.address}</p>
              <p className="p-1 mb-2">{formData.phone}</p>
              <p className="p-1">{formData.email}</p>
            </div>
          </div>

          {/* Row 4 - Training Stage */}
          <div className="border-b border-gray-800 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
              <p className="font-bold">4. Training Stage<sup>1</sup></p>
            </div>
            <div className="col-span-12 md:col-span-6 p-2">
              <div className="flex items-center">
                <div className="flex-1">
                  <p>{formData.trainingStage}</p>
                </div>
                {renderEmptyBoxes(10)}
              </div>
            </div>
          </div>

          {/* Row 5 - Overall Training Period */}
          <div className="border-b border-gray-800 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
              <p className="font-bold">5. Overall Training Period</p>
            </div>
            <div className="col-span-12 md:col-span-6 p-2">
              <div className="grid grid-cols-12">
                <div className="col-span-2 flex items-center">
                  <p>From</p>
                </div>
                <div className="col-span-4 border-r border-gray-800">
                  {renderDateBoxes(formData.trainingPeriodFrom, 8)}
                </div>
                <div className="col-span-2 flex items-center pl-2">
                  <p>To</p>
                </div>
                <div className="col-span-4">
                  {renderDateBoxes(formData.trainingPeriodTo, 8)}
                </div>
              </div>
            </div>
          </div>

          {/* Row 7 - Training Establishment */}
          <div className="border-b border-gray-800 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
              <p className="font-bold">7. Name, Address and Phone No. of Training Establishment and Officer in charge of Undergraduate</p>
            </div>
            <div className="col-span-12 md:col-span-6 p-2">
              <p className="p-1 mb-2 whitespace-pre-line">{formData.trainingEstablishment}</p>
              <p className="p-1 mb-2">{formData.officerInCharge}</p>
              {renderEmptyBoxes(10)}
            </div>
          </div>

          {/* Row 8 - Report for four week period */}
          <div className="border-b border-gray-800 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
              <p className="font-bold">8. Report for four (4) week period</p>
            </div>
            <div className="col-span-12 md:col-span-6 p-2">
              <div className="grid grid-cols-12 mb-2">
                <div className="col-span-2 flex items-center">
                  <p>From</p>
                </div>
                <div className="col-span-10">
                  {renderDateBoxes(formData.reportPeriodFrom, 10)}
                </div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-2 flex items-center">
                  <p>To</p>
                </div>
                <div className="col-span-10">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-300 p-1 text-center">Week 5</div>
                    <div className="bg-gray-300 p-1 text-center">Week 9</div>
                  </div>
                  {renderDateBoxes(formData.reportPeriodTo, 10)}
                </div>
              </div>
            </div>
          </div>

          {/* Row 9 - Details on Undergraduate performance */}
          <div className="border-b border-gray-800">
            <div className="p-2">
              <p className="font-bold">9. Details on Undergraduate's:</p>
            </div>
            
            {/* 9.1 Work */}
            <div className="border-t border-gray-800 grid grid-cols-12">
              <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
                <p className="pl-4">9.1 Work<sup>(1)</sup></p>
              </div>
              <div className="col-span-12 md:col-span-6 grid grid-cols-4">
                <div className={`p-2 border-r border-gray-800 text-center ${formData.work === 'Excellent' ? 'bg-blue-100' : ''}`}>
                  <p>Excellent</p>
                </div>
                <div className={`p-2 border-r border-gray-800 text-center ${formData.work === 'Good' ? 'bg-blue-100' : ''}`}>
                  <p>Good</p>
                </div>
                <div className={`p-2 border-r border-gray-800 text-center ${formData.work === 'Satisfactory' ? 'bg-blue-100' : ''}`}>
                  <p>Satisfactory</p>
                </div>
                <div className={`p-2 text-center ${formData.work === 'Poor' ? 'bg-blue-100' : ''}`}>
                  <p>Poor</p>
                </div>
              </div>
            </div>
            
            {/* 9.2 Conduct */}
            <div className="border-t border-gray-800 grid grid-cols-12">
              <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
                <p className="pl-4">9.2 Conduct<sup>(1)</sup></p>
              </div>
              <div className="col-span-12 md:col-span-6 grid grid-cols-4">
                <div className={`p-2 border-r border-gray-800 text-center ${formData.conduct === 'Excellent' ? 'bg-blue-100' : ''}`}>
                  <p>Excellent</p>
                </div>
                <div className={`p-2 border-r border-gray-800 text-center ${formData.conduct === 'Good' ? 'bg-blue-100' : ''}`}>
                  <p>Good</p>
                </div>
                <div className={`p-2 border-r border-gray-800 text-center ${formData.conduct === 'Satisfactory' ? 'bg-blue-100' : ''}`}>
                  <p>Satisfactory</p>
                </div>
                <div className={`p-2 text-center ${formData.conduct === 'Poor' ? 'bg-blue-100' : ''}`}>
                  <p>Poor</p>
                </div>
              </div>
            </div>
            
            {/* 9.3 Attendance */}
            <div className="border-t border-gray-800 grid grid-cols-12">
              <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
                <p className="pl-4">9.3 Attendance<sup>(1)</sup></p>
              </div>
              <div className="col-span-12 md:col-span-6 grid grid-cols-4">
                <div className={`p-2 border-r border-gray-800 text-center ${formData.attendance === 'Excellent' ? 'bg-blue-100' : ''}`}>
                  <p>Excellent</p>
                </div>
                <div className={`p-2 border-r border-gray-800 text-center ${formData.attendance === 'Good' ? 'bg-blue-100' : ''}`}>
                  <p>Good</p>
                </div>
                <div className={`p-2 border-r border-gray-800 text-center ${formData.attendance === 'Satisfactory' ? 'bg-blue-100' : ''}`}>
                  <p>Satisfactory</p>
                </div>
                <div className={`p-2 text-center ${formData.attendance === 'Poor' ? 'bg-blue-100' : ''}`}>
                  <p>Poor</p>
                </div>
              </div>
            </div>
            
            {/* 9.4 Days of leave */}
            <div className="border-t border-gray-800 grid grid-cols-12">
              <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
                <p className="pl-4">9.4 Days of leave during month</p>
              </div>
              <div className="col-span-12 md:col-span-6 grid grid-cols-2">
                <div className={`p-2 border-r border-gray-800 text-center ${formData.leave === 'Authorised' ? 'bg-blue-100' : ''}`}>
                  <p>Authorised</p>
                </div>
                <div className={`p-2 text-center ${formData.leave === 'Unauthorised' ? 'bg-blue-100' : ''}`}>
                  <p>Unauthorised</p>
                </div>
              </div>
            </div>
            
            {/* 9.5 Comments */}
            <div className="border-t border-gray-800 grid grid-cols-12">
              <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
                <p className="pl-4">9.5 Comments by Engineer / Officer in charge of Undergraduate</p>
              </div>
              <div className="col-span-12 md:col-span-6 p-2">
                <p className="p-1">{formData.comments}</p>
              </div>
            </div>
          </div>

          {/* Row 9 - Signature */}
          <div className="border-b border-gray-800 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
              <p className="font-bold">9. Signature, Name and Official Seal of Engineer / Officer in charge of Undergraduate</p>
            </div>
            <div className="col-span-12 md:col-span-6 p-2">
              <p className="p-1 whitespace-pre-line">{formData.signature}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border border-gray-800 p-4">
        <p className="text-center">Please present a handwritten (do not print) summary of your work experience during the four (04) weeks by using this sheet (Half A4 sheet to be used)</p>
      </div>

      <div className="mt-4 flex justify-end">
        <button 
          type="button" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => window.print()}
        >
          Print Report
        </button>
      </div>
    </div>
  );
};

export default MentorMonthlyReportView;