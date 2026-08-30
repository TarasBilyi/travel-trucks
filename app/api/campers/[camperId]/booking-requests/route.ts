import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "../../../api";
import { logErrorResponse } from "../../../_utils/utils";

type Params = {
  params: Promise<{ camperId: string }>;
};

/**
 * Backend contract (confirmed via Swagger):
 * POST /campers/{camperId}/booking-requests
 * body: { name: string; email: string }
 * 201 -> { message: string }
 * 404 -> camper not found
 */
export async function POST(request: NextRequest, { params }: Params) {
  const { camperId } = await params;
  const body = await request.json();

  try {
    const res = await api.post(`/campers/${camperId}/booking-requests`, {
      name: body.name,
      email: body.email,
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
