import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "../../../api";
import { logErrorResponse } from "../../../_utils/utils";

type Params = {
  params: Promise<{ camperId: string }>;
};

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { camperId } = await params;
    const res = await api.get(`/campers/${camperId}/reviews`);

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
