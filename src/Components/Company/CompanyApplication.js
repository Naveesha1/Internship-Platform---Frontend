const CompanyApplication = () => {
  return (
    <>
      {/* <!-- Search Bar --> */}
      <div className="flex justify-start ml-4 mt-16">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Search Application"
            className="w-1/2 px-4 py-2 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* <!-- Body Table --> */}
      <div className="mt-8 mx-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">AGPA</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">CV</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">H.K.G.N.K.Ekanayake</td>
              <td className="px-4 py-2">SE</td>
              <td className="px-4 py-2">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Accept
                </span>
              </td>
              <td className="px-4 py-2">3.35</td>
              <td className="px-4 py-2">2024.01.02</td>
              <td className="px-4 py-2">
                <a href="#" className="text-blue-500 hover:underline">
                  Download
                </a>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">I.P.B.M.Iddamalgoda</td>
              <td className="px-4 py-2">SE</td>
              <td className="px-4 py-2">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                  Reject
                </span>
              </td>
              <td className="px-4 py-2">2.45</td>
              <td className="px-4 py-2">2024.01.23</td>
              <td className="px-4 py-2">
                <a href="#" className="text-blue-500 hover:underline">
                  Download
                </a>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">A.B.C.D.Heelibathdeniiya</td>
              <td className="px-4 py-2">ML</td>
              <td className="px-4 py-2">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  Pending
                </span>
              </td>
              <td className="px-4 py-2">3.35</td>
              <td className="px-4 py-2">2024.01.02</td>
              <td className="px-4 py-2">
                <a href="#" className="text-blue-500 hover:underline">
                  Download
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CompanyApplication;
