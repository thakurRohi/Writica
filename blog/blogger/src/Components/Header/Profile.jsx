// import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProfile } from '../../store/profileSlice';
// import { updateProfile } from '../../store/profileSlice';
// import LogoutBtn from './LogoutBtn';

// function Profile() {
//     const dispatch = useDispatch();
//     const { profile, loading, error } = useSelector(state => state.profile);
//     const [open, setOpen] = useState(false);
//     const [editing, setEditing] = useState(false);
//     const [form, setForm] = useState({});
//     const avatarRef = useRef(null);
//     const popoverRef = useRef(null);

//     useEffect(() => {
//       if (!open) return;
//       function handleClickOutside(event) {
//         if (
//           avatarRef.current &&
//           !avatarRef.current.contains(event.target) &&
//           popoverRef.current &&
//           !popoverRef.current.contains(event.target)
//         ) {
//           setOpen(false);
//         }
//       }
//       document.addEventListener('mousedown', handleClickOutside);
//       return () => {
//         document.removeEventListener('mousedown', handleClickOutside);
//       };
//     }, [open]);

//     if (loading) return <div>Loading profile...</div>;
//     if (error) return <div style={{ color: 'red' }}>{error}</div>;
//     if (!profile) return null;

//     const handleEdit = () => {
//       setForm({
//         firstName: profile.firstName || '',
//         lastName: profile.lastName || '',
//         bio: profile.bio || '',
//         location: profile.location || '',
//         phoneNumber: profile.phoneNumber || '',
//         countryCode: profile.countryCode || '',
//       });
//       setEditing(true);
//     };

//     const handleChange = e => {
//       setForm(f => ({ ...f, [e.target.name]: e.target.value }));
//     };

//     const handleSave = async e => {
//       e.preventDefault();
//       dispatch(updateProfile(form));
//       setEditing(false);
//     };

//     return (
//       <div style={{ position: 'relative', display: 'inline-block' }}>
//         {/* Circular Avatar */}
//         <img
//           ref={avatarRef}
//           src={profile.avatarUrl || profile.account?.avatar?.url}
   
//           onClick={() => setOpen(o => !o)}
//           style={{
//             width: 60,
//             height: 60,
//             borderRadius: '50%',
//             objectFit: 'cover',
//             cursor: 'pointer',
//             border: '2px solid #007bff',
//             boxShadow: open ? '0 0 0 4px #e3f0ff' : 'none',
//             transition: 'box-shadow 0.2s'
//           }}
//         />
//         {/* Popover/Card */}
//         {open && (
//           <div
//             ref={popoverRef}
//             style={{
//               position: 'absolute',
//               top: 70,
//               left: '50%',
//               transform: 'translateX(-50%)',
//               minWidth: 280,
//               background: '#fff',
//               border: '1px solid #eee',
//               borderRadius: 12,
//               boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
//               padding: 20,
//               zIndex: 100,
//             }}
//           >
// {!editing ? (
//             <div>
//                            <LogoutBtn />
            
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
//                 <img
//                   src={profile.avatarUrl || profile.account?.avatar?.url}
//                   alt="Avatar"
//                   style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: '50%',
//                     marginRight: 12,
//                     objectFit: 'cover',
//                   }}
//                 />
//                 <div>
//                   <strong>
//                     {profile.firstName} {profile.lastName}
//                   </strong>
//                   <div style={{ color: '#888', fontSize: 14 }}>
//                     @{profile.username || profile.account?.username}
//                   </div>
//                 </div>
//               </div>
//               <div style={{ marginBottom: 8 }}><strong>Email:</strong> {profile.email || profile.account?.email}</div>
//               <div style={{ marginBottom: 8 }}><strong>Bio:</strong> {profile.bio}</div>
//               <div style={{ marginBottom: 8 }}><strong>Location:</strong> {profile.location}</div>
//               <div style={{ marginBottom: 8 }}><strong>Phone:</strong> {profile.countryCode} {profile.phoneNumber}</div>
//               <div style={{ marginBottom: 8 }}>
//                 <strong>Followers:</strong> {profile.followersCount} | <strong>Following:</strong> {profile.followingCount}
//               </div>
//               <div style={{ color: '#888', fontSize: 13 }}>
//                 Joined: {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : ''}
//               </div>
//               <button
//                 onClick={handleEdit}
//                 style={{
//                   marginTop: 12,
//                   background: '#007bff',
//                   color: 'white',
//                   border: 'none',
//                   padding: '8px 16px',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   fontSize: '14px'
//                 }}
//               >
//                 Edit Profile
//               </button>
//             </div>
// ) : (
//   <form onSubmit={handleSave}>
//               <div>
//                 <label>First Name</label>
//                 <input name="firstName" value={form.firstName} onChange={handleChange} />
//               </div>
//               <div>
//                 <label>Last Name</label>
//                 <input name="lastName" value={form.lastName} onChange={handleChange} />
//               </div>
//               <div>
//                 <label>Bio</label>
//                 <input name="bio" value={form.bio} onChange={handleChange} />
//               </div>
//               <div>
//                 <label>Location</label>
//                 <input name="location" value={form.location} onChange={handleChange} />
//               </div>
//               <div>
//                 <label>Country Code</label>
//                 <input name="countryCode" value={form.countryCode} onChange={handleChange} />
//               </div>
//               <div>
//                 <label>Phone Number</label>
//                 <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
//               </div>
//               <button
//                 type="submit"
//                 style={{
//                   marginTop: 12,
//                   marginRight: 8,
//                   padding: '6px 14px',
//                   background: '#28a745',
//                   color: '#fff',
//                   border: 'none',
//                   borderRadius: 6,
//                   cursor: 'pointer'
//                 }}
//               >
//                 Save
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setEditing(false)}
//                 style={{
//                   marginTop: 12,
//                   padding: '6px 14px',
//                   background: '#dc3545',
//                   color: '#fff',
//                   border: 'none',
//                   borderRadius: 6,
//                   cursor: 'pointer'
//                 }}
//               >
//                 Cancel
//               </button>
//             </form>
// )}
//           </div>
//         )}
//       </div>
//     );
// }

// export default Profile;