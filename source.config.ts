import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkRepairStrongLabels from './lib/remark-repair-strong-labels';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema,
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkRepairStrongLabels],
    // KaTeX must run before Fumadocs' default Shiki syntax highlighter.
    rehypePlugins: (plugins) => [rehypeKatex, ...plugins],
  },
});
