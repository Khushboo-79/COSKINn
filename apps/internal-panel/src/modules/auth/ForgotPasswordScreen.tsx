import React, { useState } from 'react';
import { useForm as useRHForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useRHForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    // API call for forgot password goes here
    console.log('Reset password for', data.email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        <button 
          onClick={() => navigate('/login')}
          className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="text-center mb-8 mt-4">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Reset Password</h1>
          <p className="text-slate-500 text-sm">
            {isSubmitted 
              ? "We've sent recovery instructions to your email." 
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="you@coskinn.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="mt-6">
            <button
              onClick={() => navigate('/login')}
              className="w-full flex justify-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
