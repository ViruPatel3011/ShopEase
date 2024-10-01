import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { UserProfile } from '../../Components/UserProfile/UserProfile';

export default function UserProfilePage() {
    return (
        <div>
            <Navbar>
                <UserProfile></UserProfile>
            </Navbar>
        </div>
    );
}
