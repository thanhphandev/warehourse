'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/app/stores/authStore';

const getSignUpSchema = (t: ReturnType<typeof useTranslations<'auth'>>) => z.object({
  name: z.string().min(1, { message: t('errors.nameRequired') }),
  email: z.string().min(1, { message: t('errors.emailRequired') }).email({ message: t('errors.emailInvalid') }),
  password: z.string().min(8, { message: t('errors.passwordMinLength') }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: t('errors.passwordMismatch'),
  path: ['confirmPassword'],
});

type SignUpForm = z.infer<ReturnType<typeof getSignUpSchema>>;

const SignUpPage = () => {
  const t = useTranslations('auth');
  const router = useRouter();
  const { signup } = useAuthStore();
  const signUpSchema = getSignUpSchema(t);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const code = result.code;
        let message;
        switch (code) {
          case 'USER_EXISTS':
            message = t('errors.userExists');
            break;
          case 'VALIDATION_ERROR':
            message = t('errors.missingFields');
            break;
          default:
            message = t('errors.signupFailed');
        }
        setError('root.general', { message });
        return;
      }

      // Redirect to login page with success message
      router.push('/auth/login?message=signup-success');
    } catch (error) {
      setError('root.general', { message: t('errors.networkError') });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('signup.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('signup.subtitle')}{' '}
            <Link 
              href="/auth/login" 
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {t('signup.loginLink')}
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {errors.root?.general && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.root.general.message}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t('fields.name')}
              </label>
              <input
                id="name"
                type="text"
                required
                {...register('name')}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder={t('placeholders.name')}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('fields.email')}
              </label>
              <input
                id="email"
                type="email"
                required
                {...register('email')}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
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
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder={t('placeholders.password')}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                {t('fields.confirmPassword')}
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                {...register('confirmPassword')}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder={t('placeholders.confirmPassword')}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('buttons.signing-up') : t('buttons.signup')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;