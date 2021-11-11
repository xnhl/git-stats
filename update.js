const fs = require('fs')
const _ = require('lodash')
const moment = require('moment')
const { Octokit } = require("@octokit/core")
let list = require('./list.json')
const write = (filename, data) => {fs.writeFile(`${filename}.json`, JSON.stringify(data, null, 2), (err) => {if (err) throw err})}
const updateInfo = (repo, data) => {fs.writeFile(`./stats/${repo}.json`, JSON.stringify(data, null, 2), (err) => {if (err) throw err})}
let cmd = process.argv.slice(2).map(each => each.toString())
let cmd_action = cmd[0]
let cmd_repo = cmd[1]
let token = ""
let timezone = "GMT"
let info

const makeRequest = async (account, repository, type = "repo") => {
	let octokit = new Octokit({
		auth: `${token}`,
		timeZone: timezone,
	})
	let baseURL = `GET https://api.github.com/repos/${account}/${repository}`
	try {
		const response = type == "repo" ? await octokit.request(baseURL) 
			: type == "clones" ? await octokit.request(`${baseURL}/traffic/clones`) 
			: type == "paths" ? await octokit.request(`${baseURL}/traffic/popular/paths`) 
			: type == "referrers" ? await octokit.request(`${baseURL}/traffic/popular/referrers`) 
			: type == "views" ? await octokit.request(`${baseURL}/traffic/views`) 
			: ""
		if (response.status == 200) {
			return type == "repo" ? response.data
			: type == "clones" ? response.data.clones
			: type == "paths" ? response.data
			: type == "referrers" ? response.data
			: type == "views" ? response.data.views
			: ""
		} else {
			console.log(`Error: ${account} / ${respository}`)
			return []
		}
	} catch (error) { console.log(error) }
}

const trimInfo = (info) => {
	return {
		id: info.id ? info.id : "",
		node_id: info.node_id ? info.node_id : "",
		name: info.name ? info.name : "",
		full_name: info.full_name ? info.full_name : "",
		private: info.private ? info.private : "",
		html_url: info.html_url ? info.html_url : "",
		description: info.description ? info.description : null,
		created_at: info.created_at ? info.created_at : "",
		updated_at: info.updated_at ? info.updated_at : "",
		pushed_at: info.pushed_at ? info.pushed_at : "",
		homepage: info.homepage ? info.homepage : null,
		size: info.size ? info.size : "",
		language: info.language ? info.language : "Unknown",
		visibility: info.visibility ? info.visibility : "",
		watchers: info.watchers ? info.watchers : 0,
		watchers_count: info.watchers_count ? info.watchers_count : 0,
		stargazers_count: info.stargazers_count ? info.stargazers_count : 0,
		subscribers_count: info.subscribers_count ? info.subscribers_count : 0
	}
}

const updateData = async (account, repository, cmd_repo) => {
	try {
		let new_repo = await makeRequest(account, repository, "repo")
		const new_views = await makeRequest(account, repository, "views")
		const new_clones = await makeRequest(account, repository, "clones")
		const new_ref_paths = await makeRequest(account, repository, "paths")
		const new_ref_sources = await makeRequest(account, repository, "referrers")
		if (!info.views.length) { info.views = new_views }
		if (!info.clones.length) { info.clones = new_clones }
		let calendars = makeCalendars()
		let info_new = {
			repo_info: trimInfo(new_repo),
			views: new_views !== [] ? reduceData(info.views.concat(new_views), "timestamp") : info.views,
			clones: new_clones !== [] ? reduceData(info.clones.concat(new_clones), "timestamp") : info.clones,
			referrer_paths: new_ref_paths !== [] ? reduceData(info.referrer_paths.filter(each => each !== null).concat(new_ref_paths), "path") : info.referrer_paths,
			referrer_sources: new_ref_sources !== [] ? reduceData(info.referrer_sources.filter(each => each !== null).concat(new_ref_sources), "referrer") : info.referrer_sources,
			views_full: calendars.v,
			clones_full: calendars.c
		}
		updateInfo(cmd_repo, info_new)
	} catch (error) { console.log(error) }
}

const reduceData = (data, by = "timestamp") => {
	if (by == "timestamp") {
		let unq_dates = _.uniq(data.map(each => each.timestamp))
		let mapd = unq_dates.map(e => {
			let filtered = data.filter(f => f.timestamp == e)
			let sorted = filtered.sort((a, b) => { return b.count - a.count })
			return sorted[0]
		})
		let mapd_sorted = mapd.sort((a, b) => {
			let aa = new Date(a.timestamp)
			let bb = new Date(b.timestamp)
			return bb - aa
		})
		return mapd_sorted
	} else if (by == "referrer") {
		let unq_refs = _.uniq(data.map(each => each.referrer))
		let mapd = unq_refs.map(e => {
			let filtered = data.filter(f => f.referrer == e)
			let sorted = filtered.sort((a, b) => { return b.count - a.count })
			return sorted[0]
		})
		return mapd
	} else if (by == "path") {
		let unq_refs = _.uniq(data.map(each => each.path))
		let mapd = unq_refs.map(e => {
			let filtered = data.filter(f => f.path == e)
			let sorted = filtered.sort((a, b) => { return b.count - a.count })
			return sorted[0]
		})
		return mapd
	}
}

const logClones = async () => {
	let len = list.length
	for (let i = 0; i < len; i++) {
		try {
			info = require(`./stats/${list[i].title}.json`)
			if (info.clones.length) {
				let latest_clones = info.clones[0]
				let latest_clones_date = moment(latest_clones.timestamp).format("LL")
				let latest_clones_num = latest_clones.count
				let latest_clones_unq = latest_clones.uniques
				console.log(`${list[i].title}: Latest Clones: ${latest_clones_date}: ${latest_clones_num} (${latest_clones_unq} unique)\n`)
			} else { console.log(`${list[i].title}: Latest Clones: No clones yet\n`) }
		} catch (error) { console.log(`Something went wrong...\n${error}`) }
	}
}

const mapViewsClones = (views) => {
	let months_default = [
		{
			title: "January",
			days: []
		},
		{
			title: "February",
			days: []
		},
		{
			title: "March",
			days: []
		},
		{
			title: "April",
			days: []
		},
		{
			title: "May",
			days: []
		},
		{
			title: "June",
			days: []
		},
		{
			title: "July",
			days: []
		},
		{
			title: "August",
			days: []
		},
		{
			title: "September",
			days: []
		},
		{
			title: "October",
			days: []
		},
		{
			title: "November",
			days: []
		},
		{
			title: "December",
			days: []
		}
	]
	let years = _.uniq(views.map(each => moment(new Date(each.timestamp)).year()))
	let years_filled = years.map(year => {
		let months = months_default.map(m => {
			let days = []
			let num_days = moment(new Date(`${m.title} ${year}`)).daysInMonth()
			for (let i = 1; i < (num_days + 1); i++) {
				let day = moment(new Date(`${m.title} ${i} ${year}`)).format("LL")
				let day_info = views.filter(a => {
					let day_formatted = moment(new Date(a.timestamp)).format("LL")
					return day_formatted == day ? true : false
				})
				days.push({
					day: i,
					count: day_info.length ? day_info[0].count : 0,
					uniques: day_info.length ? day_info[0].uniques : 0
				})
			}
			return {
				title: m.title,
				days
			}
		})
		return {
			year,
			months
		}
	})
	return years_filled
}

const makeCalendars = () => {
	let v = mapViewsClones(info.views)
	let c = mapViewsClones(info.clones)
	return { v, c }
}

const makeShortList = () => {
	let short_list = []
	let list_length = list.length
	for (let i = 0; i < list_length; i++) {
		try {
			info = require(`./stats/${list[i].title}.json`)
			let acct_repo = info.repo_info.full_name.split("/")
			let latest_views = info.views.length ? info.views[0] : null
			let latest_clones = info.clones.length ? info.clones[0] : null
			if (latest_views !== null) { latest_views.timestamp_formatted = moment(new Date(latest_views.timestamp)).format("LL") }
			if (latest_clones !== null) { latest_clones.timestamp_formatted = moment(new Date(latest_clones.timestamp)).format("LL") }
			short_list.push({
				title: list[i].title,
				account: acct_repo[0],
				repository: acct_repo[1],
				html_url: info.repo_info.html_url,
				description: info.repo_info.description,
				created_at: info.repo_info.created_at,
				created_at_formatted: moment(new Date(info.repo_info.created_at)).format("LL"),
				updated_at: info.repo_info.updated_at,
				updated_at_formatted: moment(new Date(info.repo_info.updated_at)).format("LL"),
				homepage: info.repo_info.homepage,
				language: info.repo_info.language,
				visibility: info.repo_info.visibility,
				watchers: info.repo_info.watchers,
				watchers_count: info.repo_info.watchers_count,
				stargazers_count: info.repo_info.stargazers_count,
				subscribers_count: info.repo_info.subscribers_count,
				latest_views,
				latest_clones
			})
		} catch (error) { console.log(error) }
	}
	write("./stats/short_list", short_list)
}

const act = async () => {
	if (cmd_action == "update") {
		try {
			info = require(`./stats/${cmd_repo}.json`)
		} catch (error) {
			info = {
				repo_info: {},
				views: [],
				clones: [],
				referrer_paths: [],
				referrer_sources: [],
				views_full: [],
				clones_full: []
			}
		}
		let { repository, account } = list.filter(each => each.title == cmd_repo)[0]
		await updateData(account, repository, cmd_repo)
	} else if (cmd_action == "short list") {
		makeShortList()
	} else if (cmd_action == "log") { await logClones() }
}

act()
