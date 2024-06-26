import React from 'react'
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from '../../constants';
import { Navigate } from 'react-router';

const StudentProtected = ({children}) => {
    const {user} = useSelector((state) => state.profile);

    if(user.accountType === ACCOUNT_TYPE.STUDENT)
        return children
    else
        return <Navigate to="/dashboard/my-profile" />
}
export default StudentProtected
