import React, { useState } from 'react';
import { useForm as useRHForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../core/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../core/rbac/AuthContext';
import { ShieldCheck } from 'lucide-react';

const twoFactorSchema = z.object({
  code: z.string().length(6, 'Code must be exactly 6 digits'),
});

type TwoFactorFormValues = z.infer<typeof twoFactorSchema>;

export const TwoFactorScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors } } = useRHForm<TwoFactorFormValues>({
    resolver: zodResolver(twoFactorSchema),
  });

  const verifyMutation = useMutation({
    mutationFn: authApi.verifyTwoFactor,
    onSuccess: (data) => {
      // Clear temp token and log user in with real session token
      sessionStorage.removeItem('auth_next_step');
      sessionStorage.removeItem('auth_userId');
      sessionStorage.removeItem('auth_phone');
      login(data.access_token);
      // Route handling is done by role router in App.tsx or inside useAuth
      navigate('/'); 
    },
    onError: (error: any) => {
      setErrorMsg(error.response?.data?.message || 'Verification failed. Invalid code.');
    },
  });

  const onSubmit = (data: TwoFactorFormValues) => {
    const nextStep = sessionStorage.getItem('auth_next_step') || 'verify-totp';
    const userId = sessionStorage.getItem('auth_userId') || '';
    const phone = sessionStorage.getItem('auth_phone') || '';
    verifyMutation.mutate({ nextStep, code: data.code, userId, phone });
  };

  const nextStep = sessionStorage.getItem('auth_next_step') || 'verify-totp';
  const phone = sessionStorage.getItem('auth_phone');

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-primary-50 p-4 rounded-full text-primary-600">
            <ShieldCheck className="h-10 w-10" />
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {nextStep === 'verify-otp' ? 'Phone Verification' : 'Two-Factor Authentication'}
          </h1>
          <p className="text-slate-500 text-sm">
            {nextStep === 'verify-otp' 
              ? `Enter the 6-digit OTP sent to ${phone || 'your phone'}.`
              : 'Enter the 6-digit code from your authenticator app.'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              maxLength={6}
              {...register('code')}
              className="block w-full text-center text-3xl tracking-[1em] py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all font-mono"
              placeholder="000000"
              autoComplete="one-time-code"
            />
            {errors.code && <p className="mt-2 text-sm text-center text-red-600">{errors.code.message}</p>}
          </div>

          <button
            type="submit"
            disabled={verifyMutation.isPending}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-70"
          >
            {verifyMutation.isPending ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <button type="button" className="text-primary-600 hover:text-primary-500 font-medium">
            Use backup code instead
          </button>
        </div>
      </div>
    </div>
  );
};
