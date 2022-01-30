import React, { useState } from 'react';
import { fetchHomePageCourses } from '../api';
import PageWithScheduler from './PageWithScheduler';
import { useMount } from '../utils';
import CourseCardGrid from '../components/CourseCardGrid/CourseCardGrid';

export default function HomePage({ shouldShowScheduler }) {
  const [courseCategories, setCourseCategories] = useState(null);

  useMount(() => fetchHomePageCourses().then((data) => setCourseCategories(data)));

  return (
    <PageWithScheduler shouldShowScheduler={shouldShowScheduler}>
      {courseCategories &&
        courseCategories.map(({ category, courseIDs }, i) => (
          <CourseCardGrid
            key={i}
            title={category}
            courseIDs={courseIDs}
            numColumns={shouldShowScheduler ? 3 : 4}
          />
        ))}
    </PageWithScheduler>
  );
}
