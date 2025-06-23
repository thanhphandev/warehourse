"use client";

import { useAuthStore } from '@/app/stores/authStore';
import React, { useEffect } from 'react'

const Dashboard = () => {
    const { user } = useAuthStore()
    return (
        <div>Dashboard {user ? user?.email.address: ""}</div>
    )
}

export default Dashboard