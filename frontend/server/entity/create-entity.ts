"use server";

import { revalidateTag } from "next/cache";
import axios, { type AxiosError } from "axios";

export const createEntity = async (entity_name: string, data: any) => {
  try {
    const res = await axios({
      method: "POST",
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: `/api/${entity_name}`,
      data: data,
    });

    revalidateTag(entity_name);

    return {
      data: res.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    return {
      error: error?.response?.data?.message || {
        message: "An error occurred!",
      },
      status: error?.response?.data?.statusCode || 500,
    };
  }
};
