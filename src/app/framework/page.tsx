import { getGeneratedCourseById, getDefaultGeneratedCourse } from "@/lib/courses/course-registry";
import { loadGeneratedFramework } from "@/lib/courses/generated-framework-loader";
import { getFixedCourseFramework } from "@/lib/fixed-course-framework";
import FrameworkPageClient from "./FrameworkPageClient";

export default async function FrameworkPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;
  const courseId = course ?? "";
  const courseObj = getGeneratedCourseById(courseId) ?? getDefaultGeneratedCourse();

  const [detailedResult, conciseResult] = await Promise.all([
    loadGeneratedFramework({ courseId: courseObj.id, variant: "full", level: "detailed" }),
    loadGeneratedFramework({ courseId: courseObj.id, variant: "full", level: "concise" }),
  ]);

  const detailedContent = detailedResult.ok
    ? detailedResult.content
    : JSON.stringify(getFixedCourseFramework("DETAILED"), null, 2);

  const conciseContent = conciseResult.ok
    ? conciseResult.content
    : JSON.stringify(getFixedCourseFramework("CONCISE"), null, 2);

  return (
    <FrameworkPageClient
      initialDetailedContent={detailedContent}
      initialConciseContent={conciseContent}
      currentCourseId={courseObj.id}
      courseName={courseObj.title}
      initialMode="detailed"
    />
  );
}
