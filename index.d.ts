// 'cli-markdown' doesn't provide TypeScript types
declare module "cli-markdown" {
  const cliMd: (content: string) => string;
  export default cliMd;
}
