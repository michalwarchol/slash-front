"use client";
import Button from "@/components/Button";
import axios from "@/utils/axios";

import { setToken } from "../actions";
import styles from "./styles.module.scss";

export default function Login() {
  const onToken = async () => {
    setToken("token example");
  };

  const onLogin = () => {
    axios.get("/users/me");
  };

  return (
    <div className={styles.loginContainer}>
      <Button onClick={onToken}>Set token</Button>

      <Button onClick={onLogin}>Login</Button>
    </div>
  );
}
