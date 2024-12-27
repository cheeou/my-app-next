"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import styles from "./login.module.css";
import api from "./lib/api"; 

export default function LoginPage() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        email, // FastAPI에 전달할 데이터
        password,
      });

      const { access_token, refresh_token } = response.data;

      // Access Token과 Refresh Token 저장
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

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
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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