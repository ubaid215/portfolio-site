import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"
import { PROJECTS, getProject, getAdjacentProjects } from "@/lib/projects"
import { caseStudyMetadata, caseStudySchema } from "@/lib/seo"
import { CaseStudyClient } from "./CaseStudyClient"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return caseStudyMetadata(slug) ?? {}
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const adjacent = getAdjacentProjects(slug)
  const schema = caseStudySchema(slug)

  return (
    <>
      {schema && <JsonLd data={schema} />}
      <CaseStudyClient key={project.slug} project={project} adjacent={adjacent} />
    </>
  )
}
