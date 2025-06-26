"use client"

import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { ChevronDown, User } from 'lucide-react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { useAuthStore } from '@/app/stores/authStore'
import { useTranslations } from 'next-intl'

const UserAvatar = () => {
    const { user, loading, isAuthenticated, logout } = useAuthStore();
    const ta = useTranslations("auth");
    const t = useTranslations("HomePage");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-white hover:bg-white/10 border border-white/20"
                >
                    <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-white/20 text-white text-xs">
                            {isAuthenticated && user ? user.full_name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                        <div className="text-sm font-medium">
                            {isAuthenticated && user ? user.full_name : t('accountLabel')}
                        </div>
                        {isAuthenticated && user && (
                            <div className="text-xs text-white/80 truncate max-w-32">
                                {user.email.address}
                            </div>
                        )}
                    </div>
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated && user ? (
                    <>
                        <div className="px-2 py-1.5">
                            <p className="text-sm font-medium">{user.full_name}</p>
                            <p className="text-xs text-muted-foreground">{user.email.address}</p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/orders">Orders</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={logout}
                            disabled={loading}
                            className="text-red-600 focus:text-red-600"
                        >
                            {loading ? ta('logout.loggingOut') : ta("logout.title")}
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href="/auth/login">{ta("buttons.login")}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/auth/signup">{ta("buttons.signup")}</Link>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAvatar