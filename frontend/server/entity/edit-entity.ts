"use server";

import { revalidateTag } from "next/cache";
import axios, { type AxiosError } from "axios";

export async function editEntity(id: string, entity_name: string, data: any) {
  try {
    const res = await axios({
      method: "PATCH",
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: `/api/${entity_name}/${id}`,
      data: data,
    });
    revalidateTag(entity_name);

    return {
      data: res.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    console.log(error);
    return {
      error: error?.response?.data?.message || {
        message: "An error occurred!",
      },
      status: error?.response?.status || 500,
    };
  }
}
