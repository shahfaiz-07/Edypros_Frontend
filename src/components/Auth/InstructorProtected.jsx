import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { ACCOUNT_TYPE } from '../../constants';

const InstructorProtected = ({children}) => {
    const {user} = useSelector((state) => state.profile);

    if(user.accountType === ACCOUNT_TYPE.INSTRUCTOR)
        return children
    else
        return <Navigate to="/dashboard/my-profile" />
}

export default InstructorProtected
