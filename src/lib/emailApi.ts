const FUNCTION_URL =
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-mass-email`;

export async function sendMassEmail(
  token: string,
  subject: string,
  body: string,
): Promise<{ sent: number }> {
  const res = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subject, body }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(detail || "Failed to send emails");
  }
  return res.json();
}
