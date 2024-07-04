import { redirect } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_API_URL,
  isServer = typeof window === "undefined";

async function handleResult(result: Response) {
  if (result.status === 401) {
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

    return;
  }

  return result.json();
}

async function getDefaultHeaders(isMultipart?: boolean) {
  const customHeaders: HeadersInit = isMultipart
    ? {}
    : {
      "Content-Type": "application/json",
    };

  if (isServer) {
    const { cookies } = await import("next/headers");
    const token = cookies().get("token")?.value;

    if (token) {
      customHeaders.Authorization = `Bearer ${token}`;
    }

    const locale = cookies().get("NEXT_LOCALE")?.value;

    if (locale) {
      customHeaders.lang = locale;
    }
  } else {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token) {
      customHeaders.Authorization = `Bearer ${token}`;
    }

    const locale = document.cookie.replace(
      /(?:(?:^|.*;\s*)NEXT_LOCALE\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (locale) {
      customHeaders.lang = locale;
    }
  }

  return customHeaders;
}
class Fetch {
  static async get(endpoint: string, requestInit: RequestInit = {}) {
    const headers = await getDefaultHeaders();

    const result = await fetch(baseURL + endpoint, {
      ...requestInit,
      method: "GET",
      headers: {
        ...headers,
        ...requestInit.headers,
      },
    });

    return handleResult(result);
  }

  static async post(
    endpoint: string,
    requestInit: RequestInit,
    isMultipart: boolean = false
  ) {
    const headers = await getDefaultHeaders(isMultipart);

    const result = await fetch(baseURL + endpoint, {
      ...requestInit,
      method: "POST",
      headers: {
        ...headers,
        ...requestInit.headers,
      },
    });

    return handleResult(result);
  }

  static async put(
    endpoint: string,
    requestInit: RequestInit,
    isMultipart: boolean = false
  ) {
    const headers = await getDefaultHeaders(isMultipart);

    const result = await fetch(baseURL + endpoint, {
      ...requestInit,
      method: "PUT",
      headers: {
        ...headers,
        ...requestInit.headers,
      },
    });

    return handleResult(result);
  }

  static async delete(endpoint: string, requestInit: RequestInit) {
    const headers = await getDefaultHeaders();

    const result = await fetch(baseURL + endpoint, {
      ...requestInit,
      method: "DELETE",
      headers: {
        ...headers,
        ...requestInit.headers,
      },
    });

    return handleResult(result);
  }
}

export default Fetch;
