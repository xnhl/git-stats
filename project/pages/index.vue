<template>
  <div id="wrapper">
		<div id="repositories">
			<nuxt-link class="repo" v-for="(item, index) in list" :key="index" :to="`/${item.title}`">
				<div class="repo-title" v-text="item.title"></div>
				<div class="repo-subtitle" v-text="`${item.account} / ${item.repository}`"></div>
				<div class="repo-description" v-if="item.description" v-text="item.description"></div>
				<div class="repo-details">
					<div class="repo-detail">
						<img class="repo-detail-icon" src="/icons/align-left.svg" alt="Language">
						<p class="repo-detail-text" v-text="`Language: ${item.language}`"></p>
					</div>
					<div class="repo-detail">
						<img class="repo-detail-icon" src="/icons/eye.svg" alt="Watchers">
						<p class="repo-detail-text" v-text="`Watchers: ${item.watchers}`"></p>
					</div>
					<div class="repo-detail">
						<img class="repo-detail-icon" src="/icons/star.svg" alt="Stargazers">
						<p class="repo-detail-text" v-text="`Stargazers: ${item.stargazers_count}`"></p>
					</div>
					<div class="repo-detail">
						<img class="repo-detail-icon" src="/icons/heart.svg" alt="Subscribers">
						<p class="repo-detail-text" v-text="`Subscribers: ${item.subscribers_count}`"></p>
					</div>
				</div>
				<div class="repo-clones-views">
					<div class="repo-clones-views-item" v-if="item.latest_clones !== null">
						<img class="repo-clones-views-item-icon" src="/icons/download.svg" alt="Clones">
						<div class="repo-clones-views-item-text" v-html="`Latest Clones: ${item.latest_clones.timestamp_formatted}<br>${item.latest_clones.count} (${item.latest_clones.uniques} unique)`"></div>
					</div>
					<div class="repo-clones-views-item" v-if="item.latest_clones == null">
						<img class="repo-clones-views-item-icon" src="/icons/download.svg" alt="Clones">
						<div class="repo-clones-views-item-text" v-html="`Latest Clones: None yet`"></div>
					</div>
					<div class="repo-clones-views-item" v-if="item.latest_views !== null">
						<img class="repo-clones-views-item-icon" src="/icons/eye.svg" alt="Views">
						<div class="repo-clones-views-item-text" v-html="`Latest Views: ${item.latest_views.timestamp_formatted}<br>${item.latest_views.count} (${item.latest_views.uniques} unique)`"></div>
					</div>
					<div class="repo-clones-views-item" v-if="item.latest_views == null">
						<img class="repo-clones-views-item-icon" src="/icons/eye.svg" alt="Views">
						<div class="repo-clones-views-item-text" v-html="`Latest Views: None yet`"></div>
					</div>
				</div>
				<div class="repo-dates">
					<div class="repo-date">
						<img class="repo-date-icon" src="/icons/clock.svg" alt="Created">
						<p class="repo-date-text" v-text="`Created: ${item.created_at_formatted}`"></p>
					</div>
					<div class="repo-date">
						<img class="repo-date-icon" src="/icons/clock.svg" alt="Updated">
						<p class="repo-date-text" v-text="`Updated: ${item.updated_at_formatted}`"></p>
					</div>
				</div>
				<div class="repo-links">
					<div class="repo-link">
						<img class="repo-link-icon" src="/icons/github2.svg" alt="GitHub">
						<p class="repo-link-title">GitHub</p>
						<p class="repo-link-text" v-text="item.html_url"></p>
					</div>
					<div class="repo-link" v-if="item.homepage !== null">
						<img class="repo-link-icon" src="/icons/link.svg" alt="Homepage">
						<p class="repo-link-title">Homepage</p>
						<p class="repo-link-text" v-text="item.homepage"></p>
					</div>
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
			border-radius: 0.25rem
			margin: 0.5rem auto
			padding: 0.5rem
			max-width: 60rem
			text-decoration: none
			background: var(--theme-itemWhite)
			box-shadow: var(--theme-boxShadow)
			.repo-title
				padding: 0.5rem
				font-size: 2rem
				line-height: 2rem
				@include flexCenter
			.repo-subtitle
				text-align: center
				padding: 0.5rem
				font-size: 1.5rem
				line-height: 1.5rem
				@include flexCenter
			.repo-details
				@include flexCenter
				align-items: stretch
				justify-content: space-around
				margin: 0 auto
				.repo-detail
					flex: 1
					text-align: center
					flex-basis: 49%
					padding: 0.5rem
					@include flexCenter
					@media (max-width: 32rem)
						flex-direction: column
					@media (min-width: 50rem)
						flex-basis: 10rem
					.repo-detail-icon
						height: 1.5rem
						width: 1.5rem
						margin: 0 0.5rem
						filter: var(--theme-icon)
					.repo-detail-text
						line-height: 1.25rem
			.repo-clones-views
				@include flexCenter
				justify-content: space-around
				align-items: stretch
				.repo-clones-views-item
					flex: 1
					text-align: center
					padding: 0.5rem
					@include flexCenter
					@media (max-width: 36rem)
						flex-direction: column
					.repo-clones-views-item-icon
						height: 1.5rem
						width: 1.5rem
						margin: 0 0.5rem
						filter: var(--theme-icon)
					.repo-clones-views-item-text
						line-height: 1.25rem
			.repo-dates
				@include flexCenter
				justify-content: space-around
				align-items: stretch
				.repo-date
					flex: 1
					text-align: center
					@include flexCenter
					padding: 0.5rem
					@media (max-width: 36rem)
						flex-direction: column
					&:nth-child(2)
						.repo-date-icon
							transform: scaleX(-1)
					.repo-date-icon
						height: 1.5rem
						width: 1.5rem
						margin: 0 0.5rem
						filter: var(--theme-icon)
					.repo-date-text
						line-height: 1.25rem
			.repo-description
				@include flexCenter
				padding: 1rem
				line-height: 1.5rem
				text-indent: 0.5rem
				@media (min-width: 35rem)
					font-size: 1.25rem
			.repo-links
				@include flexCenter
				margin: 0 auto
				.repo-link
					@include flexCenter
					flex: 1
					margin: 0.5rem
					padding: 0.25rem
					text-decoration: none
					border-radius: 0.25rem
					.repo-link-icon
						width: 1.5rem
						height: 1.5rem
						margin: 0 0.5rem
						transition: transform 0.1s ease-in-out, filter 0.2s ease-in-out
						filter: var(--theme-icon)
					.repo-link-title
					.repo-link-text
						width: 100%
						@include flexCenter
						text-align: center
						padding: 0.5rem
						line-height: 1.25rem
</style>
