// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { resetPassword } from '../../../api/auth/page';

// const ResetPassword = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { email } = location.state; // 从上一个页面传递过来的邮箱
//   const [code, setCode] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match');
//       setMessage('');
//       return;
//     }

//     try {
//       await resetPassword(email, code, newPassword);
//       setMessage('Password reset successful! Redirecting to login...');
//       setError('');
//       setTimeout(() => {
//         navigate('/login');
//       }, 3000); // Redirect after 3 seconds
//     } catch (error) {
//       setError('Error resetting password');
//       setMessage('');
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleResetPassword}>
//         <input
//           type="text"
//           placeholder="Verification Code"
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {message && <p style={{ color: 'green' }}>{message}</p>}
//     </div>
//   );
// };

// export default ResetPassword;
