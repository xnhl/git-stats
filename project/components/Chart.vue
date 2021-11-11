<script>
import { Line } from 'vue-chartjs'
export default {
	name: 'Chart',
	extends: Line,
	data() {
		return {
			options: {
				responsive: true,
				maintainAspectRatio: false,
				legend: { display: false },
				scales: {
					xAxes: [
						{
							display: true,
							gridLines: {
								color: "rgba(0, 0, 0, 0.25)"
							},
							ticks: {
								padding: 3
							}
						}
					],
					yAxes: [
						{
							display: true,
							gridLines: {
								color: "rgba(0, 0, 0, 0.25)"
							},
							ticks: {
								padding: 3,
								precision: 0
							}
						}
					]
				}
			}
		}
	},
  props: { info: {} },
  mounted () {
    this.renderChart(this.info, this.options)
  }
}
</script>
