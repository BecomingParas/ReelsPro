import { useRouter } from "next/navigation";
import React, { useState } from "react";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Your password does not match");
    }
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = res.json();
      if (!res.ok) {
        setError("Registration failed");
      }
      router.push("/login");
    } catch (error) {}
  };

  return <div>page</div>;
}

export default page;
