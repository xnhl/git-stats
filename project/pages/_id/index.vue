<template>
  <div id="wrapper">
		<div class="repo-info">
			<p class="repo-info-title" v-text="title"></p>
			<p class="repo-info-subtitle" v-text="fullName"></p>
			<div class="repo-info-description" v-if="hasDescription" v-text="this.repository.repo_info.description"></div>
			<div class="repo-info-details">
				<div class="repo-info-detail">
					<img class="repo-info-detail-icon" :src="alignleft" alt="Language">
					<p class="repo-info-detail-text" v-text="`Language: ${this.repository.repo_info.language}`"></p>
				</div>
				<div class="repo-info-detail">
					<img class="repo-info-detail-icon" :src="eye" alt="Watchers">
					<p class="repo-info-detail-text" v-text="`Watchers: ${this.repository.repo_info.watchers}`"></p>
				</div>
				<div class="repo-info-detail">
					<img class="repo-info-detail-icon" :src="star" alt="Stargazers">
					<p class="repo-info-detail-text" v-text="`Stargazers: ${this.repository.repo_info.stargazers_count}`"></p>
				</div>
				<div class="repo-info-detail">
					<img class="repo-info-detail-icon" :src="heart" alt="Subscribers">
					<p class="repo-info-detail-text" v-text="`Subscribers: ${this.repository.repo_info.subscribers_count}`"></p>
				</div>
			</div>
			<div class="repo-info-clones-views">
				<div class="repo-info-clones-views-item">
					<img class="repo-info-clones-views-item-icon" :src="download" alt="Clones">
					<p class="repo-info-clones-views-item-text" v-text="`Total Clones: ${totalClones.count} (${totalClones.uniques} uniques)`"></p>
				</div>
				<div class="repo-info-clones-views-item">
					<img class="repo-info-clones-views-item-icon" :src="eye" alt="Views">
					<p class="repo-info-clones-views-item-text" v-text="`Total Views: ${totalViews.count} (${totalViews.uniques} uniques)`"></p>
				</div>
			</div>
			<div class="repo-info-dates">
				<div class="repo-info-date">
					<img class="repo-info-date-icon" :src="clock" alt="Created">
					<p class="repo-info-date-text" v-text="`Created: ${createdAt}`"></p>
				</div>
				<div class="repo-info-date">
					<img class="repo-info-date-icon" :src="clock" alt="Updated">
					<p class="repo-info-date-text" v-text="`Updated: ${updatedAt}`"></p>
				</div>
			</div>
			<div class="repo-info-links">
				<a class="repo-info-link" :href="this.repository.repo_info.html_url" target="_blank">
					<img class="repo-info-link-icon" :src="github2" alt="GitHub">
					<p class="repo-info-link-text">GitHub</p>
				</a>
				<a class="repo-info-link" :href="this.repository.repo_info.homepage" v-if="hasHomepage" target="_blank">
					<img class="repo-info-link-icon" :src="link" alt="Homepage">
					<p class="repo-info-link-text">Homepage</p>
				</a>
			</div>
		</div>
		<div class="charts" v-if="hasClones">
			<div class="chart clones" v-for="(c, index) in clonesFull" :key="`clones-${index}`">
				<p class="chart-title" v-text="`Clones: ${c.date}`"></p>
				<Chart class="chart-actual" :info="c.info" />
			</div>
		</div>
		<div class="charts-nav">
			<p class="charts-nav-item" data-which="prev" @click="changeChart">&lt;</p>
			<p class="charts-nav-item" data-which="next" @click="changeChart">&gt;</p>
		</div>
		<div class="charts" v-if="hasViews">
			<div class="chart views" v-for="(v, index) in viewsFull" :key="`views-${index}`">
				<p class="chart-title" v-text="`Views: ${v.date}`"></p>
				<Chart class="chart-actual" :info="v.info" />
			</div>
		</div>
		<div id="navigate" v-if="showPrevNext">
			<nuxt-link id="prev" :to="`/${prevNext.prev.path}`">
				<img id="prev-icon" :src="arrow" alt="previous repository">
				<p id="prev-text" v-text="prevNext.prev.title"></p>
			</nuxt-link>
			<nuxt-link id="next" :to="`/${prevNext.next.path}`">
				<p id="next-text" v-text="prevNext.next.title"></p>
				<img id="next-icon" :src="arrow" alt="next repository">
			</nuxt-link>
		</div>
  </div>
</template>

<script>
import list from '@/static/stats/short_list.json'
export default {
	async asyncData({ params, redirect, $axios }) {
		try {
			const response = await $axios.$get(`/stats/${params.id}.json`)
			return {
				repository: response,
				title: params.id,
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
			}
		} catch (e) { redirect('/') }
	},
	methods: {
		changeChart(e) {
			let clones = document.getElementsByClassName("clones")
			let clones_len = clones.length
			for (let i = 0; i < clones_len; i++) {
				if (!clones[i].classList.contains("hide")) {
					if (e.target.dataset.which == "prev") {
						if (clones[i-1] !== undefined) {
							clones[i-1].classList.remove("hide")
						} else clones[clones_len-1].classList.remove("hide")
						clones[i].classList.add("hide")
					} else if (e.target.dataset.which == "next") {
						if (clones[i+1] !== undefined) {
							clones[i+1].classList.remove("hide")
						} else clones[0].classList.remove("hide")
						clones[i].classList.add("hide")
					}
					break
				}
			}
			let views = document.getElementsByClassName("views")
			let views_len = views.length
			for (let a = 0; a < views_len; a++) {
				if (!views[a].classList.contains("hide")) {
					if (e.target.dataset.which == "prev") {
						if (views[a-1] !== undefined) {
							views[a-1].classList.remove("hide")
						} else views[views_len-1].classList.remove("hide")
						views[a].classList.add("hide")
					} else if (e.target.dataset.which == "next") {
						if (views[a+1] !== undefined) {
							views[a+1].classList.remove("hide")
						} else views[0].classList.remove("hide")
						views[a].classList.add("hide")
					}
					break
				}
			}
		}
	},
	computed: {
		showPrevNext() { return this.list.length > 1 },
		hasViews() { return this.repository.views.length },
		hasClones() { return this.repository.clones.length },
		hasHomepage() { return this.repository.repo_info.homepage !== null },
		hasDescription() { return this.repository.repo_info.description !== null },
		fullName() { return this.repository.repo_info.full_name.replace("/", " / ") },
		pushedAt() { return this.$moment(new Date(this.repository.repo_info.pushed_at)).format("LL") },
		createdAt() { return this.$moment(new Date(this.repository.repo_info.created_at)).format("LL") },
		updatedAt() { return this.$moment(new Date(this.repository.repo_info.updated_at)).format("LL") },
		prevNext() {
			let prev, next
			let this_repo = this.repository.repo_info.name
			let list_length = this.list.length
			for (let i = 0; i < list_length; i++) {
				let current_repo = list[i].title
				if (current_repo == this_repo) {
					prev = list[i-1] !== undefined ? {
						path: list[i-1].title,
						title: `${list[i-1].account} / ${list[i-1].title}`
					} : {
						path: list[list_length-1].title,
						title: `${list[list_length-1].account} / ${list[list_length-1].title}`
					}
					next = list[i+1] !== undefined ? {
						path: list[i+1].title,
						title: `${list[i+1].account} / ${list[i+1].title}`
					} : {
						path: list[0].title,
						title: `${list[0].account} / ${list[0].title}`
					}
				}
			}
			return {
				prev,
				next
			}
		},
		totalClones() {
			let count = 0
			let uniques = 0
			let reduced_count = this.repository.clones.reduce((prev, current) => prev + parseInt(current.count), count)
			let reduced_uniques = this.repository.clones.reduce((prev, current) => prev + parseInt(current.uniques), uniques)
			return {
				count: reduced_count,
				uniques: reduced_uniques
			}
		},
		totalViews() {
			let count = 0
			let uniques = 0
			let reduced_count = this.repository.views.reduce((prev, current) => prev + parseInt(current.count), count)
			let reduced_uniques = this.repository.views.reduce((prev, current) => prev + parseInt(current.uniques), uniques)
			return {
				count: reduced_count,
				uniques: reduced_uniques
			}
		},
		clonesFull() {
			let c = this.repository.clones_full
			let years_mapped = c.map(each => {
				let months_mapped = each.months.map(m => {
					return {
						year: each.year,
						...m
					}
				})
				return months_mapped
			}).flat()
			let final = years_mapped.map(each => {
				let labels = each.days.map(d => d.day)
				let num = each.days.map(d => d.count)
				let unq = each.days.map(d => d.uniques)
				return {
					date: `${each.title} ${each.year}`,
					info: {
						labels,
						datasets: [
							{
								data: num,
								borderColor: 'rgba(0, 150, 0, 1)',
								lineTension: 0,
								fill: false
							},
							{
								data: unq,
								borderColor: 'rgba(0, 0, 150, 1)',
								lineTension: 0,
								fill: false
							}
						]
					}
				}
			})
			return final
		},
		viewsFull() {
			let v = this.repository.views_full
			let years_mapped = v.map(each => {
				let months_mapped = each.months.map(m => {
					return {
						year: each.year,
						...m
					}
				})
				return months_mapped
			}).flat()
			let final = years_mapped.map(each => {
				let labels = each.days.map(d => d.day)
				let num = each.days.map(d => d.count)
				let unq = each.days.map(d => d.uniques)
				return {
					date: `${each.title} ${each.year}`,
					info: {
						labels,
						datasets: [
							{
								data: num,
								borderColor: 'rgba(0, 150, 0, 1)',
								lineTension: 0,
								fill: false
							},
							{
								data: unq,
								borderColor: 'rgba(0, 0, 150, 1)',
								lineTension: 0,
								fill: false
							}
						]
					}
				}
			})
			return final
		}
	},
	mounted() {
		let views_elements = document.getElementsByClassName("views")
		let clones_elements = document.getElementsByClassName("clones")
		let views_length = views_elements.length
		let clones_length = clones_elements.length
		if (views_length) { for (let i = 0; i < views_length; i++) { views_elements[i].classList.add("hide") } }
		if (clones_length) { for (let a = 0; a < clones_length; a++) { clones_elements[a].classList.add("hide") } }
		let current_month = `${this.$moment().month()}`
		if (this.repository.clones.length && clones_length) { clones_elements[current_month].classList.remove("hide") }
		if (this.repository.views.length && views_length) { views_elements[current_month].classList.remove("hide") }
	}
}
</script>

<style lang="sass">
#wrapper
	@include pageWrapper
	background: var(--theme-whiteBG)
	border-radius: 0.25rem
	.repo-info
		border-radius: 0.25rem
		margin: 0.5rem auto
		padding: 0.5rem
		max-width: 60rem
		background: var(--theme-itemWhite)
		box-shadow: var(--theme-boxShadow)
		.repo-info-title
			padding: 0.5rem
			font-size: 2rem
			line-height: 2rem
			@include flexCenter
		.repo-info-subtitle
			text-align: center
			padding: 0.5rem
			font-size: 1.5rem
			line-height: 1.5rem
			@include flexCenter
		.repo-info-details
			@include flexCenter
			align-items: stretch
			justify-content: space-around
			margin: 0 auto
			.repo-info-detail
				flex: 1
				text-align: center
				flex-basis: 49%
				padding: 0.5rem
				@include flexCenter
				@media (max-width: 32rem)
					flex-direction: column
				@media (min-width: 50rem)
					flex-basis: 10rem
				.repo-info-detail-icon
					height: 1.5rem
					width: 1.5rem
					margin: 0 0.5rem
					filter: var(--theme-icon)
				.repo-info-detail-text
					line-height: 1.25rem
		.repo-info-clones-views
			@include flexCenter
			justify-content: space-around
			align-items: stretch
			.repo-info-clones-views-item
				flex: 1
				text-align: center
				padding: 0.5rem
				@include flexCenter
				@media (max-width: 36rem)
					flex-direction: column
				.repo-info-clones-views-item-icon
					height: 1.5rem
					width: 1.5rem
					margin: 0 0.5rem
					filter: var(--theme-icon)
				.repo-info-clones-views-item-text
					line-height: 1.25rem
		.repo-info-dates
			@include flexCenter
			justify-content: space-around
			align-items: stretch
			.repo-info-date
				flex: 1
				text-align: center
				@include flexCenter
				padding: 0.5rem
				@media (max-width: 36rem)
					flex-direction: column
				&:nth-child(2)
					.repo-info-date-icon
						transform: scaleX(-1)
				.repo-info-date-icon
					height: 1.5rem
					width: 1.5rem
					margin: 0 0.5rem
					filter: var(--theme-icon)
				.repo-info-date-text
					line-height: 1.25rem
		.repo-info-description
			@include flexCenter
			padding: 1rem
			line-height: 1.5rem
			text-indent: 0.5rem
			@media (min-width: 35rem)
				font-size: 1.25rem
		.repo-info-links
			@include flexCenter
			margin: 0 auto
			.repo-info-link
				@include flexCenter
				flex: 1
				max-width: 15rem
				margin: 0.5rem
				padding: 0.25rem
				text-decoration: none
				border-radius: 0.25rem
				box-shadow: var(--theme-boxShadow)
				&:hover
					.repo-info-link-icon
						transform: scale(1.25)
				.repo-info-link-icon
					width: 1.5rem
					height: 1.5rem
					margin: 0 0.5rem
					transition: transform 0.1s ease-in-out, filter 0.2s ease-in-out
					filter: var(--theme-icon)
				.repo-info-link-text
					padding: 0.5rem
					line-height: 1.25rem
	.charts
		background: var(--theme-whiteBG)
		border-radius: 0.25rem
		padding: 0.5rem
		.chart
			background: var(--theme-itemWhite)
			animation: fadeIn 0.2s ease-in-out
			border-radius: 0.25rem
			box-shadow: var(--theme-boxShadow)
			.chart-title
				padding: 1rem
				text-align: center
				font-size: 1.25rem
				line-height: 1.25rem
			.chart-actual
				padding: 0.5rem
				height: 25rem
		&.clones
		&.views
	.charts-nav
		@include flexCenter
		padding: 0.5rem
		max-width: 10rem
		margin: 1rem auto
		border-radius: 0.25rem
		.charts-nav-item
			@include flexCenter
			cursor: pointer
			padding: 1rem
			margin: 0 0.5rem
			font-size: 2rem
			border-radius: 0.25rem
			box-shadow: var(--theme-boxShadow)
			&:hover
				box-shadow: var(--theme-boxShadowHover)
	#navigate
		margin-top: 2rem
		padding: 0.5rem
		@include flexCenter
		justify-content: space-around
		#prev, #next
			@include flexCenter
			padding: 1rem
			margin: 0.25rem
			text-decoration: none
			border-radius: 0.25rem
			background: var(--theme-itemWhite)
			box-shadow: var(--theme-boxShadow)
			&:hover
				box-shadow: var(--theme-boxShadowHover)
				#prev-icon
					transform: scale(1.25)
				#next-icon
					transform: scale(1.25) rotate(180deg)
			#prev-text, #next-text
				flex: 1
			#prev-icon, #next-icon
				width: 1.25rem
				height: 1.25rem
				filter: var(--theme-icon)
				transition: all 0.1s ease-in-out
			#prev-icon
				margin-right: 1rem
			#next-icon
				margin-left: 1rem
				transform: rotate(180deg)
</style>
