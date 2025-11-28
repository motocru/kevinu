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

<section id="home" class="section">
	<div class="section-content">
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
	</div>
</section>

<!-- Our main navigation bar. placed here to provide position for sticky -->
<div class="nav-bar">
	<Nav />
</div>

<!-- The about section -->
<section id="about" class="section">
	<div class="section-header">
		<h1 class="text-5xl">About</h1>
	</div>

	<div class="section-content pr-5">
		<div class="split-screen">
			<div class="pane">
				<p>
					A deeply passionate full stack and app developer with whom learning never stops. I have
					experience in a wide range of technologies and frameworks, and I am always looking for new
					opportunities to learn and grow. I also have experience with cloud services and
					deployment. When not coding, I enjoy playing video games, reading books, hiking,
					snowboarding and spending time with my wife and dog.
				</p>
			</div>
			<div class="pane">
				Some lorem ipsum text for all of this to test out the thing that I'm doing here.
			</div>
		</div>
	</div>
</section>
<section id="projects" class="section">
	<div class="section-header">
		<h1 class="text-5xl">Projects</h1>
	</div>
</section>
<section id="resume" class="section">
	<div class="section-header">
		<h1 class="text-5xl">Resume</h1>
	</div>
</section>
<section id="contact" class="section">
	<div class="section-header">
		<h1 class="text-5xl">Contact</h1>
	</div>
</section>

<style lang="postcss">
	.section {
		min-height: 100vh;
		width: 100%;
	}

	.section-content {
		justify-content: center;
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
		margin-left: -3rem;
		margin-right: -3rem;
	}

	.section-header {
		position: relative;
		padding-top: 5rem;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.section-header h1 {
		margin: 0;
	}
</style>
