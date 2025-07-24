"use client";
import { useState } from "react";
import { Lightbulb, Loader2, AlertCircle, Sparkles } from "lucide-react";

export default function IdeaForm() {
  const [idea, setIdea] = useState("");
  const [sections, setSections] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSections(null);

    try {
      const res = await fetch("http://localhost:5000/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to generate sections");
      }

      const data = await res.json();
      setSections(data.sections);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg mb-6">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Web Idea Generator
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Transform your creative concepts into structured website sections with AI-powered insights
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="idea" className="block text-sm font-semibold text-gray-700">
                Your Website Idea
              </label>
              <div className="relative">
                <input
                  id="idea"
                  type="text"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="E.g., A platform for freelance designers to showcase portfolios..."
                  className="w-full px-4 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-300 transition-all duration-200 text-gray-700 placeholder-gray-400"
                  required
                />
                <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-purple-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Magic...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Generate Website Sections
                </div>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {sections && (
            <div className="mt-8 animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-gray-800">Generated Website Sections</h2>
              </div>
              <div className="grid gap-3">
                {sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="group p-4 bg-gradient-to-r from-white/80 to-purple-50/80 border border-purple-100 rounded-xl hover:from-white hover:to-purple-50 transition-all duration-200 transform hover:scale-[1.01]"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 group-hover:scale-110 transition-transform duration-200">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 font-medium flex-1">{section}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl">
                <p className="text-sm text-gray-600 text-center">
                  ✨ <strong>{sections.length} sections</strong> generated successfuly
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}