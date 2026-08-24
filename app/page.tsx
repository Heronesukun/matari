import Link from 'next/link';
import { ArrowRight, BookOpen, Cpu, Network, Sigma, Waypoints } from 'lucide-react';

const future = [
  { title: '数据结构', icon: Waypoints },
  { title: '计算机组成原理', icon: Cpu },
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
            面向考试与工程实践的快速知识库。用最短路径掌握概念、标例、核心知识点、常见题型与易错点。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/docs/math2" className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-3 text-fd-primary-foreground">
              开始数学二 <ArrowRight className="size-4" />
            </Link>
            <a href="https://github.com/Heronesukun/matari" className="rounded-lg border px-5 py-3">GitHub</a>
          </div>
        </div>

        <section className="grid gap-5 md:grid-cols-2">
          <Link href="/docs/math2" className="group rounded-2xl border bg-fd-card/70 p-7 backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">
            <Sigma className="mb-8 size-8" />
            <h2 className="text-2xl font-semibold">数学二</h2>
            <p className="mt-2 text-fd-muted-foreground">高等数学 · 线性代数</p>
            <p className="mt-6 text-sm font-medium">V0.1：高数前三章已进入建设 →</p>
          </Link>

          <div className="rounded-2xl border bg-fd-card/50 p-7">
            <h2 className="text-2xl font-semibold">计算机基础</h2>
            <p className="mt-2 text-fd-muted-foreground">后续按同一知识模板持续扩展。</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
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
