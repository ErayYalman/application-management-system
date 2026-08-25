import type { AttachmentResponse } from "../../../api/generated";
import attachmentApi from "./attachment-api";

export async function getAttachments(
  applicationId: string,
): Promise<AttachmentResponse[]> {
  const response = await attachmentApi.getAttachments(applicationId);
  return response.data;
}

export async function uploadAttachment(
  applicationId: string,
  file: File,
): Promise<AttachmentResponse> {
  const response = await attachmentApi.upload(applicationId, file);
  return response.data;
}

export async function downloadAttachment(attachmentId: string) {
  return attachmentApi.download(attachmentId, { responseType: "blob" });
}

export async function deleteAttachment(attachmentId: string): Promise<void> {
  await attachmentApi.delete2(attachmentId);
}