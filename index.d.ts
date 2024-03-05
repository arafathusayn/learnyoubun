// 'cli-markdown' doesn't provide TypeScript types
declare module "cli-markdown" {
  const cliMd: (content: string) => string;
  export default cliMd;
}

// 'boganipsum' doesn't provide TypeScript types
declare module "boganipsum" {
  const boganipsum: (options?: { paragraphs?: number }) => string;
  export default boganipsum;
}
