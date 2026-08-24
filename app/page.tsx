import Link from 'next/link';
import { ArrowRight, BookOpen, Cpu, Network, Sigma, Waypoints } from 'lucide-react';

const active = [
  {
    title: '数据结构',
    description: '复杂度 · 线性表 · 栈与队列',
    href: '/docs/cs/data-structure',
    icon: Waypoints,
    status: '核心前三章建设中',
  },
  {
    title: '计算机组成原理',
    description: '数据表示与运算',
    href: '/docs/cs/computer-organization',
    icon: Cpu,
    status: '第二章建设中',
  },
];

const future = [
  { title: '操作系统', icon: BookOpen },
  { title: '计算机网络', icon: Network },
];

export default function HomePage() {
  return (
    <main className="matari-gradient min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-16 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-fd-muted-foreground">
            <Sigma className="size-4" /> MATARI Knowledge Base
          </div>
          <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">先会用，再看深。</h1>
          <p className="mt-6 text-lg leading-8 text-fd-muted-foreground md:text-xl">
            面向考试与工程实践的快速知识库。用可执行的判断流程连接概念、标例、常见题型与逐题详解。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/docs" className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-3 text-fd-primary-foreground">
              查看学习入口 <ArrowRight className="size-4" />
            </Link>
            <a href="https://github.com/Heronesukun/matari" className="rounded-lg border px-5 py-3">GitHub</a>
          </div>
        </div>

        <section className="grid gap-5 md:grid-cols-2">
          <Link href="/docs/math2" className="group rounded-2xl border bg-fd-card/70 p-7 backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">
            <Sigma className="mb-8 size-8" />
            <h2 className="text-2xl font-semibold">数学二</h2>
            <p className="mt-2 text-fd-muted-foreground">高等数学 · 线性代数</p>
            <p className="mt-6 text-sm font-medium">高数前三章已上线 →</p>
          </Link>

          <div className="rounded-2xl border bg-fd-card/50 p-7">
            <h2 className="text-2xl font-semibold">计算机基础</h2>
            <p className="mt-2 text-fd-muted-foreground">从结构、状态和约束出发建立可应用模型。</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {active.map(({ title, description, href, icon: Icon, status }) => (
                <Link key={title} href={href} className="rounded-xl border p-4 transition hover:bg-fd-accent">
                  <Icon className="mb-4 size-5" />
                  <div className="font-medium">{title}</div>
                  <div className="mt-1 text-xs text-fd-muted-foreground">{description}</div>
                  <div className="mt-3 text-xs font-medium">{status} →</div>
                </Link>
              ))}
              {future.map(({ title, icon: Icon }) => (
                <div key={title} className="rounded-xl border p-4 text-sm text-fd-muted-foreground">
                  <Icon className="mb-4 size-5" />{title}<div className="mt-1 text-xs">Coming soon</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
