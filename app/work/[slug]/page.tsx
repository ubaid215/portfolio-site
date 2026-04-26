import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { PROJECTS, getProject, getAdjacentProjects } from "@/lib/projects"
import { CaseStudyClient } from "./CaseStudyClient"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.shortDesc,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const adjacent = getAdjacentProjects(slug)

  return <CaseStudyClient project={project} adjacent={adjacent} />
}