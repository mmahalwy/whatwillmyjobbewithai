import { getAllJobs } from "@/lib/jobs";
import { JobList } from "@/components/job-list";

export default function Home() {
  const jobs = getAllJobs();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          What Will My Job Be With AI?
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Explore how 50 tech jobs will transform as AI reshapes the industry.
          Learn what your role will become and how to get ahead.
        </p>
      </div>

      <JobList jobs={jobs} />
    </div>
  );
}
