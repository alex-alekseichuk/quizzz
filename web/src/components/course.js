import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';

import {api} from "../api";
import {Loading} from "./utils";
import {Session} from "./session";

/**
 * Course page.
 * @param courseId
 */
export function Course() {
  const { courseId } = useParams();
  const course = useCourse(courseId);

  if (!course)
    return <Loading/>;

  return <>
    <h2>{course.title}</h2>
    <Session course={course}/>
  </>;
}

function useCourse(courseId) {
  const [course, setCourse] = useState(null);
  useEffect(() => {
    api.getCourse(courseId).then(data => setCourse(data));
  }, [courseId]);
  return course;
}
