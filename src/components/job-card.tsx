import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { JobMeta } from "@/lib/types";

interface JobCardProps {
  job: JobMeta;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.slug}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        <CardContent className="p-6">
          <Badge variant="secondary" className="mb-3 text-xs">
            {job.category}
          </Badge>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-lg">{job.title}</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-lg text-primary font-medium">
              {job.transformsTo}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
