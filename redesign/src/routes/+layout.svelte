<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="layout">
	{@render children()}
</div>

<style lang="css">
	.layout {
		padding-left: 16px;
		padding-right: 16px;
	}
</style>
