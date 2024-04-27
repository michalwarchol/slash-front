export default async (url: string, fileName: string) => {
  try {
    const a = document.createElement("a");
    a.href = process.env.NEXT_PUBLIC_API_URL + url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
  } catch (err) {
    console.error("Fetch error:", err); // eslint-disable-line no-console
  }
};
