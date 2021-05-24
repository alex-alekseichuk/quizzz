import {useEffect, useState} from "react";
import { Link } from 'react-router-dom';

import {api} from "../api";
import {Loading} from "./utils";

/**
 * Courses list page.
 */
export function Courses({onCourse}) {
  const courses = useCourses();

  if (!courses)
    return <Loading />;

  return <>
    <h1>Quizzz</h1>
    <h2>Courses:</h2>
    <ul>
      {courses.map(course =>
        <CoursesItem key={course.id} course={course} onCourse={onCourse} />
      )}
    </ul>
  </>;
}

function CoursesItem({course, onCourse}) {
  return <li>
    <Link to={`/courses/${course.id}`}>{course.title}</Link>
  </li>;
}

function useCourses() {
  const [courses, setCourses] = useState(null);
  useEffect(() => {
    api.getCourses().then(data => setCourses(data));
  }, []);
  return courses;
}
