import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const GET = async (req: Request, res: Response) => {
    try {
        const courses = await prisma.course.findMany();
        return NextResponse.json({ success: true, message:"Fetched Courses", courses });
    } catch (error) {
        return NextResponse.json({ success:false,error },{
            status: 500
        });
    }
};

