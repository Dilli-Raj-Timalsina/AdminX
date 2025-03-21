"use server";

import { revalidateTag } from "next/cache";
import axios, { type AxiosError } from "axios";

export const getEntityById = async (entity_name: string, id: string) => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: `/api/${entity_name}/${id}`,
    });
    revalidateTag(entity_name);

    return {
      data: res.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    return {
      error: error?.message ||
        error?.response?.data || { message: "An error occurred!" },
      status: error?.response?.status || 500,
    };
  }
};
