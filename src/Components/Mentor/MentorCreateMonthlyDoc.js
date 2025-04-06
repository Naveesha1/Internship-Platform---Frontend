import React, { useState } from 'react';

const AssessmentReportForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    address: '',
    phone: '',
    email: '',
    trainingStage: 'Level 3 / Repeat',
    trainingPeriodFrom: '',
    trainingPeriodTo: '',
    trainingEstablishment: '',
    officerInCharge: '',
    officerPhone: '',
    reportPeriodFrom: '',
    reportPeriodTo: '',
    work: 'Good',
    conduct: 'Good',
    attendance: 'Good',
    leave: 'Authorised',
    comments: '',
    signature: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your server
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white">
      <div className="text-center mb-6">
        <h1 className="text-lg font-bold uppercase">Faculty of Information Technology</h1>
        <h2 className="text-lg font-bold uppercase">University of Moratuwa, Sri Lanka</h2>
        <h3 className="text-lg font-bold mt-2">FOUR - WEEKLY CONTINUOUS ASSESSMENT REPORT SHEET</h3>
        <p className="text-sm italic mt-1">(To be submitted Four-Weekly (every four weeks) to the Training Division and a total of 6 reports are expected by the end of training period)</p>
        <p className="text-sm mt-1">Refer also page 5 of Training Handbook</p>
      </div>

      <form onSubmit={handleSubmit} className="border border-gray-800">
        <div className="grid grid-cols-1 gap-0">
          {/* Row 1 - Name */}
          <div className="border-b border-gray-800 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
              <p className="font-bold">1. Name of Undergraduate (as appearing in the Undergraduate Register at the University)</p>
            </div>
            <div className="col-span-12 md:col-span-6 p-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-1 border-b border-dotted border-gray-400"
              />
            </div>
          </div>

          {/* Row 2 - Registration Number */}
          <div className="border-b border-gray-800 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
              <p className="font-bold">2. Undergraduate Registration No.</p>
            </div>
            <div className="col-span-12 md:col-span-6 p-2">
              <input
                type="text"
                name="regNo"
                value={formData.regNo}
                onChange={handleChange}
                className="w-full p-1 border-b border-dotted border-gray-400"
              />
            </div>
          </div>

          {/* Row 3 - Contact Details */}
          <div className="border-b border-gray-800 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
              <p className="font-bold">3. Address, Phone Number and E-mail contact details during training</p>
            </div>
            <div className="col-span-12 md:col-span-6 p-2">
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-1 border-b border-dotted border-gray-400 mb-2"
                rows="1"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-1 border-b border-dotted border-gray-400 mb-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-1 border-b border-dotted border-gray-400"
              />
            </div>
          </div>

          {/* Row 4 - Training Stage */}
          <div className="border-b border-gray-800 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
              <p className="font-bold">4. Training Stage<sup>1</sup></p>
            </div>

            <div className="col-span-12 md:col-span-6 grid grid-cols-2">
              {/* Radio Button: Level 3 */}
              <div className="p-2 border-r border-gray-800 text-center">
                <label className="flex items-center justify-center">
                  <input
                    type="radio"
                    name="trainingStage"
                    value="Level 3"
                    checked={formData.trainingStage === "Level 3"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Level 3
                </label>
              </div>

              {/* Radio Button: Repeat */}
              <div className="p-2 text-center">
                <label className="flex items-center justify-center">
                  <input
                    type="radio"
                    name="trainingStage"
                    value="Repeat"
                    checked={formData.trainingStage === "Repeat"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Repeat
                </label>
              </div>
            </div>
          </div>


          {/* Row 5 - Overall Training Period */}
          <div className="border-b border-gray-800 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
              <p className="font-bold">5. Overall Training Period</p>
            </div>

            <div className="col-span-12 md:col-span-6 p-2">
              <div className="grid grid-cols-12 gap-2">
                {/* From Label */}
                <div className="col-span-2 flex items-center">
                  <p>From</p>
                </div>

                {/* From Input */}
                <div className="col-span-4 border-r border-gray-800 pr-2">
                  <input
                    type="date"
                    name="trainingFrom"
                    value={formData.trainingFrom}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </div>

                {/* To Label */}
                <div className="col-span-2 flex items-center">
                  <p>To</p>
                </div>

                {/* To Input */}
                <div className="col-span-4">
                  <input
                    type="date"
                    name="trainingTo"
                    value={formData.trainingTo}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
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
              <input
                type="text"
                name="officerInCharge"
                placeholder="Officer in charge"
                value={formData.officerInCharge}
                onChange={handleChange}
                className="w-full p-1 border-b border-dotted border-gray-400 mb-2"
              />
              <textarea
                name="trainingEstablishment"
                placeholder='Address'
                value={formData.trainingEstablishment}
                onChange={handleChange}
                className="w-full p-1 border-b border-dotted border-gray-400 mb-2"
                rows="2"
              />
              <div className="mt-2">
                <input
                  type="text"
                  name="PhoneNumber"
                  value={formData.trainingStageRating}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-2 py-1 border border-gray-800 rounded"
                />
              </div>

            </div>
          </div>

          {/* Row 8 - Report for four week period */}
          <div className="border-b border-gray-800 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
              <p className="font-bold">8. Report for four (4) week period</p>
            </div>

            <div className="col-span-12 md:col-span-6 p-2">
              {/* From Section */}
              <div className="grid grid-cols-12 mb-2">
                <div className="col-span-2 flex items-center">
                  <p>From</p>
                </div>
                <div className="col-span-10">
                  <input
                    type="text"
                    name="reportFrom"
                    value={formData.reportFrom}
                    onChange={handleChange}
                    placeholder="Enter start date or details"
                    className="w-full px-2 py-1 border border-gray-800 rounded"
                  />
                </div>
              </div>

              {/* To Section */}
              <div className="grid grid-cols-12">
                <div className="col-span-2 flex items-center">
                  <p>To</p>
                </div>
                <div className="col-span-10">

                  <input
                    type="text"
                    name="reportTo"
                    value={formData.reportTo}
                    onChange={handleChange}
                    placeholder="Enter end date or details"
                    className="w-full px-2 py-1 border border-gray-800 rounded"
                  />
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
                <div className="p-2 border-r border-gray-800 text-center">
                  <label className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="work"
                      value="Excellent"
                      checked={formData.work === "Excellent"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Excellent
                  </label>
                </div>
                <div className="p-2 border-r border-gray-800 text-center">
                  <label className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="work"
                      value="Good"
                      checked={formData.work === "Good"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Good
                  </label>
                </div>
                <div className="p-2 border-r border-gray-800 text-center">
                  <label className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="work"
                      value="Satisfactory"
                      checked={formData.work === "Satisfactory"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Satisfactory
                  </label>
                </div>
                <div className="p-2 text-center">
                  <label className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="work"
                      value="Poor"
                      checked={formData.work === "Poor"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Poor
                  </label>
                </div>
              </div>
            </div>

            {/* 9.2 Conduct */}
            <div className="border-t border-gray-800 grid grid-cols-12">
              <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
                <p className="pl-4">9.2 Conduct<sup>(1)</sup></p>
              </div>
              <div className="col-span-12 md:col-span-6 grid grid-cols-4">
                <div className="p-2 border-r border-gray-800 text-center">
                  <label className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="conduct"
                      value="Excellent"
                      checked={formData.conduct === "Excellent"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Excellent
                  </label>
                </div>
                <div className="p-2 border-r border-gray-800 text-center">
                  <label className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="conduct"
                      value="Good"
                      checked={formData.conduct === "Good"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Good
                  </label>
                </div>
                <div className="p-2 border-r border-gray-800 text-center">
                  <label className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="conduct"
                      value="Satisfactory"
                      checked={formData.conduct === "Satisfactory"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Satisfactory
                  </label>
                </div>
                <div className="p-2 text-center">
                  <label className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="conduct"
                      value="Poor"
                      checked={formData.conduct === "Poor"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Poor
                  </label>
                </div>
              </div>
            </div>

            {/* 9.3 Attendance */}
            <div className="border-t border-gray-800 grid grid-cols-12">
              <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
                <p className="pl-4">9.3 Attendance<sup>(1)</sup></p>
              </div>
              <div className="col-span-12 md:col-span-6 grid grid-cols-4">
                <div className="p-2 border-r border-gray-800 text-center">
                  <label className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="Excellent"
                      checked={formData.attendance === "Excellent"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Excellent
                  </label>
                </div>
                <div className="p-2 border-r border-gray-800 text-center">
                  <label className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="Good"
                      checked={formData.attendance === "Good"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Good
                  </label>
                </div>
                <div className="p-2 border-r border-gray-800 text-center">
                  <label className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="Satisfactory"
                      checked={formData.attendance === "Satisfactory"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Satisfactory
                  </label>
                </div>
                <div className="p-2 text-center">
                  <label className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="Poor"
                      checked={formData.attendance === "Poor"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Poor
                  </label>
                </div>
              </div>
            </div>

            {/* 9.4 Days of leave */}
            <div className="border-t border-gray-800 grid grid-cols-12">
              <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
                <p className="pl-4">9.4 Days of leave during month</p>
              </div>
              <div className="col-span-12 md:col-span-6 grid grid-cols-2">
                <div className="p-2 border-r border-gray-800 text-center">
                  <label className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="leave"
                      value="Authorised"
                      checked={formData.leave === "Authorised"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Authorised
                  </label>
                </div>
                <div className="p-2 text-center">
                  <label className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="leave"
                      value="Unauthorised"
                      checked={formData.leave === "Unauthorised"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Unauthorised
                  </label>
                </div>
              </div>
            </div>

            {/* 9.5 Comments */}
            <div className="border-t border-gray-800 grid grid-cols-12">
              <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
                <p className="pl-4">9.5 Comments by Engineer / Officer in charge of Undergraduate</p>
              </div>
              <div className="col-span-12 md:col-span-6 p-2">
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  className="w-full p-1 border-b border-dotted border-gray-400"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Row 9 - Signature */}
          <div className="border-b border-gray-800 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
              <p className="font-bold">9. Signature, Name and Official Seal of Engineer / Officer in charge of Undergraduate</p>
            </div>
            <div className="col-span-12 md:col-span-6 p-2">
              <textarea
                name="signature"
                value={formData.signature}
                onChange={handleChange}
                className="w-full p-1 border-b border-dotted border-gray-400"
                rows="3"
              />
            </div>
          </div>
        </div>
      </form>



      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="bg-teal-800 text-white px-4 py-2 rounded hover:bg-teal-600"
          onClick={handleSubmit}
        >
          Create Report
        </button>
      </div>
    </div>
  );
};

export default AssessmentReportForm;