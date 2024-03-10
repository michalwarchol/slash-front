import axios from "axios";
import { redirect } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_API_URL,
  isServer = typeof window === "undefined";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import("next/headers");
    const token = cookies().get("token")?.value;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    const locale = cookies().get("NEXT_LOCALE")?.value;

    if (locale) {
      config.headers["lang"] = locale;
    }
  } else {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    const locale = document.cookie.replace(
      /(?:(?:^|.*;\s*)NEXT_LOCALE\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (locale) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      if (isServer) {
        const { cookies } = await import("next/headers");
        const locale = cookies().get("NEXT_LOCALE")?.value;
        redirect(`/${locale}/login`);
      } else {
        const locale = document.cookie.replace(
          /(?:(?:^|.*;\s*)NEXT_LOCALE\s*=\s*([^;]*).*$)|^.*$/,
          "$1"
        );

        window.location.href = `/${locale}/login`;
      }
    }
    return error;
  }
);

export default api;
