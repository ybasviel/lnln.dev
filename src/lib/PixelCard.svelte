<script lang="ts">
  import "../style/pixelBtn.css";
  interface Props {
    title: string;
    description?: string;
    href?: string;
  }
  
  let { title, description, href }: Props = $props();
  
  const isLink = !!href;
</script>

{#snippet pixelArrow()}
  <svg class="w-4 h-4 text-orange-500 shrink-0" viewBox="0 0 16 16" fill="currentColor">
    <rect x="2" y="6" width="4" height="4" />
    <rect x="6" y="4" width="4" height="4" />
    <rect x="6" y="8" width="4" height="4" />
    <rect x="10" y="2" width="4" height="4" />
    <rect x="10" y="10" width="4" height="4" />
  </svg>
{/snippet}

{#snippet pixelArrowRight()}
  <svg class="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="currentColor">
    <rect x="0" y="6" width="4" height="4" />
    <rect x="4" y="6" width="4" height="4" />
    <rect x="8" y="6" width="4" height="4" />
    <rect x="10" y="4" width="4" height="4" />
    <rect x="10" y="8" width="4" height="4" />
    <rect x="12" y="6" width="4" height="4" />
  </svg>
{/snippet}

{#snippet cardContent()}
  <div class="flex items-center gap-3 flex-1 min-w-0">
    {@render pixelArrow()}
    <div class="min-w-0">
      <span class="text-gray-800 dark:text-slate-200 {isLink ? 'group-hover:text-orange-600 dark:group-hover:text-orange-400' : ''} transition-colors">
        {title}
      </span>
      {#if description}
        <p class="text-xs text-gray-500 dark:text-slate-400 mt-1 truncate">
          {description}
        </p>
      {/if}
    </div>
  </div>
  {#if isLink}
    <span class="text-gray-400 dark:text-slate-500 group-hover:translate-x-1 transition-transform">
      {@render pixelArrowRight()}
    </span>
  {/if}
{/snippet}

{#if isLink}
  <a 
    {href}
    target="_blank" 
    rel="noopener noreferrer"
    class="pixel-btn"
  >
    {@render cardContent()}
  </a>
{:else}
  <div class="flex items-center justify-between p-4 pixel-box bg-gray-50 dark:bg-slate-800">
    {@render cardContent()}
  </div>
{/if}

<style>
  .pixel-box {
    border: 3px solid #1f2937;
    box-shadow: 3px 3px 0 #1f2937;
  }
  
  :global(.dark) .pixel-box {
    border-color: #475569;
    box-shadow: 3px 3px 0 #475569;
  }
</style>

