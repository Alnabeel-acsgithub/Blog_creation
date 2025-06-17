export async function blogImage(payload: string): Promise<string | null> {
  try {
    const response = await fetch("https://workflows.agilecyber.com/webhook/image_generation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("API call failed: " + response.status);
    }

    const blob = await response.blob();

    // Convert Blob to Object URL for image preview
    const objectUrl = URL.createObjectURL(blob);
    return objectUrl;

  } catch (error) {
    console.error("Error fetching blog image:", error);
    return null;
  }
}
