// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { useNotification } from "../components/Notification";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { showNotification } = useNotification();
//   const router = useRouter();
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const result = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });
//     if (result?.error) {
//       showNotification(result.error, "error");
//     } else {
//       showNotification("Login successful!", "success");
//       router.push("/");
//     }
//   };
//   return (
//     <div className=" max-w-md mx-auto">
//       <h1 className=" text-2xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="email" className="block mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="block mb-1">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
//           Login
//         </button>
//         <p className="text-center mt-4">
//           <Link href="/register" className="text-blue-500 hover:text-blue-600">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useNotification } from "../components/Notification";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      showNotification(result.error, "error");
    } else {
      showNotification("Login successful!", "success");
      router.push("/");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
