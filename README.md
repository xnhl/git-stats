# GitHub Repository Stats Archive
## Archive and visualize stats and information for your GitHub repositories

### Included
- Javascript and batch files which will update repository archives, copy files to the Vue/Nuxt project folder, or log statistics to the console.
- A ready-to-build Vue/Nuxt website with a page for each repository with useful information and charts which show monthly statistics for views and clones.

### Instructions
- Install dependencies (main folder and in /project too if you want to use the Vue/Nuxt website)
- Replace items in list.json with your repository information.
	- account / repository fields are self-explanatory.
	- 'title' field can be whatever you want. It will be used as the filename for the repository archive.
- Replace content of list.txt with your list of repositories (use 'title' property from list.json).
- GitHub Token: Create one, then add between quotes on line 11 of update.js.
- Time zone: Replace 'GMT' with <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones" target="_blank">your timezone</a> (Wikipedia TZ database name) in line 12 of update.js
- Update Repository Archives: update.bat
	- GitHub API response only contains stats for last 14 days so you should run update.bat more frequently than that.
- Copy Archives to Vue/Nuxt Website Folder (/project): copy.bat
- Log all latest clone information to console: log.bat
- Build website: in /project folder run `npm run generate`. Output will be in /project/dist.
