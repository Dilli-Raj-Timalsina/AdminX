"use server";

import { revalidateTag } from "next/cache";
import axios, { type AxiosError } from "axios";

export const deleteEntity = async (id: string, entity_name: string) => {
  try {
    const res = await axios({
      method: "DELETE",
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: `/api/${entity_name}/${id}`,
      data: {
        id: id,
      },
    });

    revalidateTag(entity_name);

    return {
      data: res.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    console.log(error);
    return {
      error: error?.response?.data || { message: "An error occurred!" },
      status: error?.response?.status || 500,
    };
  }
};
