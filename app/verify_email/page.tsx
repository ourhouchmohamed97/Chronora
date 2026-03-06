"use client";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900/30">
      <div className="max-w-md w-full px-10 py-16 bg-gray-800/30 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/60 text-center">
        <div className="mx-auto mb-8 inline-flex items-center justify-center w-20 h-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#ffffff"><g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M22 12.5c0-.491-.005-1.483-.016-1.976c-.065-3.065-.098-4.598-1.229-5.733c-1.131-1.136-2.705-1.175-5.854-1.254a115 115 0 0 0-5.802 0c-3.149.079-4.723.118-5.854 1.254c-1.131 1.135-1.164 2.668-1.23 5.733a69 69 0 0 0 0 2.952c.066 3.065.099 4.598 1.23 5.733c1.131 1.136 2.705 1.175 5.854 1.254q1.204.03 2.401.036"/><path d="m7 8.5l2.942 1.74c1.715 1.014 2.4 1.014 4.116 0L17 8.5m-3 9h8m-8 0c0-.7 1.994-2.008 2.5-2.5M14 17.5c0 .7 1.994 2.009 2.5 2.5"/></g></svg>        </div>

        <h1 className="text-3xl font-bold text-white-900 mb-4">
          Verify Your Email
        </h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          We sent a magic link to your inbox.<br />
          Click it to unlock your AI-powered study planner.
        </p>

        <p className="mt-8 text-sm text-white-500">
          Taking too long? Check spam folder.<br />
        </p>
      </div>
    </div>
  );
}