<script lang="ts">
  import { onMount } from 'svelte';
  import PixelCard from './PixelCard.svelte';
  
  let scrollY = $state(0);
  let mounted = $state(false);
  
  onMount(() => {
    mounted = true;
  });
  
  // ===== プロフィール設定 =====
  const about = {
    description: `しがない工学徒`,
    skills: ['Vue', 'Svelte', 'Python', 'TypeScript', 'Embedded C++', 'PostScript' ],
  };

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'qualifications', label: 'Qualifications' },
    { id: 'sns', label: 'SNS' },
    { id: 'activities', label: 'Activities' },
  ];
  
  const qualifications = [
    { title: '応用情報技術者試験', description: '2025-07' },
    { title: 'エンベデッドシステムスペシャリスト試験', description: '2025-12' },
  ];
  
  const snsLinks = [
    { title: 'GitHub', description: '@ybasviel', href: 'https://github.com/ybasviel' },
    { title: 'Twitter', description: '@lnln_ch', href: 'https://x.com/lnln_ch' },
    { title: 'Discord', description: '@lnln_ch', href: 'https://discordapp.com/users/316944552789540875' },
    { title: 'Instagram', description: '@lnln_ch', href: 'https://www.instagram.com/lnln_ch/' },
    { title: 'mixi2', description: '@lnln_ch', href: 'https://mixi.social/@lnln_ch' },
  ];
  
  const activities = [
    { 
      title: 'なかがわ電機サービス', 
      description: '趣味のものづくり', 
      href: 'https://nms.lnln.dev'
    },
  ];

  const mutalLinks = [
    { title: 'ごっち', description: 'gotti.dev', href: 'https://gotti.dev' },
    { title: 'アイスの棒', description: 'azukibar.dev', href: 'https://azukibar.dev' },
    { title: '捻れたバベル', description: 'hutinoatari.dev', href: 'https://www.hutinoatari.dev/' },
    { title: 'もちもちのめも', description: 'mocchan.dev', href: 'https://mocchan.dev' },
    { title: 'ファンサイト', description: 'elmer9.github.io', href: 'https://elmer9.github.io/' },
    { title: 'へる破壊財団', description: 'helkun.dev', href: 'https://helkun.dev/' },
    { title: 'ゆいのページ', description: 'yuino.dev', href: 'https://yuino.dev/' },
    { title: 'あづみのメモ帳', description: 'dg7.dev', href: 'https://dg7.dev/' },
    { title: 'kat0hのホームページ', description: 'kat0h.com', href: 'https://kat0h.com/' },
    { title: 'McbeEringi Home', description: 'mcbeeringi.github.io', href: 'https://mcbeeringi.github.io/' },
    { title: 'VOID', description: 'k1h.dev', href: 'https://www.k1h.dev' },
    {title: 'はんかくくんのページ', description: 'kqiita.github.io', href: 'https://kqiita.github.io/' },
  ];
</script>

{#snippet pixelSquare()}
  <svg class="w-5 h-5 text-orange-500" viewBox="0 0 16 16" fill="currentColor">
    <rect x="2" y="2" width="12" height="12" />
  </svg>
{/snippet}

<svelte:window bind:scrollY />

<div class="min-h-screen font-pixel">
  <!-- Navigation -->
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-100 {scrollY > 50 ? 'bg-white dark:bg-slate-900 border-b-4 border-gray-900 dark:border-orange-400' : ''}"
  >
    <div class="max-w-4xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <a href="/" class="text-xl tracking-wide hover:text-orange-500 transition-colors">
          [lnln.dev]
        </a>
        <div class="hidden sm:flex items-center gap-6">
          {#each sections as section}
            <a 
              href="#{section.id}" 
              class="text-sm text-gray-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              &gt; {section.label}
            </a>
          {/each}
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="min-h-screen flex items-center justify-center relative overflow-hidden">
    <!-- Decorative background - pixel pattern -->
    <div class="absolute inset-0 -z-10 opacity-10 dark:opacity-20">
      <div class="pixel-grid"></div>
    </div>
    
    <div 
      class="text-center px-6 transition-all duration-300"
      class:opacity-100={mounted}
      class:translate-y-0={mounted}
      class:opacity-0={!mounted}
      class:translate-y-4={!mounted}
    >
      <!-- Icon/Avatar -->
      <div class="relative mb-8 inline-block">
        <div class="pixel-border p-1 bg-white dark:bg-slate-800">
          <img 
            src="/lnln.jpg" 
            alt="lnln" 
            class="w-32 h-32 object-cover"
            style="image-rendering: pixelated;"
          />
        </div>
      </div>
      
      <!-- Name -->
      <h1 class="text-4xl sm:text-5xl tracking-wide mb-4">
        りんりん
      </h1>
      
    </div>
    
    <!-- Scroll indicator -->
    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
      <span class="text-2xl text-gray-400 dark:text-slate-500">▼</span>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-4xl mx-auto px-6 pb-24">
    
    <!-- About Section -->
    <section id="about" class="py-24 scroll-mt-24">
      <h2 class="text-2xl mb-8 flex items-center gap-3">
        {@render pixelSquare()}
        About
      </h2>
      
      <div class="pixel-box bg-gray-50 dark:bg-slate-800 p-6">
        <p class="text-gray-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {about.description}
        </p>
        
        <div class="mt-6 flex flex-wrap gap-2">
          {#each about.skills as skill}
            <span class="px-3 py-1 bg-white dark:bg-slate-700 text-sm text-gray-700 dark:text-slate-300 border-2 border-gray-900 dark:border-slate-500">
              {skill}
            </span>
          {/each}
        </div>
      </div>
    </section>

    <!-- SNS Section -->
    <section id="sns" class="py-24 scroll-mt-24">
      <h2 class="text-2xl mb-8 flex items-center gap-3">
        {@render pixelSquare()}
        SNS
      </h2>
      
      <div class="grid sm:grid-cols-2 gap-3">
        {#each snsLinks as link}
          <PixelCard title={link.title} description={link.description} href={link.href} />
        {/each}
      </div>
    </section>

    <!-- Activity Section -->
    <section id="activities" class="py-24 scroll-mt-24">
      <h2 class="text-2xl mb-8 flex items-center gap-3">
        {@render pixelSquare()}
        Activities
      </h2>
      
      <div class="space-y-3">
        {#each activities as activity}
          <PixelCard title={activity.title} description={activity.description} href={activity.href} />
        {/each}
      </div>
    </section>

    <!-- Qualifications Section -->
    <section id="qualifications" class="py-24 scroll-mt-24">
      <h2 class="text-2xl mb-8 flex items-center gap-3">
        {@render pixelSquare()}
        Qualifications
      </h2>
      
      <div class="space-y-3">
        {#each qualifications as qual}
          <PixelCard title={qual.title} description={qual.description} />
        {/each}
      </div>
    </section>

    <!-- Mutal Links Section -->
    <section id="mutal-links" class="py-24 scroll-mt-24">
      <h2 class="text-2xl mb-8 flex items-center gap-3">
        {@render pixelSquare()}
        Links (friends)
      </h2>
      
      <div class="grid sm:grid-cols-3 gap-3">
        {#each mutalLinks as link}
          <PixelCard title={link.title} description={link.description} href={link.href} />
        {/each}
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="border-t-4 border-gray-900 dark:border-slate-600">
    <div class="max-w-4xl mx-auto px-6 py-6">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-gray-500 dark:text-slate-400">
          (C) 2025 lnln.dev
        </p>
        <a 
          href="/" 
          class="text-sm text-gray-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
        >
          ▲ Back to top
        </a>
      </div>
    </div>
  </footer>
</div>

<style>
  .font-pixel {
    font-family: 'DotGothic16', cursive;
  }
  
  .pixel-border {
    border: 4px solid #1f2937;
    box-shadow: 4px 4px 0 #1f2937;
  }
  
  :global(.dark) .pixel-border {
    border-color: #fb923c;
    box-shadow: 4px 4px 0 #fb923c;
  }
  
  .pixel-box {
    border: 3px solid #1f2937;
    box-shadow: 3px 3px 0 #1f2937;
  }
  
  :global(.dark) .pixel-box {
    border-color: #475569;
    box-shadow: 3px 3px 0 #475569;
  }
  
  .pixel-grid {
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(#1f2937 1px, transparent 1px),
      linear-gradient(90deg, #1f2937 1px, transparent 1px);
    background-size: 20px 20px;
  }
  
  :global(.dark) .pixel-grid {
    background-image: 
      linear-gradient(#64748b 1px, transparent 1px),
      linear-gradient(90deg, #64748b 1px, transparent 1px);
  }
</style>

