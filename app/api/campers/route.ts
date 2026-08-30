import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "../api";
import { logErrorResponse } from "../_utils/utils";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = Number(searchParams.get("page") ?? 1);
    const perPage = Number(searchParams.get("perPage") ?? 4);
    const location = searchParams.get("location") ?? undefined;
    const form = searchParams.get("form") ?? undefined;
    const transmission = searchParams.get("transmission") ?? undefined;
    const engine = searchParams.get("engine") ?? undefined;

    const res = await api.get("/campers", {
      params: {
        page,
        perPage,
        location: location || undefined,
        form: form || undefined,
        transmission: transmission || undefined,
        engine: engine || undefined,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? 500 },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
