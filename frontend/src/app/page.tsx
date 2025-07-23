"use client";
import { useState } from "react";

export default function Home() {
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
      const res = await fetch("http://localhost:3000/ideas", {
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Web Idea Generator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          value={idea}
          onChange={e => setIdea(e.target.value)}
          placeholder="Enter your website idea..."
          className="border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Sections"}
        </button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {sections && (
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Preview Sections</h2>
          <ul className="list-disc pl-6">
            {sections.map((section, idx) => (
              <li key={idx} className="py-1">{section}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
