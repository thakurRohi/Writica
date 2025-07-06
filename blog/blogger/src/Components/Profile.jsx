import { useDispatch, useSelector } from 'react-redux';
import { createUserProfile, fetchUserProfile, updateUserProfile } from './profileThunks';

function ProfileComponent({ userId, name, email }) {
    const dispatch = useDispatch();
    const { profile, status, error } = useSelector(state => state.profile);

    // Create profile after registration
    const handleCreateProfile = () => {
        dispatch(createUserProfile({ userId, name, email }));
    };

    // Fetch profile
    const handleFetchProfile = () => {
        dispatch(fetchUserProfile(userId));
    };

    // Update profile
    const handleUpdateProfile = (data) => {
        dispatch(updateUserProfile({ userId, data }));
    };

    // ...UI logic here
}
