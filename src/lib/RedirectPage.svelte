<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    pageName: string;
  }

  let { pageName }: Props = $props();
  let mounted = $state(false);

  const targetUrl = 'https://nms.lnln.dev';

  onMount(() => {
    mounted = true;
  });

  function goToNms() {
    if (pageName === 'blog') {
      window.location.href = targetUrl + '/blog';
    } else {
      window.location.href = targetUrl;
    }
  }

  function goToHome() {
    window.location.href = '/';
  }
</script>

<div class="min-h-screen font-pixel flex items-center justify-center relative overflow-hidden">
  <!-- Decorative background - pixel pattern -->
  <div class="absolute inset-0 -z-10 opacity-10 dark:opacity-20">
    <div class="pixel-grid"></div>
  </div>

  <div
    class="text-center px-6 max-w-lg transition-all duration-300"
    class:opacity-100={mounted}
    class:translate-y-0={mounted}
    class:opacity-0={!mounted}
    class:translate-y-4={!mounted}
  >
    <!-- Icon -->
    <div class="mb-8 inline-block">
      <div class="pixel-border p-4 bg-white dark:bg-slate-800">
        <svg class="w-16 h-16 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
          <!-- Pixel arrow pointing right -->
          <rect x="4" y="11" width="12" height="2" />
          <rect x="12" y="7" width="2" height="2" />
          <rect x="14" y="9" width="2" height="2" />
          <rect x="16" y="11" width="2" height="2" />
          <rect x="14" y="13" width="2" height="2" />
          <rect x="12" y="15" width="2" height="2" />
        </svg>
      </div>
    </div>

    <!-- Message -->
    <h1 class="text-2xl sm:text-3xl tracking-wide mb-4">
      ページが移動しました
    </h1>

    <div class="pixel-box bg-gray-50 dark:bg-slate-800 p-6 mb-6">
      <p class="text-gray-600 dark:text-slate-300 leading-relaxed">
        <span class="text-orange-500 font-bold">/{pageName}</span> は
        <br />
        <span class="text-orange-500 font-bold">nms.lnln.dev</span> に移動しました
      </p>
    </div>

    <!-- Buttons -->
    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onclick={goToNms}
        class="pixel-button bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 transition-colors cursor-pointer"
      >
        &gt; nms.lnln.dev へ移動
      </button>
      <button
        onclick={goToHome}
        class="pixel-button bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300 px-6 py-3 transition-colors cursor-pointer"
      >
        &lt; トップに戻る
      </button>
    </div>
  </div>
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

  .pixel-button {
    border: 3px solid #1f2937;
    box-shadow: 3px 3px 0 #1f2937;
  }

  .pixel-button:active {
    box-shadow: 1px 1px 0 #1f2937;
    transform: translate(2px, 2px);
  }

  :global(.dark) .pixel-button {
    border-color: #475569;
    box-shadow: 3px 3px 0 #475569;
  }

  :global(.dark) .pixel-button:active {
    box-shadow: 1px 1px 0 #475569;
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

