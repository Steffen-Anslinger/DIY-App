export default async function upload(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dihl2eult/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const responseData = await response.json();

    return {
      url: responseData.secure_url,
      width: responseData.width,
      height: responseData.height,
    };
  } catch (error) {
    console.error("Upload failed:", error.message);
    throw error;
  }
}
