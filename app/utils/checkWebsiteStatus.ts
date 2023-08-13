export async function checkWebsiteStatus(hostname: string) {
  try {
    const response = await fetch(`http://${hostname}`, { method: "HEAD" });

    if (!response.ok) {
      // If the response status is not ok (200-299), throw an error
      throw new Error(`HTTP status code: ${response.status}`);
    }

    return response.status;
  } catch (error: any) {
    // If there's an error (e.g., network error, DNS failure), return the error message
    return `Website is down, error: ${error.message}`;
  }
}
