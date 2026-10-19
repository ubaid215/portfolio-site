// components/seo/JsonLd.tsx
// Renders schema.org JSON-LD in the server response. The `<` escape prevents a
// closing script tag from appearing inside the serialized data.

export function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c")
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
