<script lang="ts">
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-routing';
  import HomePage from './lib/HomePage.svelte';
  import RedirectPage from './lib/RedirectPage.svelte';
  import { initPixelBurst } from './lib/pixelBurst';
  
  onMount(() => {
    // Apply dark mode based on system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = (e: MediaQueryList | MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    updateTheme(mediaQuery);
    mediaQuery.addEventListener('change', updateTheme);
    
    // ピクセルバーストエフェクトを初期化
    const cleanupPixelBurst = initPixelBurst({
      particleCount: 10,
      particleSize: 10,
      distance: 50,
      burstDuration: 250
    });
    
    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
      cleanupPixelBurst();
    };
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet">
  <title>りんりん</title>
	<meta property="og:url" content="https://lnln.dev" />
	<meta property="og:title" content="りんりん" />
	<meta property="og:description" content="りんりんの個人ページ" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<Router>
  <Route path="/works">
    <RedirectPage pageName="works" />
  </Route>
  <Route path="/works/*">
    <RedirectPage pageName="works" />
  </Route>
  <Route path="/blog">
    <RedirectPage pageName="blog" />
  </Route>
  <Route path="/blog/*">
    <RedirectPage pageName="blog" />
  </Route>
  <Route path="/*">
    <HomePage />
  </Route>
</Router>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
