import type { APIRoute } from "astro";
import uploadFile from "../../data/storage/common/upload-file";

export const POST: APIRoute = async ({ request }) => {
  // Call uploadfile
  const formData = await request.formData();
  const file = formData.get("file") as File;
  // Call uploadFile
  const result = await uploadFile(file, "uploads/" + file.name);
  if (result.status === "error") {
    return new Response(JSON.stringify(result), { status: 500 });
  }
  console.log("File uploaded successfully ", result);
  return new Response(JSON.stringify(result), { status: 200 });
};
