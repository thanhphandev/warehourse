'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/app/stores/authStore';

const getLoginSchema = (t: ReturnType<typeof useTranslations<'auth'>>) => z.object({
  email: z.string().min(1, { message: t('errors.emailRequired') }).email({ message: t('errors.emailInvalid') }),
  password: z.string().min(1, { message: t('errors.passwordRequired') }),
});

type LoginForm = z.infer<ReturnType<typeof getLoginSchema>>;

const LoginPage = () => {
  const t = useTranslations('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [successMessage, setSuccessMessage] = useState('');
  const { login } = useAuthStore();

  const loginSchema = getLoginSchema(t);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const message = searchParams.get('message');
    if (message === 'signup-success') {
      setSuccessMessage(t('messages.signupSuccess'));
    }
  }, [searchParams, t]);

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await login(data);

      if (!result.success) {
        let message;
        switch (result.code) {
          case 'INVALID_CREDENTIALS':
            message = t('errors.invalidCredentials');
            break;
          case 'VALIDATION_ERROR':
            message = t('errors.missingFields');
            break;
          case 'NETWORK_ERROR':
            message = t('errors.networkError');
            break;
          default:
            message = t('errors.loginFailed');
        }

        setError('root.general', {
          type: 'manual',
          message,
        });
        return;
      }

      // Redirect to callback URL or dashboard
      const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
      router.push(callbackUrl);
    } catch (error) {
      setError('root.general', {
        type: 'manual',
        message: t('errors.networkError'),
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('login.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('login.subtitle')}{' '}
            <Link
              href="/auth/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {t('login.signupLink')}
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {successMessage}
            </div>
          )}

          {errors.root?.general && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.root.general.message}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('fields.email')}
              </label>
              <input
                id="email"
                type="email"
                required
                {...register('email')}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder={t('placeholders.email')}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('fields.password')}
              </label>
              <input
                id="password"
                type="password"
                required
                {...register('password')}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder={t('placeholders.password')}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('buttons.signing-in') : t('buttons.login')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
