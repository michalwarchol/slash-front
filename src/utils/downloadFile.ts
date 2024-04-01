export default async (url: string, fileName: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
  } catch (err) {
    console.error("Fetch error:", err); // eslint-disable-line no-console
  }
};
