"use client";
import { useState, useEffect } from "react";
import { Course } from "../../utils/types";
import { useRouter } from "next/navigation";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses);
        setFilteredCourses(data.courses);
      });
  }, []);

  const router = useRouter();

  const handleClick = async (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Filter courses based on the search query
    const filtered = courses.filter((course) => {
      const searchTerms = [course.name, course.description, course.instructor]
        .join(" ")
        .toLowerCase();
      return searchTerms.includes(query.toLowerCase());
    });

    setFilteredCourses(filtered);
  };

  return (
    <>
      <div className="text-center text-2xl font-bold">Courses</div>
      <div className="flex justify-center my-4 text-slate-950">
        <input
          type="text"
          placeholder="Search by name, description, or instructor"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-[75vw]"
        />
      </div>
      <div className="text-slate-900 flex flex-col items-center h-[75vh] w-[85vw] mx-auto overflow-scroll overflow-x-hidden">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-200 p-4 m-2 w-[80%] rounded-md hover:cursor-pointer hover:bg-gray-300 transition duration-300 ease-in-out"
            onClick={() => {
              handleClick(course.id);
            }}
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
