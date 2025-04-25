import React, { useState, useRef, useContext, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useReports } from '../../Context/ReportContext';
import { StoreContext } from '../../Context/StoreContext';
import { jwtDecode } from 'jwt-decode';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const MentorCreateMonthlyDoc = () => {
  const { url } = useContext(StoreContext);
  const location = useLocation();
  const studentFromCard = location.state?.student;
  const availableMonths = location.state?.availableMonths || [];
  
  const formRef = useRef(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [mentorData, setMentorData] = useState(null);
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
    leaveAuthorised: 0,
    leaveUnauthorised: 0,
    comments: '',
    signature: ''
  });

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const userEmail = decodedToken.email;
  
  // Initialize Firebase storage
  const storage = getStorage();
  
  const { addReport } = useReports();
  
// Format date from card (DD/MM/YYYY) to form input format (YYYY-MM-DD)
const formatCardDateForInput = (dateString) => {
  if (!dateString) return '';
  
  const [day, month, year] = dateString.split('/');
  if (!day || !month || !year) return '';
  
  return `${year}-${month}-${day}`;
};

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // First check if we have student data from the card
        if (studentFromCard) {
          
          // Auto-populate student fields from card data
          setFormData(prevState => ({
            ...prevState,
            name: studentFromCard.name || '',
            regNo: studentFromCard.id || '',
            address: studentFromCard.address || '',
            phone: studentFromCard.phone || '',
            email: studentFromCard.email || '',
            trainingPeriodFrom: formatCardDateForInput(studentFromCard.startDate) || '',
            trainingPeriodTo: formatCardDateForInput(studentFromCard.endDate) || '',
          }));
        } else {
          // Fetch student data from the backend if no card data available
          const studentResponse = await axios.post(`${url}/api/student/getCvDetails`, { 
            registeredEmail: userEmail 
          });
          
          if (studentResponse.data.success) {
            setStudentData(studentResponse.data.student);
            
            // Auto-populate student fields
            setFormData(prevState => ({
              ...prevState,
              name: studentResponse.data.student.name || '',
              regNo: studentResponse.data.student.id || '',
              address: studentResponse.data.student.address || '',
              phone: studentResponse.data.student.phone || '',
              email: studentResponse.data.student.email || '',
              trainingPeriodFrom: formatDateForInput(studentResponse.data.student.startDate) || '',
              trainingPeriodTo: formatDateForInput(studentResponse.data.student.endDate) || '',
            }));
          }
        }
        
        // Always fetch mentor data from API
        const mentorResponse = await axios.post(`${url}/api/mentor/getProfile`, 
          { registeredEmail: userEmail },
          {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (mentorResponse.data.success) {
          setMentorData(mentorResponse.data.data);
          
          // Auto-populate mentor fields
          setFormData(prevState => ({
            ...prevState,
            trainingEstablishment: mentorResponse.data.data.address || '',
            officerInCharge: mentorResponse.data.data.name || '',
            officerPhone: mentorResponse.data.data.contactNumber || '',
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();

      // Set default report period (current month)
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
      setFormData(prevState => ({
        ...prevState,
        reportPeriodFrom: formatDateForInput(firstDayOfMonth),
        reportPeriodTo: formatDateForInput(lastDayOfMonth),
      }));
      
    }, [url, token, studentFromCard, userEmail]);
    
    // Helper function to format dates for input elements
    const formatDateForInput = (dateString) => {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      return date.toISOString().split('T')[0];
    };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to generate PDF blob
  const generatePDFBlob = async () => {
    // Hide buttons during PDF generation
    const uploadBtn = document.getElementById('upload-btn');
    if (uploadBtn) uploadBtn.style.display = 'none';
  
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.style.display = 'none';
  
    try {
      const canvas = await html2canvas(formRef.current, {
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
    
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
    
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Return the PDF as a blob
      return pdf.output('blob');
    } finally {
      // Show the buttons again
      if (uploadBtn) uploadBtn.style.display = 'block';
      if (submitBtn) submitBtn.style.display = 'block';
    }
  };

  const sendToMentor = async () => {
    setLoading(true);
    try {
      // Generate PDF blob
      const blob = await generatePDFBlob();
  
      // Extract month and year for the filename
      const reportDate = new Date(formData.reportPeriodFrom);
      const month = reportDate.toLocaleString('default', { month: 'short' });
      const year = reportDate.getFullYear();
  
      // Create a meaningful filename with registration number and month/year
      const fileName = `${formData.regNo}-${month}-${year}.pdf`;
  
      // Upload to Firebase and get download URL
      const storageRef = ref(storage, `monthlyReports/${formData.regNo}/${fileName}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
  
      if (downloadURL) {
        // ========== SEND TO MENTOR ==========
        const monthlyData = {
          registeredEmail: userEmail,
          month: new Date(formData.reportPeriodFrom).toLocaleString('default', { month: 'long' }),
          name: formData.name,
          index: formData.regNo,
          reportUrl: downloadURL,
        };
  
  
        const response = await axios.post(
          `${url}/api/mentor/saveMonthlyReportData`,
          monthlyData
        );
  
        if (response.data.success) {
          alert("Report sent to mentor successfully!");
        } else {
          alert("Failed to send report to mentor: " + response.data.message);
        }
  
        // ========== SEND TO STUDENT ==========
        const sendToStudent = async () => {
          try {
            const studentEmail = studentFromCard?.email || studentData?.email;
            if (!studentEmail) {
              console.error("Student email not found");
              return;
            }
  
            const formatDateForDuration = (date) => {
              const d = new Date(date);
              return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
            };
  
            const duration = `${formatDateForDuration(formData.reportPeriodFrom)} - ${formatDateForDuration(formData.reportPeriodTo)}`;
  
            const existingReports = studentData?.monthly || [];
            const number = existingReports.length + 1;
  
            const studentReportData = {
              universityMail: studentEmail,
              month: new Date(formData.reportPeriodFrom).toLocaleString('default', { month: 'long' }),
              number: number,
              duration: duration,
              reportUrl: downloadURL,
            };
  
  
            const response = await axios.post(
              `${url}/api/student/saveMonthlyReportStudent`,
              studentReportData
            );
  
            if (response.data.success) {
              alert("Report saved for student successfully!");
            } else {
              const errorMessage =
                typeof response.data.message === "object"
                  ? JSON.stringify(response.data.message)
                  : response.data.message;
              alert("Failed to save report for student: " + errorMessage);
            }
            
  
          } catch (error) {
            console.error("Error sending data to student backend:", error);
            alert("Failed to save report for student: " + error.message);
          }
        };
  
        // Call it here
        await sendToStudent();
      }
  
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to send report to mentor: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  // Function for local PDF download
  const downloadPDF = async () => {
    setLoading(true);
    // Hide buttons during PDF generation
    const uploadBtn = document.getElementById('upload-btn');
    if (uploadBtn) uploadBtn.style.display = 'none';
  
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.style.display = 'none';
  
    try {
      const canvas = await html2canvas(formRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
    
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
    
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Save the PDF file locally
      pdf.save('assessment_report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating report. Please try again.');
    } finally {
      // Show the buttons again
      if (uploadBtn) uploadBtn.style.display = 'block';
      if (submitBtn) submitBtn.style.display = 'block';
      setLoading(false);
    }
  };

  // Main handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ask user if they want to download locally or send to mentor
    const choice = window.confirm('Do you want to send this report to your mentor? Click OK to send, or Cancel to download locally.');
    
    if (choice) {
      sendToMentor();
    } else {
      downloadPDF();
    }
  };

  return (
    <>
    <div className="max-w-4xl mx-auto p-4 bg-white ml-4 mr-4 mt-4 mb-4 max-h-[550px] overflow-y-auto">
      <div ref={formRef}>
        <div className="text-center mb-6">
          <h1 className="text-lg font-bold uppercase">Faculty of Information Technology</h1>
          <h2 className="text-lg font-bold uppercase">University of Moratuwa, Sri Lanka</h2>
          <h3 className="text-lg font-bold mt-2">FOUR - WEEKLY CONTINUOUS ASSESSMENT REPORT SHEET</h3>
          <p className="text-sm italic mt-1">(To be submitted Four-Weekly (every four weeks) to the Training Division and a total of 6 reports are expected by the end of training period)</p>
          <p className="text-sm mt-1">Refer also page 5 of Training Handbook</p>
        </div>

        <form className="border border-gray-800 ml-4 mr-4 mb-8">
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
                  className="w-full p-1 "
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
                  className="w-full p-1 "
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
                  className="w-full p-1  mb-2"
                  rows="1"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-1  mb-2"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-1 "
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
                      name="trainingPeriodFrom"
                      value={formData.trainingPeriodFrom}
                      onChange={handleChange}
                      className="w-full px-2 py-1 "
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
                      name="trainingPeriodTo"
                      value={formData.trainingPeriodTo}
                      onChange={handleChange}
                      className="w-full px-2 py-1 "
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
                  className="w-full p-1 border-b border-dotted  mb-2"
                />
                <textarea
                  name="trainingEstablishment"
                  placeholder='Address'
                  value={formData.trainingEstablishment}
                  onChange={handleChange}
                  className="w-full p-1 border-b border-dotted b mb-2"
                  rows="2"
                />
                <div className="mt-2">
                  <input
                    type="text"
                    name="officerPhone"
                    value={formData.officerPhone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full px-2 py-1 rounded"
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
                      type="date"
                      name="reportPeriodFrom"
                      value={formData.reportPeriodFrom}
                      onChange={handleChange}
                      className="w-full px-2 py-1 "
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
                      type="date"
                      name="reportPeriodTo"
                      value={formData.reportPeriodTo}
                      onChange={handleChange}
                      className="w-full px-2 py-1 "
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
                  <p className="pl-4">9.1 Work</p>
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
                  <p className="pl-4">9.2 Conduct</p>
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
                  <p className="pl-4">9.3 Attendance</p>
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
                      Authorised  :
                      <input
                        type="number"
                        name="leaveAuthorised"
                        value={formData.leaveAuthorised}
                        onChange={handleChange}
                        className="ml-2 p-1 rounded"
                        min="0"
                        max="999"
                      />
                    </label>
                  </div>
                  <div className="p-2 text-center">
                    <label className="flex items-center justify-center">
                      Unauthorised  :
                      <input
                        type="number"
                        name="leaveUnauthorised"
                        value={formData.leaveUnauthorised}
                        onChange={handleChange}
                        className="ml-2 p-1 rounded"
                        min="0"
                        max="999"
                      />
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
                    className="w-full p-1"
                    rows="3"
                  />
                </div>
              </div>
            </div>

            {/* Row 10 - Signature */}
            <div className="border-b border-gray-800 grid grid-cols-12">
              <div className="col-span-12 md:col-span-6 p-2 border-r border-gray-800">
                <p className="font-bold">10. Signature, Name and Official Seal of Engineer / Officer in charge of Undergraduate</p>
              </div>
              <div className="col-span-12 md:col-span-6 p-2">

                {/* Signature Image Display */}
                {signatureImage && (
                  <div className="mt-2 mb-2">
                    <img
                      src={signatureImage}
                      alt="Signature"
                      className="max-h-20 border border-gray-300 p-1"
                    />
                  </div>
                )}

                {/* File Upload Button - Hidden during PDF generation */}
                <div className="mt-2 mb-4" id="upload-btn">
                  <label className="bg-gray-200 text-gray-800 px-3 py-1 rounded cursor-pointer hover:bg-gray-300">
                    Upload Signature
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSignatureUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      
      <div className="mt-4 mr-4 flex justify-end">
        <button
          id="submit-btn"
          type="button"
          className="bg-teal-800 text-white px-4 py-2 rounded hover:bg-teal-600 disabled:bg-teal-300"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Create Report'}
        </button>
      </div>

    </div>
    </>
  );
};

export default MentorCreateMonthlyDoc;