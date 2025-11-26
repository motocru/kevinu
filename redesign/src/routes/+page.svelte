<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Nav from '$lib/components/nav.svelte';

	let ready = $state(false);

	onMount(() => {
		ready = true;
	});
</script>

<section id="main-header" class="section">
	{#if ready}
		<div class="split-screen">
			<div class="pane">
				<h1 in:fly={{ y: 100, duration: 1000 }}>Kevin Urban</h1>
				<h2 in:fly={{ y: 100, duration: 1800 }}>Full Stack Developer</h2>
				<p in:fly={{ y: 100, duration: 2800 }}>
					My name is Kevin Urban and I am a full stack developer with a passion for creating
					innovative and user-friendly web applications.
				</p>
			</div>
			<div class="pane">
				<button
					in:fly={{ y: 100, duration: 600, delay: 1000 }}
					class="view-work-button"
					type="button"
					onclick={() => {
						goto('#about');
					}}>View my work <span style="font-size: 18px;">↓</span></button
				>
			</div>
		</div>
	{/if}
</section>

<div class="nav-bar">
	<Nav />
</div>

<section id="about" class="section"></section>
<section id="projects" class="section"></section>
<section id="resume" class="section"></section>
<section id="contact" class="section"></section>

<style lang="css">
	.section {
		height: 100vh;
		width: 100%;
	}

	.split-screen {
		display: grid;
		grid-template-columns: 1fr 1fr;
		height: 100%;
	}

	.pane {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.view-work-button {
		border: 1px solid #000;
		cursor: pointer;
		font-size: 16px;
		padding: 6px 28px;
		color: #f6f4f4;
		border-width: 1px;
		border-radius: 5px;
		background: #6c757d;
		position: relative;
	}

	.view-work-button:hover {
		background-color: #484b4e;
	}

	.nav-bar {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
	}
</style>
