import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (req: Request, res: Response) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const email = session.user.email || '';
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        const courses = await prisma.usersOnCourses.findMany({
            where: {
                userId: user.id,
            }
        });
        
        return NextResponse.json({ success: true, message: "User's courses", courses});
    } catch (err) {
        return NextResponse.json({ success: false, message: "Error" }, { status: 500 });
    }
};