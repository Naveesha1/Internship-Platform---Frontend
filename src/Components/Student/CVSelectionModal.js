import React from 'react';

const CvSelectionModal = ({ isOpen, setIsOpen, onSubmit }) => {
  const [selectedCv, setSelectedCv] = React.useState("");

  const handleSubmit = () => {
    if (!selectedCv) {
      alert('Please select a CV');
      return;
    }
    onSubmit(selectedCv);
    setSelectedCv("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-200 rounded-lg p-8 w-[500px] relative">
        {/* Close button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Modal content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Software Developer Intern
          </h2>

          <div className="space-y-4">
            <h3 className="text-gray-700">Select CV</h3>
            <select 
              value={selectedCv}
              onChange={(e) => setSelectedCv(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-white"
            >
              <option value="">Choose a CV</option>
              <option value="cv1">CV 1</option>
              <option value="cv2">CV 2</option>
              <option value="cv3">CV 3</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-teal-500 text-white px-12 py-2 rounded-full hover:bg-teal-600"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvSelectionModal;