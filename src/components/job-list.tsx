"use client";

import { useState, useMemo } from "react";
import { JobMeta } from "@/lib/types";
import { JobCard } from "./job-card";
import { SearchInput } from "./search-input";
import { CategoryFilter } from "./category-filter";

interface JobListProps {
  jobs: JobMeta[];
}

export function JobList({ jobs }: JobListProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        search === "" ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.transformsTo.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === null || job.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [jobs, search, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by job title..."
        />
        <CategoryFilter
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {filteredJobs.length} of {jobs.length} jobs
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <JobCard key={job.slug} job={job} />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No jobs found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
