"use client";
import IdeaForm from "./components/IdeaForm";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-sky-50 to-purple-100 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <IdeaForm />

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Powered by AI • Built with creativity in mind
          </p>
        </div>
      </div>
    </div>
  );
}