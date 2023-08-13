export async function checkDNSStatus(hostname: string) {
  try {
    const response = await fetch(
      `https://dns.google/resolve?name=${hostname}&type=A`
    );
    const dnsData = await response.json();
    // If the DNS query returns an answer, return the IP address
    if (dnsData.Status === 0) {
      return "No DNS issues found";
    } else {
      return `DNS issue detected, error: ${dnsData.Status}`;
    }
  } catch (error: any) {
    // If there's an error (e.g., network error, DNS failure), return the error message
    return `DNS Check not reachable, error: ${error.message}`;
  }
}
