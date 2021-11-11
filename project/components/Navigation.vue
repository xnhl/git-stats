<template>
	<div id="nav-wrapper">
		<div id="section-one" class="nav-section">
			<nuxt-link id="name" to="/">Git Stats</nuxt-link>
		</div>
		<div id="section-two" class="nav-section">
			<div class="theme-icon-wrapper" @click="toggleTheme">
				<img class="theme-icon" src="/icons/sun.svg">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Navigation',
	data () {
		return {
			scroll_old: 0,
			scroll_new: 0
		}
	},
	methods: {
		toggleTheme: function() { this.$emit("toggle-theme") },
		handleScroll: function() {
			let y = window.scrollY
			this.scroll_new = y
			let nav_wrapper = document.getElementById("nav-wrapper")
			if (this.scroll_new > this.scroll_old) {
				nav_wrapper.classList.add("nav-hidden")
				this.scroll_old = y
			} else if (this.scroll_new < this.scroll_old) {
				nav_wrapper.classList.remove("nav-hidden")
				this.scroll_old = y
			}
		}
	},
	mounted() { window.addEventListener('scroll', this.handleScroll) }
}
</script>

<style lang="sass">
#nav-wrapper
	position: fixed
	top: 0
	left: 0
	right: 0
	margin: 0 auto
	width: 100%
	z-index: 3
	max-width: 90rem
	@include flexCenter
	justify-content: flex-end
	background: var(--theme-itemWhite)
	border-radius: 0 0 0.25rem 0.25rem
	box-shadow: 0 0 0.5rem 0.125rem rgba(black, 0.1)
	&.nav-hidden
		top: -3rem
	.nav-section
		@include flexCenter
		&#section-one
			width: auto
			justify-content: flex-start
		&#section-two
			flex: 1
			cursor: pointer
			justify-content: flex-end
		#name
			padding: 0.33rem
			cursor: pointer
			text-decoration: none
		.theme-icon-wrapper
			@include flexCenter
			.theme-icon
				margin-right: 0.5rem
				padding: 0.33rem
				cursor: pointer
				height: 1.25rem
				width: 1.25rem
				box-sizing: content-box
				filter: var(--theme-icon)
				@media (max-width: 40em)
					margin-right: 0
</style>
