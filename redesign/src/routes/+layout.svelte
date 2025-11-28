<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if page.url.pathname === '/'}
	<div class="layout">
		{@render children()}
	</div>
{:else}
	<div class="layout">
		{@render children()}
	</div>
{/if}

<style lang="css">
	.layout {
		padding-left: 3rem;
		padding-right: 3rem;
		overflow: visible;
	}
</style>
