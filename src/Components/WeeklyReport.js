import React, { useContext, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js";
import { jwtDecode } from "jwt-decode";
import { StoreContext } from "../Context/StoreContext.js";
import axios from "axios";
import { toast } from "react-toastify";

const WeeklyReport = ({ onClose }) => {
  const { url } = useContext(StoreContext);
  const [signatureImage, setSignatureImage] = useState(null);
  const [registrationId, setRegistrationId] = useState();
  const [userData, setUserData] = useState({
    month: "",
    weekNo: "",
    weekEnding: "",
    trainingMode: "",
    workDetails: "",
    activities: {
      monday: { date: "", description: "" },
      tuesday: { date: "", description: "" },
      wednesday: { date: "", description: "" },
      thursday: { date: "", description: "" },
      friday: { date: "", description: "" },
      saturday: { date: "", description: "" },
      sunday: { date: "", description: "" },
    },
  });
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const userEmail = decodedToken.email;

  useEffect(() => {
    const getStudentRegistrationNumber = async () => {
      try {
        const response = await axios.post(
          `${url}/api/student/getRegistrationId`,
          { userEmail }
        );
        if (response.data.success) {
          setRegistrationId(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStudentRegistrationNumber();
  }, [token]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleActivityChange = (day, field, value) => {
    setUserData({
      ...userData,
      activities: {
        ...userData.activities,
        [day]: {
          ...userData.activities[day],
          [field]: value,
        },
      },
    });
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSignatureImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSignature = () => {
    setSignatureImage(null);
    // Reset the file input by accessing it via its id
    const fileInput = document.getElementById("signature-upload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const generatePDFBlob = () => {
    const doc = new jsPDF();

    // First page with "Week No" displayed at the top
    const boxHeight = 10;
    const boxWidth = 40;
    const boxX = (doc.internal.pageSize.width - boxWidth) / 2;
    const boxY = 10;

    doc.rect(boxX, boxY, boxWidth, boxHeight);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    const weekNoText = "WEEK NO:";
    doc.setFont("helvetica", "normal");
    const weekNoTextWidth = doc.getTextWidth(weekNoText);
    const weekNoTextX = boxX + (boxWidth - weekNoTextWidth - 10) / 2;
    doc.text(weekNoText, weekNoTextX, boxY + 7);
    const weekText = userData.weekNo;
    const weekTextWidth = doc.getTextWidth(weekText);
    const weekTextX = weekNoTextX + weekNoTextWidth + 5;
    doc.text(weekText, weekTextX, boxY + 7);

    // Table for Weekly Activities (First page)
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    const tableWidth = pageWidth - 2 * margin;
    const tableX = margin;
    const tableY = 30;

    // Header row with "FOR THE WEEK ENDING" and "TRAINING MODE"
    doc.setFontSize(10);
    doc.setLineWidth(0.4);

    // Draw the table outline
    const headerHeight = 10;
    const firstColWidth = tableWidth * 0.6;
    const secondColWidth = tableWidth - firstColWidth;

    // Draw header row
    doc.rect(tableX, tableY, firstColWidth, headerHeight);
    doc.rect(tableX + firstColWidth, tableY, secondColWidth, headerHeight);

    // Add header text
    doc.setFontSize(9);
    // Left column: two lines
    doc.setFont("helvetica", "bold");
    doc.text("FOR THE WEEK ENDING", tableX + 2, tableY + 4.5);
    doc.text(`SUNDAY: ${userData.weekEnding}`, tableX + 2, tableY + 9);
    doc.setFont("helvetica", "normal");

    // Right column: centered vertically in the header row (10px tall)
    const trainingY = tableY + 6.5; // vertically centered
    doc.setFont("helvetica", "bold");
    doc.text("TRAINING MODE :", tableX + firstColWidth + 5, trainingY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(userData.trainingMode, tableX + firstColWidth + 35, trainingY);
    doc.setFontSize(9);

    // Subheader row
    const subHeaderY = tableY + headerHeight;
    const subHeaderHeight = 10;
    doc.setLineWidth(0.4);

    // Column headers for day and date
    const colHeaderY = subHeaderY + subHeaderHeight;
    const colHeaderHeight = 10;
    const dayColWidth = 15;
    const dateColWidth = 25;
    const descColWidth = tableWidth - dayColWidth - dateColWidth;

    // Draw column headers
    doc.rect(tableX, colHeaderY, dayColWidth, colHeaderHeight);
    doc.rect(tableX + dayColWidth, colHeaderY, dateColWidth, colHeaderHeight);
    doc.rect(
      tableX + dayColWidth + dateColWidth,
      colHeaderY,
      descColWidth,
      colHeaderHeight
    );

    doc.setFont("helvetica", "bold");
    doc.text("DAY", tableX + dayColWidth / 2, colHeaderY + 6, {
      align: "center",
    });
    doc.text("DATE", tableX + dayColWidth + dateColWidth / 2, colHeaderY + 6, {
      align: "center",
    });
    doc.text(
      "BRIEF DESCRIPTION OF THE WEEK CARRIED OUT",
      tableX + dayColWidth + dateColWidth + descColWidth / 2,
      colHeaderY + 6,
      { align: "center" }
    );
    doc.setFont("helvetica", "normal");
    // Day rows (with actual inserted data)
    const days = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ];
    const dayRowHeight = 33;
    let currentY = colHeaderY + colHeaderHeight;

    days.forEach((day, index) => {
      // Draw row cells (with inserted data)
      doc.rect(tableX, currentY, dayColWidth, dayRowHeight);
      doc.rect(tableX + dayColWidth, currentY, dateColWidth, dayRowHeight);
      doc.rect(
        tableX + dayColWidth + dateColWidth,
        currentY,
        descColWidth,
        dayRowHeight
      );

      // Add vertical day text (one letter per line)
      const dayLowercase = day.toLowerCase();
      const letters = day.split("");
      let letterY = currentY + 3;

      letters.forEach((letter) => {
        doc.text(letter, tableX + dayColWidth / 2, letterY, {
          align: "center",
        });
        letterY += 3.5; // Space between letters
      });

      // Add date and description (Inserted data)
      doc.setFontSize(10);
      if (userData.activities[dayLowercase]) {
        doc.text(
          userData.activities[dayLowercase].date,
          tableX + dayColWidth + dateColWidth / 2,
          currentY + dayRowHeight / 2,
          { align: "center" }
        );

        // Add description with word wrapping
        const description = userData.activities[dayLowercase].description;
        if (description) {
          doc.text(
            doc.splitTextToSize(description, descColWidth - 6),
            tableX + dayColWidth + dateColWidth + 3,
            currentY + 5
          );
        }
      }
      doc.setFontSize(9);

      currentY += dayRowHeight;
    });

    // Add second page with work details and signature
    doc.addPage();

    // Set up margins and positions for the second page
    const secPageMargin = 15;
    const secPageTableWidth = pageWidth - 2 * secPageMargin;
    const secPageTableX = secPageMargin;
    let secPageTableY = 20;

    // Header for Work Details
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.rect(secPageTableX, secPageTableY, secPageTableWidth, 15);
    doc.text(
      "DETAILS AND NOTES OF WORK CARRIED OUT, PROBLEMS ENCOUNTERED AND HOW SOLVED ETC., DIMENSIONS",
      secPageTableX + secPageTableWidth / 2,
      secPageTableY + 5,
      { align: "center" }
    );
    doc.text(
      "AND SKETCHES TO BE GIVEN WHEREVER POSSIBLE.",
      secPageTableX + secPageTableWidth / 2,
      secPageTableY + 10,
      { align: "center" }
    );

    // Work Details Text Area
    const workDetailsHeight = 200;
    doc.setFont("helvetica", "normal");
    doc.rect(
      secPageTableX,
      secPageTableY + 15,
      secPageTableWidth,
      workDetailsHeight
    );

    // Add work details with word wrapping
    if (userData.workDetails) {
      doc.setFontSize(10);
      doc.text(
        doc.splitTextToSize(userData.workDetails, secPageTableWidth - 10),
        secPageTableX + 5,
        secPageTableY + 25
      );
    }
    doc.setFontSize(9);

    // Signature Section
    let signatureY = secPageTableY + 20 + workDetailsHeight;
    doc.rect(secPageTableX, signatureY, secPageTableWidth, 20);

    // Add signature if available
    if (signatureImage) {
      const signatureWidth = 40;
      const signatureHeight = 15;
      const signatureX = secPageTableX + secPageTableWidth - signatureWidth - 5;
      const signatureY2 = signatureY + 3;

      doc.addImage(
        signatureImage,
        "PNG",
        signatureX,
        signatureY2,
        signatureWidth,
        signatureHeight
      );

      // "SIGNATURE OF TRAINEE" text
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("SIGNATURE OF TRAINEE :", signatureX - 2, signatureY + 17, {
        align: "right",
      });
      doc.setFont("helvetica", "normal");
    }

    // Remarks section
    doc.rect(secPageTableX, signatureY + 20, secPageTableWidth, 20);
    doc.setFont("helvetica", "bold");
    doc.text(
      "REMARKS AND CERTIFICATION BY THE ENGINEER/T.O.",
      secPageTableX + secPageTableWidth / 2,
      signatureY + 30,
      { align: "center" }
    );
    doc.setFont("helvetica", "normal");

    // Add third page with the provided table UI
    doc.addPage();

    // Create the full table container
    const thirdPageMargin = 15;
    const thirdPageTableWidth = pageWidth - 2 * thirdPageMargin;
    const thirdPageTableHeight = 180; // Increased height to include footer section
    const thirdPageTableX = thirdPageMargin;
    const thirdPageTableY = 20;

    // Draw the main outer box
    doc.setLineWidth(0.4);
    doc.rect(
      thirdPageTableX,
      thirdPageTableY,
      thirdPageTableWidth,
      thirdPageTableHeight
    );

    // Define the height for the bottom row that will hold DATE and SIGNATURE
    const bottomRowHeight = 30;
    const bottomRowY = thirdPageTableY + thirdPageTableHeight - bottomRowHeight;
    const halfWidth = thirdPageTableWidth / 2;

    // Draw vertical line to split the bottom row into DATE and SIGNATURE
    doc.line(
      thirdPageTableX + halfWidth,
      bottomRowY,
      thirdPageTableX + halfWidth,
      bottomRowY + bottomRowHeight
    );

    // Draw horizontal line above bottom section (if needed for separation)
    doc.setLineWidth(0.4);
    doc.line(
      thirdPageTableX,
      bottomRowY,
      thirdPageTableX + thirdPageTableWidth,
      bottomRowY
    );

    // Add DATE text and line
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("DATE:", thirdPageTableX + 5, bottomRowY + 15);
    doc.line(
      thirdPageTableX + 18,
      bottomRowY + 16,
      thirdPageTableX + halfWidth - 10,
      bottomRowY + 16
    );
    doc.setFont("helvetica", "normal");

    // Add "DESIGNATION AND SIGNATURE" centered in right half
    doc.setFont("helvetica", "bold");
    doc.text(
      "DESIGNATION AND SIGNATURE",
      thirdPageTableX + halfWidth + halfWidth / 2,
      bottomRowY + 25,
      { align: "center" }
    );
    doc.setFont("helvetica", "normal");
    // Add placeholder line representing signature
    doc.setLineWidth(0.4);
    doc.line(
      thirdPageTableX + halfWidth + halfWidth / 2 - 20,
      bottomRowY + 18,
      thirdPageTableX + halfWidth + halfWidth / 2 + 20,
      bottomRowY + 18
    );

    // Save the PDF
    return doc.output("blob");
  };

  const sendToMentor = async () => {
    try {
      const blob = await generatePDFBlob();
      const fileRef = ref(
        storage,
        `weekly-reports/${registrationId}-${userData.weekNo}.pdf`
      );

      await uploadBytes(fileRef, blob);
      const downloadURL = await getDownloadURL(fileRef);
      if (downloadURL) {
        const weeklyData = {
          registeredEmail: userEmail,
          month: userData.month,
          weekNo: userData.weekNo,
          reportUrl: downloadURL,
        };
        onClose();
        const response = await axios.post(
          `${url}/api/student/saveWeeklyReport`,
          weeklyData
        );
        if (response.data.success) {
          toast.success("Report sent to mentor successfully!");
        } else {
          toast.error("Failed to send report to mentor!");
        }
      }
      // optionally: copy to clipboard or auto-email, etc.
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to send report to mentor.");
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    // First page with "Week No" displayed at the top
    const boxHeight = 10;
    const boxWidth = 40;
    const boxX = (doc.internal.pageSize.width - boxWidth) / 2;
    const boxY = 10;

    doc.rect(boxX, boxY, boxWidth, boxHeight);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    const weekNoText = "WEEK NO:";
    doc.setFont("helvetica", "normal");
    const weekNoTextWidth = doc.getTextWidth(weekNoText);
    const weekNoTextX = boxX + (boxWidth - weekNoTextWidth - 10) / 2;
    doc.text(weekNoText, weekNoTextX, boxY + 7);
    const weekText = userData.weekNo;
    const weekTextWidth = doc.getTextWidth(weekText);
    const weekTextX = weekNoTextX + weekNoTextWidth + 5;
    doc.text(weekText, weekTextX, boxY + 7);

    // Table for Weekly Activities (First page)
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    const tableWidth = pageWidth - 2 * margin;
    const tableX = margin;
    const tableY = 30;

    // Header row with "FOR THE WEEK ENDING" and "TRAINING MODE"
    doc.setFontSize(10);
    doc.setLineWidth(0.4);

    // Draw the table outline
    const headerHeight = 10;
    const firstColWidth = tableWidth * 0.6;
    const secondColWidth = tableWidth - firstColWidth;

    // Draw header row
    doc.rect(tableX, tableY, firstColWidth, headerHeight);
    doc.rect(tableX + firstColWidth, tableY, secondColWidth, headerHeight);

    // Add header text
    doc.setFontSize(9);
    // Left column: two lines
    doc.setFont("helvetica", "bold");
    doc.text("FOR THE WEEK ENDING", tableX + 2, tableY + 4.5);
    doc.text(`SUNDAY: ${userData.weekEnding}`, tableX + 2, tableY + 9);
    doc.setFont("helvetica", "normal");

    // Right column: centered vertically in the header row (10px tall)
    const trainingY = tableY + 6.5; // vertically centered
    doc.setFont("helvetica", "bold");
    doc.text("TRAINING MODE :", tableX + firstColWidth + 5, trainingY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(userData.trainingMode, tableX + firstColWidth + 35, trainingY);
    doc.setFontSize(9);

    // Subheader row
    const subHeaderY = tableY + headerHeight;
    const subHeaderHeight = 10;
    doc.setLineWidth(0.4);

    // Column headers for day and date
    const colHeaderY = subHeaderY + subHeaderHeight;
    const colHeaderHeight = 10;
    const dayColWidth = 15;
    const dateColWidth = 25;
    const descColWidth = tableWidth - dayColWidth - dateColWidth;

    // Draw column headers
    doc.rect(tableX, colHeaderY, dayColWidth, colHeaderHeight);
    doc.rect(tableX + dayColWidth, colHeaderY, dateColWidth, colHeaderHeight);
    doc.rect(
      tableX + dayColWidth + dateColWidth,
      colHeaderY,
      descColWidth,
      colHeaderHeight
    );

    doc.setFont("helvetica", "bold");
    doc.text("DAY", tableX + dayColWidth / 2, colHeaderY + 6, {
      align: "center",
    });
    doc.text("DATE", tableX + dayColWidth + dateColWidth / 2, colHeaderY + 6, {
      align: "center",
    });
    doc.text(
      "BRIEF DESCRIPTION OF THE WEEK CARRIED OUT",
      tableX + dayColWidth + dateColWidth + descColWidth / 2,
      colHeaderY + 6,
      { align: "center" }
    );
    doc.setFont("helvetica", "normal");
    // Day rows (with actual inserted data)
    const days = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ];
    const dayRowHeight = 33;
    let currentY = colHeaderY + colHeaderHeight;

    days.forEach((day, index) => {
      // Draw row cells (with inserted data)
      doc.rect(tableX, currentY, dayColWidth, dayRowHeight);
      doc.rect(tableX + dayColWidth, currentY, dateColWidth, dayRowHeight);
      doc.rect(
        tableX + dayColWidth + dateColWidth,
        currentY,
        descColWidth,
        dayRowHeight
      );

      // Add vertical day text (one letter per line)
      const dayLowercase = day.toLowerCase();
      const letters = day.split("");
      let letterY = currentY + 3;

      letters.forEach((letter) => {
        doc.text(letter, tableX + dayColWidth / 2, letterY, {
          align: "center",
        });
        letterY += 3.5; // Space between letters
      });

      // Add date and description (Inserted data)
      doc.setFontSize(10);
      if (userData.activities[dayLowercase]) {
        doc.text(
          userData.activities[dayLowercase].date,
          tableX + dayColWidth + dateColWidth / 2,
          currentY + dayRowHeight / 2,
          { align: "center" }
        );

        // Add description with word wrapping
        const description = userData.activities[dayLowercase].description;
        if (description) {
          doc.text(
            doc.splitTextToSize(description, descColWidth - 6),
            tableX + dayColWidth + dateColWidth + 3,
            currentY + 5
          );
        }
      }
      doc.setFontSize(9);

      currentY += dayRowHeight;
    });

    // Add second page with work details and signature
    doc.addPage();

    // Set up margins and positions for the second page
    const secPageMargin = 15;
    const secPageTableWidth = pageWidth - 2 * secPageMargin;
    const secPageTableX = secPageMargin;
    let secPageTableY = 20;

    // Header for Work Details
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.rect(secPageTableX, secPageTableY, secPageTableWidth, 15);
    doc.text(
      "DETAILS AND NOTES OF WORK CARRIED OUT, PROBLEMS ENCOUNTERED AND HOW SOLVED ETC., DIMENSIONS",
      secPageTableX + secPageTableWidth / 2,
      secPageTableY + 5,
      { align: "center" }
    );
    doc.text(
      "AND SKETCHES TO BE GIVEN WHEREVER POSSIBLE.",
      secPageTableX + secPageTableWidth / 2,
      secPageTableY + 10,
      { align: "center" }
    );

    // Work Details Text Area
    const workDetailsHeight = 200;
    doc.setFont("helvetica", "normal");
    doc.rect(
      secPageTableX,
      secPageTableY + 15,
      secPageTableWidth,
      workDetailsHeight
    );

    // Add work details with word wrapping
    if (userData.workDetails) {
      doc.setFontSize(10);
      doc.text(
        doc.splitTextToSize(userData.workDetails, secPageTableWidth - 10),
        secPageTableX + 5,
        secPageTableY + 25
      );
    }
    doc.setFontSize(9);

    // Signature Section
    let signatureY = secPageTableY + 20 + workDetailsHeight;
    doc.rect(secPageTableX, signatureY, secPageTableWidth, 20);

    // Add signature if available
    if (signatureImage) {
      const signatureWidth = 40;
      const signatureHeight = 15;
      const signatureX = secPageTableX + secPageTableWidth - signatureWidth - 5;
      const signatureY2 = signatureY + 3;

      doc.addImage(
        signatureImage,
        "PNG",
        signatureX,
        signatureY2,
        signatureWidth,
        signatureHeight
      );

      // "SIGNATURE OF TRAINEE" text
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("SIGNATURE OF TRAINEE :", signatureX - 2, signatureY + 17, {
        align: "right",
      });
      doc.setFont("helvetica", "normal");
    }

    // Remarks section
    doc.rect(secPageTableX, signatureY + 20, secPageTableWidth, 20);
    doc.setFont("helvetica", "bold");
    doc.text(
      "REMARKS AND CERTIFICATION BY THE ENGINEER/T.O.",
      secPageTableX + secPageTableWidth / 2,
      signatureY + 30,
      { align: "center" }
    );
    doc.setFont("helvetica", "normal");

    // Add third page with the provided table UI
    doc.addPage();

    // Create the full table container
    const thirdPageMargin = 15;
    const thirdPageTableWidth = pageWidth - 2 * thirdPageMargin;
    const thirdPageTableHeight = 180; // Increased height to include footer section
    const thirdPageTableX = thirdPageMargin;
    const thirdPageTableY = 20;

    // Draw the main outer box
    doc.setLineWidth(0.4);
    doc.rect(
      thirdPageTableX,
      thirdPageTableY,
      thirdPageTableWidth,
      thirdPageTableHeight
    );

    // Define the height for the bottom row that will hold DATE and SIGNATURE
    const bottomRowHeight = 30;
    const bottomRowY = thirdPageTableY + thirdPageTableHeight - bottomRowHeight;
    const halfWidth = thirdPageTableWidth / 2;

    // Draw vertical line to split the bottom row into DATE and SIGNATURE
    doc.line(
      thirdPageTableX + halfWidth,
      bottomRowY,
      thirdPageTableX + halfWidth,
      bottomRowY + bottomRowHeight
    );

    // Draw horizontal line above bottom section (if needed for separation)
    doc.setLineWidth(0.4);
    doc.line(
      thirdPageTableX,
      bottomRowY,
      thirdPageTableX + thirdPageTableWidth,
      bottomRowY
    );

    // Add DATE text and line
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("DATE:", thirdPageTableX + 5, bottomRowY + 15);
    doc.line(
      thirdPageTableX + 18,
      bottomRowY + 16,
      thirdPageTableX + halfWidth - 10,
      bottomRowY + 16
    );
    doc.setFont("helvetica", "normal");

    // Add "DESIGNATION AND SIGNATURE" centered in right half
    doc.setFont("helvetica", "bold");
    doc.text(
      "DESIGNATION AND SIGNATURE",
      thirdPageTableX + halfWidth + halfWidth / 2,
      bottomRowY + 25,
      { align: "center" }
    );
    doc.setFont("helvetica", "normal");
    // Add placeholder line representing signature
    doc.setLineWidth(0.4);
    doc.line(
      thirdPageTableX + halfWidth + halfWidth / 2 - 20,
      bottomRowY + 18,
      thirdPageTableX + halfWidth + halfWidth / 2 + 20,
      bottomRowY + 18
    );

    // Save the PDF
    doc.save("weekly_report.pdf");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Weekly Report Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">
            Weekly Report Information
          </h2>
          <label>Month</label>
          <input
            type="text"
            name="month"
            placeholder="Enter Month"
            value={userData.month}
            onChange={handleChange}
            className="p-2 border rounded w-full mb-3"
          />
          <label>Week Number</label>
          <input
            type="text"
            name="weekNo"
            placeholder="Enter Week No"
            value={userData.weekNo}
            onChange={handleChange}
            className="p-2 border rounded w-full mb-3"
          />
          <label>Week Ending Sunday</label>
          <input
            type="date"
            name="weekEnding"
            placeholder="Week Ending Sunday (eg 07/04/2025)"
            value={userData.weekEnding}
            onChange={handleChange}
            className="p-2 border rounded w-full mb-3"
          />
          <label>Training Mode</label>
          <input
            type="text"
            name="trainingMode"
            placeholder="Training Mode"
            value={userData.trainingMode}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
      </div>

      <div className="border p-4 rounded-lg w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-3">Daily Activities</h2>

        {[
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ].map((day) => (
          <div key={day} className="mb-4 p-3 border rounded">
            <h3 className="font-medium capitalize mb-2">{day}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="date"
                  value={userData.activities[day].date}
                  onChange={(e) =>
                    handleActivityChange(day, "date", e.target.value)
                  }
                  className="p-2 border rounded w-full pr-10"
                />
              </div>

              <textarea
                placeholder="Description of activities"
                value={userData.activities[day].description}
                onChange={(e) =>
                  handleActivityChange(day, "description", e.target.value)
                }
                className="p-2 border rounded w-full"
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border p-4 rounded-lg w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-3">Work Details</h2>
        <textarea
          name="workDetails"
          placeholder="Enter detailed notes of work carried out, problems encountered and how they were solved, etc."
          value={userData.workDetails}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          rows={8}
        />
      </div>

      <div className="border p-4 rounded-lg w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-3">Signature</h2>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Signature Image
          </label>
          <input
            id="signature-upload"
            type="file"
            accept="image/*"
            onChange={handleSignatureUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {signatureImage && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-1">Preview:</p>
            <div className="border p-2 bg-gray-50 mb-2">
              <img
                src={signatureImage}
                alt="Signature"
                className="h-20 object-contain"
              />
            </div>
            <button
              onClick={clearSignature}
              className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400"
            >
              Clear Signature
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-medium"
        >
          Download PDF
        </button>

        <button
          onClick={sendToMentor}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 font-medium"
        >
          Send to Mentor
        </button>
      </div>
    </div>
  );
};

export default WeeklyReport;
