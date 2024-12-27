"use client"; 

import { useState } from "react";
import api from "../lib/api"; 
import { useRouter } from "next/navigation"; // Next.js 라우터

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        username,
        password,
      });

      // JWT 저장
      const token = response.data.access_token;
      localStorage.setItem("access_token", token);

      alert("로그인 성공!");
      router.push("/protected"); // 보호된 페이지로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패! 사용자 정보를 확인하세요.");
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}