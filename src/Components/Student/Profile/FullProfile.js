import React, { useState } from "react";
import { ImageIcon, Edit2Icon, CheckIcon, XIcon } from "lucide-react";
import EditProfileForm from "./EditProfileForm"; 

const ProfileContent = ({ userDetails }) => {
  const [activeTab, setActiveTab] = useState("documents");
  const [isEditing, setIsEditing] = useState(false);

  const DocumentCard = ({ title, date, status, icon }) => (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm mb-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
        <div className="text-center md:text-left w-full">
          <h3 className="text-teal-600 font-medium mb-1 md:mb-2">{title}</h3>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>
        <div className="flex items-center gap-4 flex-col md:flex-row">
          {status && (
            <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-sm">
              {status}
            </span>
          )}
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-lg ${
              icon === "image" ? "bg-orange-100" : "bg-blue-50"
            }`}
          >
            {icon === "image" ? (
              <ImageIcon className="w-6 h-6 text-orange-500" />
            ) : (
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {isEditing ? (
        <EditProfileForm 
          userDetails={userDetails} 
          onCancel={() => setIsEditing(false)} 
          onSuccess={() => {
            setIsEditing(false);
            // You might want to refresh the user details here
          }}
        />
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Edit button */}
          <div className="mb-4">
        <button 
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
        >
              <Edit2Icon size={16} />
              Edit Profile
            </button>
        </div>


          {/* Profile Card */}
          <div className="w-full lg:w-72 bg-white rounded-lg shadow-sm p-4 mb-6 lg:mb-0">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-4">
                <img className="w-32 h-32 items-center rounded-full object-cover" src={userDetails.profileImageUrl} alt=""/>
              </div>
              <h2 className="text-xl font-semibold mb-4 text-center">{userDetails.fullName}</h2>
              
              <div className="w-full space-y-3">
                {[
                  { icon: "user", text: userDetails.registrationNumber },
                  { icon: "book", text: userDetails.degree },
                  { icon: "mail", text: userDetails.universityMail },
                  { icon: "phone", text: userDetails.contactNumber },
                  { icon: "star", text: userDetails.gpa },
                  { icon: "location", text: userDetails.address }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {item.icon === "user" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      )}
                      {item.icon === "book" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      )}
                      {item.icon === "mail" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      )}
                      {item.icon === "phone" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      )}
                      {item.icon === "star" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      )}
                      {item.icon === "location" && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z"/>
                      )}
                    </svg>
                    <span className="text-gray-700 text-sm truncate">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
                  
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <div className="flex flex-wrap gap-4 border-b justify-center md:justify-start">
                {["professional", "documents"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === tab
                        ? "text-teal-600 border-b-2 border-teal-600"
                        : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "professional" ? "Professional Details" : "Documents"}
                  </button>
                ))}
              </div>
            </div>
            
            {activeTab === "documents" ? (
              <div className="space-y-4">
                <DocumentCard
                  title="University ID"
                  date={userDetails.date}
                  status={userDetails.verify ? "Verified" : "Under verify"}
                  icon="document"
                />
                <DocumentCard
                  title="Profile Picture"
                  date={userDetails.date}
                  icon="image"
                />
                {userDetails.cvData?.length > 0 && (
                  <DocumentCard
                    title={`CV - ${userDetails.cvData[0].title || 'Resume'}`}
                    date={userDetails.date}
                    icon="document"
                  />
                )}
              </div>
            ) : (
              <div className="text-gray-600">
                <div className="space-y-8">
                  {[
                    {
                      title: "Prefer Positions",
                      items: userDetails.position
                    },
                    {
                      title: "Certifications",
                      items: userDetails.certifications
                    },
                    {
                      title: "Technical Skills",
                      items: userDetails.skills
                    },
                    {
                      title: "Soft Skills",
                      items: userDetails.qualification
                    }
                  ].map((section, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-8">
                      <div className="w-full md:w-32 text-teal-600 font-medium text-center md:text-left">
                        {section.title}
                      </div>
                      <div className="relative flex-1">
                        <div className="absolute hidden md:block left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        <div className="relative md:pl-8">
                          <div className="absolute hidden md:block left-0 w-4 h-4 bg-teal-100 rounded-full border-2 border-teal-600 -translate-x-2"></div>
                          <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                            {Array.isArray(section.items) && section.items.map((item, itemIndex) => (
                              <span
                                key={itemIndex}
                                className="px-3 py-1 mb-2 bg-white rounded border text-gray-600 text-sm"
                              >
                                {item}
                              </span>
                            ))}
                            {(!section.items || section.items.length === 0) && (
                              <span className="text-gray-400 italic">No items added yet</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;











// import React, { useState } from "react";
// import { ImageIcon } from "lucide-react";

// const ProfileContent = ({ userDetails }) => {
//   const [activeTab, setActiveTab] = useState("documents");
  
//   const DocumentCard = ({ title, date, status, icon }) => (
//     <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm mb-4">
//       <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
//         <div className="text-center md:text-left w-full">
//           <h3 className="text-teal-600 font-medium mb-1 md:mb-2">{title}</h3>
//           <p className="text-gray-500 text-sm">{date}</p>
//         </div>
//         <div className="flex items-center gap-4 flex-col md:flex-row">
//           {status && (
//             <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-sm">
//               {status}
//             </span>
//           )}
//           <div
//             className={`w-12 h-12 flex items-center justify-center rounded-lg ${
//               icon === "image" ? "bg-orange-100" : "bg-blue-50"
//             }`}
//           >
//             {icon === "image" ? (
//               <ImageIcon className="w-6 h-6 text-orange-500" />
//             ) : (
//               <svg
//                 className="w-6 h-6 text-blue-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Profile Card */}
//         <div className="w-full lg:w-72 bg-white rounded-lg shadow-sm p-4 mb-6 lg:mb-0">
//           <div className="flex flex-col items-center">
//             <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"><img className="w-32 h-32 items-center rounded-full" src={userDetails.profileImageUrl} alt=""/></div>
//             <h2 className="text-xl font-semibold mb-4 text-center">{userDetails.fullName}</h2>

//             <div className="w-full space-y-3">
//               {[
//                 { icon: "user", text: userDetails.registrationNumber },
//                 { icon: "book", text: userDetails.degree },
//                 { icon: "mail", text: userDetails.universityMail },
//                 { icon: "phone", text: userDetails.contactNumber },
//                 { icon: "star", text: userDetails.gpa },
//                 { icon: "location", text: userDetails.address }
//               ].map((item, index) => (
//                 <div key={index} className="flex items-center gap-3">
//                   <svg 
//                     className="w-5 h-5 text-gray-600" 
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     {item.icon === "user" && (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     )}
//                     {item.icon === "book" && (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                     )}
//                     {item.icon === "mail" && (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     )}
//                     {item.icon === "phone" && (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     )}
//                     {item.icon === "star" && (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                     )}
//                     {item.icon === "location" && (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z"/>
//                     )}

//                   </svg>
//                   <span className="text-gray-700 text-sm truncate">{item.text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
        
//         {/* Main Content */}
//         <div className="flex-1">
//           <div className="mb-8">
//             <div className="flex flex-wrap gap-4 border-b justify-center md:justify-start">
//               {["professional", "documents"].map((tab) => (
//                 <button
//                   key={tab}
//                   className={`px-4 py-2 font-medium text-sm ${
//                     activeTab === tab
//                       ? "text-teal-600 border-b-2 border-teal-600"
//                       : "text-gray-500"
//                   }`}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab === "professional" ? "Professional Details" : "Documents"}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {activeTab === "documents" ? (
//             <div className="space-y-4">
//               <DocumentCard
//                 title="University ID"
//                 date={userDetails.date}
//                 status={userDetails.verify ? "Verified" : "Under verify"}
//                 icon="document"
//               />
//               <DocumentCard
//                 title="Profile Picture"
//                 date={userDetails.date}
//                 icon="image"
//               />
//             </div>
//           ) : (
//             <div className="text-gray-600">
//               <div className="space-y-8">
//                 {[
//                   { 
//                     title: "Prefer Positions", 
//                     items: userDetails.position
//                   },
//                   { 
//                     title: "Certifications", 
//                     items: userDetails.certifications 
//                   },
//                   { 
//                     title: "Technical Skills", 
//                     items: userDetails.skills
//                   },
//                   { 
//                     title: "Soft Skills", 
//                     items: userDetails.qualification
//                   }
//                 ].map((section, index) => (
//                   <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-8">
//                     <div className="w-full md:w-32 text-teal-600 font-medium text-center md:text-left">
//                       {section.title}
//                     </div>
//                     <div className="relative flex-1">
//                       <div className="absolute hidden md:block left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
//                       <div className="relative md:pl-8">
//                         <div className="absolute hidden md:block left-0 w-4 h-4 bg-teal-100 rounded-full border-2 border-teal-600 -translate-x-2"></div>
//                         <div className="flex gap-2 flex-wrap justify-center md:justify-start">
//                           {section.items.map((item, itemIndex) => (
//                             <span 
//                               key={itemIndex} 
//                               className="px-3 py-1 mb-2 bg-white rounded border text-gray-600 text-sm"
//                             >
//                               {item}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileContent;