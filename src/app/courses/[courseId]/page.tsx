import { prisma } from "@/utils/prisma";

export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
  });
  return (
    <div className="flex flex-col items-center [&>p]:my-2">
      <h1 className="text-3xl text-bold my-5">{course?.name}</h1>
      <p>{course?.description}</p>
      <p>Instructor: {course?.instructor}</p>
      <p>Enrollment: {course?.enrollmentStatus}</p>
      <p>Duration: {course?.duration}</p>
      <p>{course?.schedule}</p>
      <p>{course?.location}</p>
      <h2>Pre-reqiuisites:</h2>
      {course?.prerequisites.map((prereq, key) => (
        <span
          className="p-2 rounded bg-slate-100 m-2 text-slate-900 text-xs"
          key={key}
        >
          {prereq}
        </span>
      ))}
    </div>
  );
}
