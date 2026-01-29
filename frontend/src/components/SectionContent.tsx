import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import type { Components } from 'react-markdown'

interface SectionContentProps {
  content: string
}

// Custom components for markdown rendering
const components: Components = {
  // Handle custom callout syntax
  div: ({ className, children, ...props }) => {
    if (className?.startsWith('callout-')) {
      const type = className.replace('callout-', '')
      return (
        <div className={`callout callout-${type}`} {...props}>
          {children}
        </div>
      )
    }
    return <div className={className} {...props}>{children}</div>
  },
  // Add classes to images for styling
  img: ({ src, alt, ...props }) => (
    <img
      src={src}
      alt={alt}
      className="rounded-lg shadow-md max-w-full my-4"
      loading="lazy"
      {...props}
    />
  ),
  // Style tables
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-sm text-gray-700 border-t border-gray-100">
      {children}
    </td>
  ),
}

// Process custom callout syntax :::note, :::warning, etc.
function processCallouts(content: string): string {
  return content.replace(
    /:::(note|warning|tip|clinical)\n([\s\S]*?):::/g,
    (_, type, text) => `<div class="callout-${type}">\n\n${text.trim()}\n\n</div>`
  )
}

export default function SectionContent({ content }: SectionContentProps) {
  const processedContent = processCallouts(content)

  return (
    <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-code:text-primary-700 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {processedContent}
      </ReactMarkdown>
    </article>
  )
}
