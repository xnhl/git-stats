<template>
  <div id="wrapper">
		<div class="repo-info">
			<p class="repo-info-title" v-text="title"></p>
			<p class="repo-info-subtitle" v-text="this.repository.repo_info.full_name"></p>
			<div class="repo-info-description" v-if="hasDescription" v-text="this.repository.repo_info.description"></div>
			<div class="repo-info-details">
				<p class="repo-info-detail" v-text="`Language: ${this.repository.repo_info.language}`"></p>
				<p class="repo-info-detail" v-text="`Watchers: ${this.repository.repo_info.watchers}`"></p>
				<p class="repo-info-detail" v-text="`Stargazers: ${this.repository.repo_info.stargazers_count}`"></p>
				<p class="repo-info-detail" v-text="`Subscribers: ${this.repository.repo_info.subscribers_count}`"></p>
				<p class="repo-info-detail" v-html="`Total Clones:<br>${totalClones.count} (${totalClones.uniques} uniques)`"></p>
				<p class="repo-info-detail" v-html="`Total Views:<br>${totalViews.count} (${totalViews.uniques} uniques)`"></p>
			</div>
			<div class="repo-info-dates">
				<p class="repo-info-date" v-text="`Created: ${createdAt}`"></p>
				<p class="repo-info-date" v-text="`Updated: ${updatedAt}`"></p>
			</div>
			<div class="repo-info-links">
				<a class="repo-info-link" :href="this.repository.repo_info.html_url" target="_blank">
					<img class="repo-info-link-icon" src="/icons/github.svg" alt="GitHub">
					<p class="repo-info-link-text">GitHub</p>
				</a>
				<a class="repo-info-link" :href="this.repository.repo_info.homepage" v-if="hasHomepage" target="_blank">
					<img class="repo-info-link-icon" src="/icons/link.svg" alt="Homepage">
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
				<img id="prev-icon" src="/icons/arrow.svg" alt="previous repository">
				<p id="prev-text" v-text="prevNext.prev.title"></p>
			</nuxt-link>
			<nuxt-link id="next" :to="`/${prevNext.next.path}`">
				<p id="next-text" v-text="prevNext.next.title"></p>
				<img id="next-icon" src="/icons/arrow.svg" alt="next repository">
			</nuxt-link>
		</div>
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue'
import moment from 'moment'
import list from '@/static/stats/short_list.json'
export default {
	components: {Chart},
	async asyncData({ params, redirect, $axios }) {
		try {
			const response = await $axios.$get(`/stats/${params.id}.json`)
			return {
				repository: response,
				title: params.id,
				list
			}
		} catch (e) { redirect('/') }
	},
	methods: {
		changeChart: function(e) {
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
		hasClones: function() { return this.repository.clones.length },
		hasViews: function() { return this.repository.views.length },
		hasHomepage: function() { return this.repository.repo_info.homepage !== null },
		hasDescription: function() { return this.repository.repo_info.description !== null },
		showPrevNext: function() { return this.list.length > 1 },
		createdAt: function() { return moment(new Date(this.repository.repo_info.created_at)).format("LL") },
		updatedAt: function() { return moment(new Date(this.repository.repo_info.updated_at)).format("LL") },
		pushedAt: function() { return moment(new Date(this.repository.repo_info.pushed_at)).format("LL") },
		prevNext: function() {
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
		totalClones: function() {
			let count = 0
			let uniques = 0
			let reduced_count = this.repository.clones.reduce((prev, current) => prev + parseInt(current.count), count)
			let reduced_uniques = this.repository.clones.reduce((prev, current) => prev + parseInt(current.uniques), uniques)
			return {
				count: reduced_count,
				uniques: reduced_uniques
			}
		},
		totalViews: function() {
			let count = 0
			let uniques = 0
			let reduced_count = this.repository.views.reduce((prev, current) => prev + parseInt(current.count), count)
			let reduced_uniques = this.repository.views.reduce((prev, current) => prev + parseInt(current.uniques), uniques)
			return {
				count: reduced_count,
				uniques: reduced_uniques
			}
		},
		clonesFull: function() {
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
		viewsFull: function() {
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
		let current_month = `${moment().month()}`
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
		max-width: 50rem
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
			justify-content: space-around
			max-width: 40rem
			margin: 0 auto
			.repo-info-detail
				flex: 1
				text-align: center
				flex-basis: 10rem
				padding: 0.5rem
				@include flexCenter
		.repo-info-dates
			@include flexCenter
			justify-content: space-around
			.repo-info-date
				padding: 0.5rem
		.repo-info-description
			@include flexCenter
			padding: 1rem
			text-indent: 0.5rem
			font-size: 1.25rem
			line-height: 1.5rem
		.repo-info-links
			@include flexCenter
			max-width: 23rem
			margin: 0 auto
			.repo-info-link
				@include flexCenter
				justify-content: space-around
				flex-basis: 10rem
				margin: 0.5rem
				padding: 0.25rem
				text-decoration: none
				border-radius: 0.25rem
				box-shadow: var(--theme-boxShadow)
				&:hover
					.repo-info-link-icon
						transform: scale(1.25)
				.repo-info-link-icon
					width: 2rem
					height: 2rem
					margin: 0.5rem
					transition: all 0.1s ease-in-out
					filter: var(--theme-icon)
				.repo-info-link-text
					padding: 0.5rem
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
