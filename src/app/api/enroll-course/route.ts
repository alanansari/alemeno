import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req: Request, res: Response) => {
    const session = await getServerSession(authOptions);
    // if (!session || !session.user) {
    //     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    // }
    const email = session?.user?.email || 'ansarialan31@gmail.com';
    const url = new URL(req.url);
    const courseId = url.searchParams.get("courseId");
    if (!courseId) {
        return NextResponse.json({ success: false, message: "Course Id is required" }, { status: 400 });
    }
    try {
        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
            },
        });
        if (!course) {
            return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 });
        }
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        await prisma.usersOnCourses.create({
            data: {
                userId: user.id,
                courseId: course.id,
            },
        });
        return NextResponse.json({ success: true, message: "Enrolled in course" });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
};