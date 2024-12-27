"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js 라우터
import styles from "./login.module.css";

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
    <div className={styles.container}>
      <h1 className={styles.title}>로그인</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="submit">
          로그인
        </button>
      </form>
    </div>
  );
}