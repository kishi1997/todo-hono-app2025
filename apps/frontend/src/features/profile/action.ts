"use server";
import { ProfileGetResponse, ProfilePatchRequest } from "@/types/api";
import { createAuthorizedClient } from "@/utils/client";

export const getProfile = async (): Promise<ProfileGetResponse> => {
  const client = await createAuthorizedClient();
  const response = await client.profile.$get();
  if (!response.ok) {
    throw new Error("プロフィールの取得に失敗しました");
  }
  return response.json();
};

export const setProfile = async (name: string): Promise<void> => {
  const client = await createAuthorizedClient();
  const response = await client.profile.$post({
    json: { name },
  });
  if (!response.ok) {
    throw new Error("プロフィールの取得に失敗しました");
  }
};
export const updateProfile = async (
  profile: ProfilePatchRequest
): Promise<void> => {
  const client = await createAuthorizedClient();
  const response = await client.profile.$patch(profile);
  if (!response.ok) {
    throw new Error("プロフィールの更新に失敗しました");
  }
};
