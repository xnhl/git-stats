<template>
  <div id="wrapper">
		<div id="repositories">
			<nuxt-link class="repo" v-for="(item, index) in list" :key="index" :to="`/${item.title}`">
				<div class="repo-title" v-text="item.title"></div>
				<div class="repo-repository" v-text="`${item.account} / ${item.repository}`"></div>
				<div class="repo-description" v-if="item.description" v-text="item.description"></div>
				<div class="repo-dates">
					<div class="repo-date" v-text="`Created: ${item.created_at_formatted}`"></div>
					<div class="repo-date" v-text="`Updated: ${item.updated_at_formatted}`"></div>
				</div>
				<div class="repo-details">
					<div class="repo-detail" v-text="`Language: ${item.language}`"></div>
					<div class="repo-detail" v-text="`Watchers: ${item.watchers}`"></div>
					<div class="repo-detail" v-text="`Stargazers: ${item.stargazers_count}`"></div>
					<div class="repo-detail" v-text="`Subscribers: ${item.subscribers_count}`"></div>
				</div>
				<div class="repo-stats">
					<div class="repo-stat" v-if="item.latest_views !== null" v-html="`Latest Views: ${item.latest_views.timestamp_formatted}<br>${item.latest_views.count} (${item.latest_views.uniques} unique)`"></div>
					<div class="repo-stat" v-if="item.latest_views == null" v-html="`Latest Views: None yet`"></div>
					<div class="repo-stat" v-if="item.latest_clones !== null" v-html="`Latest Clones: ${item.latest_clones.timestamp_formatted}<br>${item.latest_clones.count} (${item.latest_clones.uniques} unique)`"></div>
					<div class="repo-stat" v-if="item.latest_clones == null" v-html="`Latest Clones: None yet`"></div>
				</div>
				<div class="repo-links">
					<p class="repo-link" v-html="`GitHub:<br>${item.html_url}`"></p>
					<p class="repo-link" v-if="item.homepage !== null" v-html="`Homepage:<br>${item.homepage}`"></p>
				</div>
			</nuxt-link>
		</div>
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue'
import list from '@/static/stats/short_list.json'
export default {
	components: {Chart},
	data() {
		return {
			list
		}
	}
}
</script>

<style lang="sass">
#wrapper
	@include pageWrapper
	background: var(--theme-whiteBG)
	border-radius: 0.25rem
	#repositories
		@include flexCenter
		margin: 0 auto
		border-radius: 0.25rem
		transition: none
		.repo
			flex: 1
			flex-basis: 40rem
			max-width: 50rem
			@include flexCenter
			font-size: 2rem
			line-height: 2rem
			background: var(--theme-itemWhite)
			margin: 0.5rem
			padding: 1rem
			border-radius: 0.25rem
			text-decoration: none
			box-shadow: var(--theme-boxShadow)
			@media (min-width: 40rem)
				font-size: 3rem
				line-height: 3rem
			&:hover
				box-shadow: var(--theme-boxShadowHover)
			.repo-title, .repo-repository, .repo-description, .repo-dates, .repo-date, .repo-details, .repo-detail, .repo-links, .repo-link, .repo-stats, .repo-stat
				@include flexCenter
			.repo-date, .repo-detail, .repo-link, .repo-stat
				flex: 1
				text-align: center
				padding: 0.5rem
			.repo-description, .repo-dates, .repo-details, .repo-links, .repo-stats
				width: 100%
			.repo-title
				padding: 1rem
				font-size: 2rem
				line-height: 2rem
			.repo-repository
				padding: 0.25rem
				font-size: 1.25rem
				line-height: 1.25rem
			.repo-description
				padding: 1rem
				font-size: 1.1rem
				line-height: 1.25rem
				text-indent: 0.5rem
			.repo-dates
				.repo-date
					flex-basis: 14rem
			.repo-details
				.repo-detail
					flex-basis: 8rem
			.repo-links
				.repo-link
					flex-basis: 16rem
					// word-break: break-word
			.repo-stats
				.repo-stat
					text-align: center
					flex-basis: 17rem
</style>
