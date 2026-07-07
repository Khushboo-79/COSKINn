import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, KeyRound, Loader2, ArrowLeft } from 'lucide-react';
import { api } from '../../lib/axios';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const otpSchema = z.object({
  otp: z.string().min(4, 'OTP is required').max(6, 'Invalid OTP length'),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

const Logo = () => (
  <div className="flex items-end justify-center relative px-4 mb-8">
    <img src="/logo.webp" alt="C" className="h-[4rem] w-[4rem] object-contain -mr-1" />
    <span style={{ fontFamily: '"Expletus Sans", sans-serif' }} className="text-[2.5rem] leading-none font-medium tracking-wide text-black mb-1 flex items-baseline">
      OSK
      <span className="relative inline-block px-[1px]">
        <img src="/coskinLogo.webp" alt="Heart" className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-[16px] h-[12px] object-contain" />
        <span className="text-transparent relative z-10" style={{ textShadow: "0 0 0 black" }}>I</span>
      </span>
      N<span className="text-3xl ml-0.5">n</span>
    </span>
  </div>
);

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [phone, setPhone] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors, isSubmitting: isSubmittingLogin },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: otpErrors, isSubmitting: isSubmittingOtp },
    reset: resetOtp
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      setError(null);
      // Step 1: Verify Email/Password, trigger OTP
      const response = await api.post('/auth/login', data);
      
      if (response.data.nextStep === 'verify-otp') {
        setPhone(response.data.phone);
        setStep('otp');
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.message || 'Bad Request');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const onOtpSubmit = async (data: OtpFormValues) => {
    try {
      setError(null);
      // Step 2: Verify OTP
      const response = await api.post('/auth/verify-otp', {
        phone: phone,
        otp: data.otp
      });
      
      const { access_token, user } = response.data;
      
      login(access_token, user);
      navigate('/admin'); // Redirect to dashboard
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError('Invalid or expired OTP');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50/30 relative overflow-hidden font-sans">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[40rem] h-[40rem] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/60 backdrop-blur-3xl rounded-3xl p-10 shadow-2xl border border-white/50">
          <Logo />
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 'login' ? 'Welcome Back' : 'Two-Factor Authentication'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {step === 'login' 
                ? 'Please sign in to your internal account' 
                : `We've sent a 6-digit OTP to your phone ending in ${phone.slice(-4)}`
              }
            </p>
          </div>

          {step === 'login' && (
            <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    {...registerLogin('email')}
                    className={`block w-full pl-10 pr-3 py-3 border ${loginErrors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-rose-500 focus:border-rose-500'} rounded-2xl bg-white/50 focus:bg-white transition-colors text-sm`}
                    placeholder="admin@coskinn.com"
                  />
                </div>
                {loginErrors.email && <p className="mt-1 text-sm text-red-600">{loginErrors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    {...registerLogin('password')}
                    className={`block w-full pl-10 pr-3 py-3 border ${loginErrors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-rose-500 focus:border-rose-500'} rounded-2xl bg-white/50 focus:bg-white transition-colors text-sm`}
                    placeholder="••••••••"
                  />
                </div>
                {loginErrors.password && <p className="mt-1 text-sm text-red-600">{loginErrors.password.message}</p>}
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmittingLogin}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-2xl shadow-lg shadow-rose-200 text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-orange-400 hover:from-rose-600 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmittingLogin ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Authenticating...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleSubmitOtp(onOtpSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    {...registerOtp('otp')}
                    className={`block w-full pl-10 pr-3 py-3 border ${otpErrors.otp ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-rose-500 focus:border-rose-500'} rounded-2xl bg-white/50 focus:bg-white transition-colors text-sm text-center tracking-widest font-semibold`}
                    placeholder="------"
                  />
                </div>
                {otpErrors.otp && <p className="mt-1 text-sm text-red-600 text-center">{otpErrors.otp.message}</p>}
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="flex flex-col space-y-3">
                <button
                  type="submit"
                  disabled={isSubmittingOtp}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-2xl shadow-lg shadow-rose-200 text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-orange-400 hover:from-rose-600 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmittingOtp ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Login'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('login');
                    resetOtp();
                    setError(null);
                  }}
                  className="w-full flex justify-center items-center py-3 px-4 border border-gray-200 rounded-2xl text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to email
                </button>
              </div>
            </form>
          )}
          
          <div className="mt-6 text-center text-xs text-gray-400">
            Secure connection for COSKINn employees only.
          </div>
        </div>
      </div>
    </div>
  );
};
