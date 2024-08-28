// import React from 'react';
// import { connect } from 'react-redux';
// import { User, ChevronDown, ChevronUp } from 'lucide-react';

// const UserProfile = ({ user }) => {
//   const [sortColumn, setSortColumn] = React.useState('givenName');
//   const [sortDirection, setSortDirection] = React.useState('asc');

//   const sortedUsers = React.useMemo(() => {
//     if (!user) return [];
//     return [...user].sort((a, b) => {
//       if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
//       if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
//       return 0;
//     });
//   }, [user, sortColumn, sortDirection]);

//   const handleSort = (column) => {
//     setSortColumn(column);
//     setSortDirection(sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc');
//   };

//   const SortIcon = ({ column }) => {
//     if (sortColumn !== column) return null;
//     return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">User Profiles</h1>
//       {sortedUsers.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th 
//                   className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort('givenName')}
//                 >
//                   <div className="flex items-center">
//                     Name
//                     <SortIcon column="givenName" />
//                   </div>
//                 </th>
//                 <th 
//                   className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort('email')}
//                 >
//                   <div className="flex items-center">
//                     Email
//                     <SortIcon column="email" />
//                   </div>
//                 </th>
//                 <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
//                   Profile Image
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               {sortedUsers.map((val, index) => (
//                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     <div className="text-sm leading-5 font-medium text-gray-900">{val?.givenName || 'N/A'}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     <div className="text-sm leading-5 text-gray-500">{val?.email || 'N/A'}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                     <div className="flex items-center">
//                       {val?.imageUrl ? (
//                         <img className="h-10 w-10 rounded-full" src={val.imageUrl} alt="" />
//                       ) : (
//                         <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
//                           <User size={20} className="text-gray-400" />
//                         </div>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="text-center py-8">
//           <User size={48} className="mx-auto text-gray-400 mb-4" />
//           <p className="text-xl text-gray-600">No user data available.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   user: state.auth.user,
// });

// export default connect(mapStateToProps)(UserProfile);
import React from 'react';
import { connect } from 'react-redux';
import { User, ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../redux/authReducer'; // Assuming you have this action

const UserProfile = ({ user }) => {
  const [sortColumn, setSortColumn] = React.useState('givenName');
  const [sortDirection, setSortDirection] = React.useState('asc');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sortedUsers = React.useMemo(() => {
    if (!user) return [];
    return [...user].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [user, sortColumn, sortDirection]);

  const handleSort = (column) => {
    setSortColumn(column);
    setSortDirection(sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const SortIcon = ({ column }) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const handleSignOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
      dispatch(removeUser()); // Clear user data from Redux store
      navigate('/'); // Redirect to home or login page
    });
  };

  React.useEffect(() => {
    // Load the Google API client library
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '749071613731-iejh90edkvtb9ugn87n8qfpagpv7e1n5.apps.googleusercontent.com', // Use your actual client ID
        });
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Profiles</h1>
        <button
          onClick={handleSignOut}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          <LogOut size={20} className="mr-2" />
          Sign Out
        </button>
      </div>
      {sortedUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th 
                  className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('givenName')}
                >
                  <div className="flex items-center">
                    Name
                    <SortIcon column="givenName" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center">
                    Email
                    <SortIcon column="email" />
                  </div>
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Profile Image
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sortedUsers.map((val, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 font-medium text-gray-900">{val?.givenName || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-500">{val?.email || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="flex items-center">
                      {val?.imageUrl ? (
                        <img className="h-10 w-10 rounded-full" src={val.imageUrl} alt="" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User size={20} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <User size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600">No user data available.</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserProfile);