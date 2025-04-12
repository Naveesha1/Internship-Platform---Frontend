import React, { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../../Context/StoreContext.js";
import { Upload, X, Save, UploadCloud } from "lucide-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase.js";

const EditProfileForm = ({ userDetails, onCancel, onSuccess }) => {
    const { url } = useContext(StoreContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Initialize form state with current user details
    const [formData, setFormData] = useState({
        fullName: userDetails.fullName || "",
        registrationNumber: userDetails.registrationNumber || "",
        degree: userDetails.degree || "",
        universityMail: userDetails.universityMail || "",
        contactNumber: userDetails.contactNumber || "",
        gpa: userDetails.gpa || "",
        address: userDetails.address || "",
        skills: Array.isArray(userDetails.skills) ? userDetails.skills.join(", ") : "",
        position: Array.isArray(userDetails.position) ? userDetails.position.join(", ") : "",
        qualification: Array.isArray(userDetails.qualification) ? userDetails.qualification.join(", ") : "",
        certifications: Array.isArray(userDetails.certifications) ? userDetails.certifications.join(", ") : "",
        userEmail: userDetails.registeredEmail || "",
        // Store previous image URLs
        prevProfileImage: userDetails.profileImageUrl || "",
        prevIdFrontImage: userDetails.idFrontImageUrl || "",
        prevIdBackImage: userDetails.idBackImageUrl || "",
        prevCv: userDetails.cvData && userDetails.cvData.length > 0 ? userDetails.cvData[0].cvUrl : "",
        cvName: userDetails.cvData && userDetails.cvData.length > 0 ? userDetails.cvData[0].fileName : "",
        cvPosition: userDetails.cvData && userDetails.cvData.length > 0 ? userDetails.cvData[0].title : "",
    });

    // State for file uploads
    const [files, setFiles] = useState({
        profileImage: null,
        idFrontImage: null,
        idBackImage: null,
        cv: null,
    });

    // File names for display
    const [fileNames, setFileNames] = useState({
        profileImage: "No file chosen",
        idFrontImage: "No file chosen",
        idBackImage: "No file chosen",
        cv: userDetails.cvData && userDetails.cvData.length > 0 ? userDetails.cvData[0].fileName : "No file chosen",
    });

    const handleChange = (e) => {
        const { name, value, type, files: fileList } = e.target;

        if (type === "file") {
            if (fileList[0]) {
                // Update the files state
                setFiles(prev => ({
                    ...prev,
                    [name]: fileList[0]
                }));

                // Update the file names for display
                setFileNames(prev => ({
                    ...prev,
                    [name]: fileList[0].name
                }));

                // If it's a CV, update the CV name
                if (name === "cv") {
                    setFormData(prev => ({
                        ...prev,
                        cvName: fileList[0].name
                    }));
                }
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // Create a copy of the form data for the update
            const updateData = { ...formData };

            // Upload changed files to Firebase
            const uploadTasks = [];

            for (const key in files) {
                if (files[key]) {
                    const fileUploadTask = async () => {
                        const fileRef = ref(storage, `${key}/${files[key].name}`);
                        await uploadBytes(fileRef, files[key]);
                        const url = await getDownloadURL(fileRef);
                        return { key, url };
                    };
                    uploadTasks.push(fileUploadTask());
                }
            }

            // Wait for all file uploads to complete
            const uploadResults = await Promise.all(uploadTasks);

            // Update form data with new file URLs
            uploadResults.forEach(({ key, url }) => {
                switch (key) {
                    case 'profileImage':
                        updateData.profileImage = url;
                        break;
                    case 'idFrontImage':
                        updateData.idFrontImage = url;
                        break;
                    case 'idBackImage':
                        updateData.idBackImage = url;
                        break;
                    case 'cv':
                        updateData.cv = url;
                        break;
                    default:
                        break;
                }
            });

            // Use previous image URLs if not updated
            if (!updateData.profileImage && updateData.prevProfileImage) {
                updateData.profileImage = updateData.prevProfileImage;
            }

            if (!updateData.idFrontImage && updateData.prevIdFrontImage) {
                updateData.idFrontImage = updateData.prevIdFrontImage;
            }

            if (!updateData.idBackImage && updateData.prevIdBackImage) {
                updateData.idBackImage = updateData.prevIdBackImage;
            }

            if (!updateData.cv && updateData.prevCv) {
                updateData.cv = updateData.prevCv;
            }

            // Remove prev fields
            delete updateData.prevProfileImage;
            delete updateData.prevIdFrontImage;
            delete updateData.prevIdBackImage;
            delete updateData.prevCv;

            // Send update request to the server
            const response = await axios.put(`${url}/api/student/updateStudentProfile`, updateData);

            if (response.data.success) {
                setSuccessMessage("Profile updated successfully!");
                setTimeout(() => {
                    onSuccess();
                }, 1500);
            } else {
                setError(response.data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setError(error.response?.data?.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
<div className="fixed bottom-4 left-4 flex items-center space-x-4 z-50">
  <h2 className="text-xl font-semibold text-teal-700">Edit Profile</h2>
  <button
    onClick={onCancel}
    className="text-gray-600 hover:text-gray-800"
  >
    <X size={24} />
  </button>
</div>


            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="col-span-2">
                        <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">
                            Personal Information
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Registration Number
                            </label>
                            <input
                                type="text"
                                name="registrationNumber"
                                value={formData.registrationNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Degree
                            </label>
                            <input
                                type="text"
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                University Email
                            </label>
                            <input
                                type="email"
                                name="universityMail"
                                value={formData.universityMail}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contact Number
                            </label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                GPA
                            </label>
                            <input
                                type="text"
                                name="gpa"
                                value={formData.gpa}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Professional Details */}
                    <div className="col-span-2 mt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">
                            Professional Details
                        </h3>
                    </div>

                    <div className="col-span-2 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Preferred Positions (comma separated)
                            </label>
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="e.g. Software Engineer, Web Developer, Data Analyst"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Technical Skills (comma separated)
                            </label>
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="e.g. JavaScript, React, Node.js, Python"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Soft Skills (comma separated)
                            </label>
                            <input
                                type="text"
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="e.g. Communication, Teamwork, Problem-solving"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Certifications (comma separated)
                            </label>
                            <input
                                type="text"
                                name="certifications"
                                value={formData.certifications}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="e.g. AWS Certified Developer, Google Cloud Professional"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                CV Position/Title
                            </label>
                            <input
                                type="text"
                                name="cvPosition"
                                value={formData.cvPosition}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="e.g. Software Engineer, Full Stack Developer"
                            />
                        </div>
                    </div>

                    {/* Document Uploads */}
                    <div className="col-span-2 mt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">
                            Documents
                        </h3>
                    </div>

                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Profile Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Profile Image
                            </label>
                            <div className="flex items-center space-x-4">
                                {formData.prevProfileImage && (
                                    <img
                                        src={formData.prevProfileImage}
                                        alt="Profile Preview"
                                        className="w-16 h-16 object-cover rounded-full"
                                    />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="profileImage"
                                    onChange={handleChange}
                                    className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                                />
                            </div>
                        </div>

                        {/* ID Card Front Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ID Card Front
                            </label>
                            <div className="flex items-center space-x-4">
                                {formData.prevIdFrontImage && (
                                    <img
                                        src={formData.prevIdFrontImage}
                                        alt="ID Front Preview"
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="idFrontImage"
                                    onChange={handleChange}
                                    className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                                />
                            </div>
                        </div>

                        {/* ID Card Back Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ID Card Back
                            </label>
                            <div className="flex items-center space-x-4">
                                {formData.prevIdBackImage && (
                                    <img
                                        src={formData.prevIdBackImage}
                                        alt="ID Back Preview"
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="idBackImage"
                                    onChange={handleChange}
                                    className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                                />
                            </div>
                        </div>

                        {/* CV Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                CV (PDF only)
                            </label>
                            <div className="flex items-center space-x-4">
                                {formData.prevCv && (
                                    <a
                                        href={formData.prevCv}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-teal-600 underline"
                                    >
                                        View Current CV
                                    </a>
                                )}
                                <input
                                    type="file"
                                    accept=".pdf"
                                    name="cv"
                                    onChange={handleChange}
                                    className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`inline-flex items-center px-6 py-2 rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 4a1 1 0 011-1h4a1 1 0 110 2H5v10h10v-3a1 1 0 112 0v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm10.707 0.293a1 1 0 00-1.414 0L9 7.586V5a1 1 0 10-2 0v5a1 1 0 001 1h5a1 1 0 100-2h-2.586l3.293-3.293a1 1 0 000-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </form>
        </div>

    );
};

export default EditProfileForm;



