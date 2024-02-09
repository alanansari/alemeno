"use client";
import { useState, useEffect } from "react";
import { Course } from "../../utils/types";
import { useRouter } from "next/navigation";


export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses);
      });
  }, []);

  const router = useRouter();

  const handleClick = async (courseId: string) => {
    router.push(`/courses/${courseId}`);
  }

  return (
    <>
      <div className="text-center text-2xl font-bold">Courses</div>
      <div className="text-slate-900 flex flex-col items-center h-[75vh] w-[85vw] mx-auto overflow-scroll overflow-x-hidden">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-200 p-4 m-2 w-[80%] rounded-md hover:cursor-pointer hover:bg-gray-300 transition duration-300 ease-in-out"
            onClick={() => {handleClick(course.id)}}
          >
            <h2 className="text-lg font-bold">{course.name}</h2>
            <p className="text-sm">{course.description}</p>
            <p>Instructor: {course.instructor}</p>
          </div>
        ))}
      </div>
    </>
  );
}
