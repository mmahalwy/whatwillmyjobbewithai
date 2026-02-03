import { notFound } from "next/navigation";
import { getAllJobSlugs, getJobBySlug } from "@/lib/jobs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllJobSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const job = getJobBySlug(slug);
    return {
      title: `${job.title} -> ${job.transformsTo} | What Will My Job Be?`,
      description: `Learn how the ${job.title} role will transform into ${job.transformsTo} with AI and what you can do to get ahead.`,
    };
  } catch {
    return {
      title: "Job Not Found | What Will My Job Be?",
    };
  }
}

export default async function JobPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const job = getJobBySlug(slug);

    return (
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="flex w-fit items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all jobs
        </Link>

        <Badge variant="secondary" className="mb-4">
          {job.category}
        </Badge>

        <div className="flex items-center gap-3 flex-wrap mb-8">
          <h1 className="text-4xl font-bold">{job.title}</h1>
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
          <span className="text-4xl font-bold text-primary">
            {job.transformsTo}
          </span>
        </div>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: parseMarkdown(job.content) }} />
        </article>
      </div>
    );
  } catch {
    notFound();
  }
}

function parseMarkdown(content: string): string {
  return content
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
    .replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n\n/gim, '</p><p class="mb-4">')
    .replace(/^(?!<[hlu])/gim, '<p class="mb-4">')
    .replace(/<p class="mb-4"><\/p>/gim, '')
    .replace(/<p class="mb-4">(<[hlu])/gim, '$1')
    .replace(/(<\/[hlu][i2-6]?>)<\/p>/gim, '$1');
}
