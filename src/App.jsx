import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [result, setResult] = useState("Output will appear here...");
  const [loading, setLoading] = useState(false);

  const runTask = async () => {
    if (!task.trim()) {
      setResult("Please enter a task before running.");
      return;
    }

    setLoading(true);
    setResult("Connecting to backend...");

    try {
      const response = await fetch(
        "https://devpilot-backend-5o33.onrender.com/run-task",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task }),
        }
      );

      const data = await response.json();

      if (data.error) {
        setResult("Backend Error: " + data.error);
      } else {
        setResult(data.output || "No response from backend");
      }
    } catch (error) {
      setResult(
        "❌ Cannot connect to backend.\n\nError: " + error.message
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-16 px-4">
      <h1 className="text-4xl font-bold mb-6">
        DevPilot – AI Developer Assistant
      </h1>

      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-lg">
        <label className="block text-lg font-semibold mb-2">
          Enter your task:
        </label>

        <input
          type="text"
          placeholder="e.g., Generate a React login page"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 outline-none"
        />

        <button
          onClick={runTask}
          disabled={loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 w-full py-3 rounded-lg font-semibold"
        >
          {loading ? "Processing..." : "Run Task"}
        </button>
      </div>

      {/* Output Box */}
      <div className="w-full max-w-2xl mt-6 bg-black p-4 rounded-lg border border-gray-700 overflow-auto max-h-[400px]">
        <pre className="whitespace-pre-wrap text-green-300 font-mono text-sm">
          {result}
        </pre>
      </div>
    </div>
  );
}

export default App;
