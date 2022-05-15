<template>
  <div id="wrapper">
		<div id="repositories">
			<nuxt-link class="repo" v-for="(item, index) in list" :key="index" :to="`/${item.title}`">
				<div class="repo-title" v-text="item.title"></div>
				<div class="repo-subtitle" v-text="`${item.account} / ${item.repository}`"></div>
				<div class="repo-description" v-if="item.description" v-text="item.description"></div>
				<div class="repo-details">
					<div class="repo-detail">
						<img class="repo-detail-icon" :src="alignleft" alt="Language">
						<p class="repo-detail-text" v-text="`Language: ${item.language}`"></p>
					</div>
					<div class="repo-detail">
						<img class="repo-detail-icon" :src="eye" alt="Watchers">
						<p class="repo-detail-text" v-text="`Watchers: ${item.watchers}`"></p>
					</div>
					<div class="repo-detail">
						<img class="repo-detail-icon" :src="star" alt="Stargazers">
						<p class="repo-detail-text" v-text="`Stargazers: ${item.stargazers_count}`"></p>
					</div>
					<div class="repo-detail">
						<img class="repo-detail-icon" :src="heart" alt="Subscribers">
						<p class="repo-detail-text" v-text="`Subscribers: ${item.subscribers_count}`"></p>
					</div>
				</div>
				<div class="repo-clones-views">
					<div class="repo-clones-views-item" v-if="item.latest_clones !== null">
						<img class="repo-clones-views-item-icon" :src="download" alt="Clones">
						<div class="repo-clones-views-item-text" v-html="`Latest Clones: ${item.latest_clones.timestamp_formatted}<br>${item.latest_clones.count} (${item.latest_clones.uniques} unique)`"></div>
					</div>
					<div class="repo-clones-views-item" v-if="item.latest_clones == null">
						<img class="repo-clones-views-item-icon" :src="download" alt="Clones">
						<div class="repo-clones-views-item-text" v-html="`Latest Clones: None yet`"></div>
					</div>
					<div class="repo-clones-views-item" v-if="item.latest_views !== null">
						<img class="repo-clones-views-item-icon" :src="eye" alt="Views">
						<div class="repo-clones-views-item-text" v-html="`Latest Views: ${item.latest_views.timestamp_formatted}<br>${item.latest_views.count} (${item.latest_views.uniques} unique)`"></div>
					</div>
					<div class="repo-clones-views-item" v-if="item.latest_views == null">
						<img class="repo-clones-views-item-icon" :src="eye" alt="Views">
						<div class="repo-clones-views-item-text" v-html="`Latest Views: None yet`"></div>
					</div>
				</div>
				<div class="repo-dates">
					<div class="repo-date">
						<img class="repo-date-icon" :src="clock" alt="Created">
						<p class="repo-date-text" v-text="`Created: ${item.created_at_formatted}`"></p>
					</div>
					<div class="repo-date">
						<img class="repo-date-icon" :src="clock" alt="Updated">
						<p class="repo-date-text" v-text="`Updated: ${item.updated_at_formatted}`"></p>
					</div>
				</div>
				<div class="repo-links">
					<div class="repo-link">
						<img class="repo-link-icon" :src="github2" alt="GitHub">
						<p class="repo-link-title">GitHub</p>
						<p class="repo-link-text" v-text="item.html_url"></p>
					</div>
					<div class="repo-link" v-if="item.homepage !== null">
						<img class="repo-link-icon" :src="link" alt="Homepage">
						<p class="repo-link-title">Homepage</p>
						<p class="repo-link-text" v-text="item.homepage"></p>
					</div>
				</div>
			</nuxt-link>
		</div>
  </div>
</template>

<script>
import list from '@/static/stats/short_list.json'
export default {
	data: () => ({
		list,
		alignleft: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItYWxpZ24tbGVmdCI+PGxpbmUgeDE9IjE3IiB5MT0iMTAiIHgyPSIzIiB5Mj0iMTAiPjwvbGluZT48bGluZSB4MT0iMjEiIHkxPSI2IiB4Mj0iMyIgeTI9IjYiPjwvbGluZT48bGluZSB4MT0iMjEiIHkxPSIxNCIgeDI9IjMiIHkyPSIxNCI+PC9saW5lPjxsaW5lIHgxPSIxNyIgeTE9IjE4IiB4Mj0iMyIgeTI9IjE4Ij48L2xpbmU+PC9zdmc+",
		eye: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItZXllIj48cGF0aCBkPSJNMSAxMnM0LTggMTEtOCAxMSA4IDExIDgtNCA4LTExIDgtMTEtOC0xMS04eiI+PC9wYXRoPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiPjwvY2lyY2xlPjwvc3ZnPg==",
		star: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItc3RhciI+PHBvbHlnb24gcG9pbnRzPSIxMiAyIDE1LjA5IDguMjYgMjIgOS4yNyAxNyAxNC4xNCAxOC4xOCAyMS4wMiAxMiAxNy43NyA1LjgyIDIxLjAyIDcgMTQuMTQgMiA5LjI3IDguOTEgOC4yNiAxMiAyIj48L3BvbHlnb24+PC9zdmc+",
		heart: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItaGVhcnQiPjxwYXRoIGQ9Ik0yMC44NCA0LjYxYTUuNSA1LjUgMCAwIDAtNy43OCAwTDEyIDUuNjdsLTEuMDYtMS4wNmE1LjUgNS41IDAgMCAwLTcuNzggNy43OGwxLjA2IDEuMDZMMTIgMjEuMjNsNy43OC03Ljc4IDEuMDYtMS4wNmE1LjUgNS41IDAgMCAwIDAtNy43OHoiPjwvcGF0aD48L3N2Zz4=",
		download: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItZG93bmxvYWQiPjxwYXRoIGQ9Ik0yMSAxNXY0YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0ydi00Ij48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz0iNyAxMCAxMiAxNSAxNyAxMCI+PC9wb2x5bGluZT48bGluZSB4MT0iMTIiIHkxPSIxNSIgeDI9IjEyIiB5Mj0iMyI+PC9saW5lPjwvc3ZnPg==",
		clock: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItY2xvY2siPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIj48L2NpcmNsZT48cG9seWxpbmUgcG9pbnRzPSIxMiA2IDEyIDEyIDE2IDE0Ij48L3BvbHlsaW5lPjwvc3ZnPg==",
		github2: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItZ2l0aHViIj48cGF0aCBkPSJNOSAxOWMtNSAxLjUtNS0yLjUtNy0zbTE0IDZ2LTMuODdhMy4zNyAzLjM3IDAgMCAwLS45NC0yLjYxYzMuMTQtLjM1IDYuNDQtMS41NCA2LjQ0LTdBNS40NCA1LjQ0IDAgMCAwIDIwIDQuNzcgNS4wNyA1LjA3IDAgMCAwIDE5LjkxIDFTMTguNzMuNjUgMTYgMi40OGExMy4zOCAxMy4zOCAwIDAgMC03IDBDNi4yNy42NSA1LjA5IDEgNS4wOSAxQTUuMDcgNS4wNyAwIDAgMCA1IDQuNzdhNS40NCA1LjQ0IDAgMCAwLTEuNSAzLjc4YzAgNS40MiAzLjMgNi42MSA2LjQ0IDdBMy4zNyAzLjM3IDAgMCAwIDkgMTguMTNWMjIiPjwvcGF0aD48L3N2Zz4=",
		link: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItbGluayI+PHBhdGggZD0iTTEwIDEzYTUgNSAwIDAgMCA3LjU0LjU0bDMtM2E1IDUgMCAwIDAtNy4wNy03LjA3bC0xLjcyIDEuNzEiPjwvcGF0aD48cGF0aCBkPSJNMTQgMTFhNSA1IDAgMCAwLTcuNTQtLjU0bC0zIDNhNSA1IDAgMCAwIDcuMDcgNy4wN2wxLjcxLTEuNzEiPjwvcGF0aD48L3N2Zz4=",
		arrow: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSI0OTMuNTc4cHgiIGhlaWdodD0iNDkzLjU3OHB4IiB2aWV3Qm94PSIwIDAgNDkzLjU3OCA0OTMuNTc4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA0OTMuNTc4IDQ5My41NzgiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTQ4Ny4yNjcsMjI1Ljk4MWMwLTE3LjM2NS0xMy45OTktMzEuNTE4LTMxLjUxOC0zMS41MThIMTk0LjUwMUwzMDUuMzUsODMuNjE1YzEyLjI0LTEyLjI0LDEyLjI0LTMyLjIwNywwLTQ0LjY3Ng0KCQlMMjc1LjU5Miw5LjE4Yy0xMi4yNC0xMi4yNC0zMi4yMDctMTIuMjQtNDQuNjc2LDBMMTUuNTY4LDIyNC41MjdjLTYuMTIsNi4xMi05LjI1NiwxNC4xNTMtOS4yNTYsMjIuMjYyDQoJCWMwLDguMDMxLDMuMTM2LDE2LjE0Myw5LjI1NiwyMi4yNjJMMjMwLjkxNiw0ODQuNGMxMi4yNCwxMi4yMzcsMzIuMjA3LDEyLjIzNyw0NC42NzYsMGwyOS43NTgtMjkuNzYxDQoJCWMxMi4yNC0xMi4yMzgsMTIuMjQtMzIuMjA3LDAtNDQuNjc2TDE5NC41MDEsMjk5LjQ5OGgyNjEuMDk0YzE3LjM2NiwwLDMxLjUyMS0xNC4xNTMsMzEuNTIxLTMxLjUyTDQ4Ny4yNjcsMjI1Ljk4MXoiLz4NCjwvZz4NCjwvc3ZnPg0K"
	})
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
