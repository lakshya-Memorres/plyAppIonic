import { Component, ViewChild, Input } from '@angular/core';
import { Chart, ChartConfiguration, ChartElementsOptions } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';
import { CommonActionsService } from '../../services/common-actions.service';

interface ChartElementsOptionsExtended extends ChartElementsOptions {
	Rectangle: {
		extend: any;
	};
}

interface ChartControllers {
	bar:
		| {
				extend: any;
		  }
		| any;
}

@Component({
	selector: 'app-workout-chart',
	templateUrl: 'workout-chart.html',
	styleUrls: ['workout-chart.scss'],
})
export class WorkoutChartComponent {
	public bars: any;
	public categories = [];
	public colorArray: Array<string>;
	public currentDate = new Date();
	public currentDateTimeStampTime = new Date().getTime();
	public loading: boolean = true;
	public noWorkoutDataRecorderd: boolean = false;
	public selectedCategory;
	public workouts;
	public workoutsFormatted = [];
	public selectOption: string = 'all';

	@ViewChild('barChart') barChart;

	constructor(
		private commonActions: CommonActionsService,
		private api: ApiService
	) {}

	public async ngOnInit(): Promise<void> {
		await this.getWorkoutCategories();
		await this.getChartWorkouts();
	}

	public async getWorkoutCategories() {
		try {
			const response = await this.api.getWorkoutCategories().toPromise();
			this.categories = this.buildTopLevelCategories(response.categories);
			this.selectedCategory = this.categories[this.categories.length - 1];
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		}
	}

	public buildTopLevelCategories(allCategories) {
		let categoryList = [];
		let currentValue = null;
		for (let i = 0; i < allCategories.length; i++) {
			if (allCategories[i].parent_id == null) {
				currentValue = this.buildCategory(
					allCategories[i].name,
					allCategories[i].id
				);
				categoryList.push(currentValue);
			}
		}
		categoryList.push({
			name: 'All',
			id: 0,
		});
		return categoryList;
	}

	private buildCategory(categoryName, category_id) {
		const item = {
			name: categoryName,
			id: category_id,
		};
		return item;
	}

	// public async getRecentWorkouts() {
	// 	try {
	// 		const response = await this.api
	// 			.getWorkoutHistoryRecent()
	// 			.toPromise();
	// 		this.workouts = response.history;
	// 	} catch (error) {
	// 		this.commonActions.showErrorResponseAlert(error);
	// 	} finally {
	// 		this.formatWorkoutData(this.workouts);
	// 	}
	// }

	// public formatWorkoutData(workouts) {
	// 	let data = [];
	// 	let workoutsFormatted = [];
	// 	workoutsFormatted = Object.values(workouts);
	// 	for (let i = 0; i < workoutsFormatted.length; i++) {
	// 		for (let x = 0; x < workoutsFormatted[i].length; x++) {
	// 			let workout = this.buildWorkoutItem(workoutsFormatted[i][x]);
	// 			data.push(workout);
	// 		}
	// 	}
	// 	this.workoutsFormatted = data;
	// 	this.loading = false;
	// 	this.showActivity(this.selectedCategory);
	// }

	// private buildWorkoutItem(data) {
	// 	const workout = {
	// 		duration: data.workout.duration_in_mins,
	// 		name: data.workout.name,
	// 		category: data.workout.top_level_category.name,
	// 		date: data.workout_finished,
	// 	};
	// 	return workout;
	// }

	public async getChartWorkouts() {
		try {
			const response = await this.api.getGraphData().toPromise();
			this.workouts = response.workouts.reverse();
		} catch (error) {
			this.commonActions.showErrorResponseAlert(error);
		} finally {
			this.loading = false;
			this.showActivity(this.selectedCategory);
		}
	}

	public async showActivity(selectedCategory) {
		this.selectedCategory = selectedCategory.name;
		this.colorArray = Array(30).fill('#32383a');
		let graphData = await this.buildGraphData(selectedCategory.name);

		if (graphData.values.length != 0) {
			let root = this;
			setTimeout(function () {
				root.createBarChart(graphData);
			}, 100);
		}
	}

	public async buildGraphData(category) {
		let data = {
			values: [],
			dates: [],
			labels: [],
		};

		for (let i = 0; i < this.workouts.length; i++) {
			if (
				this.workouts[i].category.name === category ||
				category === 'All'
			) {
				let dateFormatted = this.commonActions.formatDate(
					this.workouts[i].finished_at
				);
				let timeFormatted = this.commonActions.formatTime(
					this.workouts[i].finished_at
				);

				let workoutDuration = await this.commonActions.convertSecsToMins(this.workouts[i].duration_in_secs);

				data.values.push(workoutDuration);
				data.dates.push(dateFormatted + ' ' + timeFormatted);
				data.labels.push(this.workouts[i].name);
			}
		}

		data.values.length != 0
			? (this.noWorkoutDataRecorderd = false)
			: (this.noWorkoutDataRecorderd = true);

		return data;
	}

	public calculateWorkoutInMinutes(value) {
		let minutes = this.commonActions.calculateWorkoutDurationMins(value);
		return minutes;
	}

	public createBarChart(graphData) {
		this.chartConfig();
		this.bars = new Chart(this.barChart.nativeElement, {
			type: 'bar',
			legend: {
				display: false,
			},
			axisY: {
				labelFontFamily: 'tahoma',
			},
			data: {
				//labels: dataSets.labels,
				labels: [
					'Last 30 Days',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'',
					'Today',
				],
				datasets: [
					{
						data: graphData.values,
						dates: graphData.dates,
						workoutNames: graphData.labels,
						backgroundColor: this.colorArray,
						barThickness: 4,
						color: '#32383a',
						fontColor: '#32383a',
						fontFamily: 'Poppins',
						fontSize: 8,
						fontStyle: '500',
					},
				],
			},
			options: {
				defaultFontFamily: 'Poppins',
				aspectRatio: 339 / 254,
				legend: {
					display: false,
				},
				tooltips: {
					enabled: true,
					custom: function (tooltip) {
						if (!tooltip) return;
						// disable displaying the color box;
						tooltip.displayColors = false;
					},
					callbacks: {
						title: function (tooltipItem, data) {
							let index = parseInt(tooltipItem[0].index);
							let dataSets = data.datasets[0];
							let name = dataSets.workoutNames[index];
							return name;
						},
						label: function (tooltipItem, data) {
							let index = parseInt(tooltipItem.index);
							let dataSets = data.datasets[0];
							let labelOne =
								'Duration: ' + tooltipItem.yLabel + 'mins';
							let labelTwo = 'Date: ' + dataSets.dates[index];
							return [labelOne, labelTwo];
						},
					},
				},
				barRoundness: 1,
				scales: {
					yAxes: [
						{
							afterTickToLabelConversion: function (
								scaleInstance
							) {
								scaleInstance.ticks[
									scaleInstance.ticks.length - 1
								] = 'Mins';
							},
							ticks: {
								display: true,
								beginAtZero: true,
								color: '#32383a',
								fontColor: '#32383a',
								fontFamily: 'Poppins',
								fontSize: 10,
								fontStyle: '500',
								min: 0,
								// max: 1
								stepSize: 5,
								padding: 8,
							},
							gridLines: {
								drawBorder: false,
								display: true,
								color: 'rgba(50 56 58 / 40%)',
								borderDash: [8, 4],
								zeroLineColor: '#32383a',
								zeroLineWidth: 1,
								lineWidth: 1,
								drawOnChartArea: true,
								drawTicks: true,
							},
						},
					],
					xAxes: [
						{
							afterTickToLabelConversion: function (
								scaleInstance
							) {
								scaleInstance._ticks[
									scaleInstance.ticks.length - 1
								].major = true;
							},
							display: true,
							gridLines: {
								borderDash: [8, 4],
								drawBorder: false,
								display: true,
								color: '#32383a',
								zeroLineColor: '#32383a',
								zeroLineWidth: 1,
								drawTicks: true,
								lineWidth: 1,
								drawOnChartArea: false,
								offsetGridLines: true,
								tickMarkLength: 10,
								z: 1,
							},
							ticks: {
								autoSkip: false,
								maxRotation: 0,
								minRotation: 0,
								display: true,
								beginAtZero: true,
								fontFamily: 'Poppins',
								fontColor: '#32383a',
								fontStyle: '500',
								z: 0,
								padding: 12, // 2 with 20 px tickmark length
							},
						},
					],
				},
			},
		});
	}

	// Configuration to create rounded bars
	chartConfig() {
		// draws a rectangle with a rounded top
		Chart.helpers.drawRoundedTopRectangle = function (
			ctx,
			x,
			y,
			width,
			height,
			radius
		) {
			ctx.beginPath();
			ctx.moveTo(x + radius, y);
			// top right corner
			ctx.lineTo(x + width - radius, y);
			ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
			// bottom right	corner
			ctx.lineTo(x + width, y + height);
			// bottom left corner
			ctx.lineTo(x, y + height);
			// top left
			ctx.lineTo(x, y + radius);
			ctx.quadraticCurveTo(x, y, x + radius, y);
			ctx.closePath();
		};
		// @ts-ignore
		const ChartEl: ChartElementsOptionsExtended = Chart.elements;
		// @ts-ignore
		const ChartCo: ChartControllers = Chart.controllers;
		// @ts-ignore
		ChartEl.RoundedTopRectangle = ChartEl.Rectangle.extend({
			draw: function () {
				const ctx = this._chart.ctx;
				const vm = this._view;
				let left, right, top, bottom, signX, signY, borderSkipped;
				let borderWidth = vm.borderWidth;

				if (!vm.horizontal) {
					// bar
					left = vm.x - vm.width / 2;
					right = vm.x + vm.width / 2;
					top = vm.y;
					bottom = vm.base;
					signX = 1;
					signY = bottom > top ? 1 : -1;
					borderSkipped = vm.borderSkipped || 'bottom';
				} else {
					// horizontal bar
					left = vm.base;
					right = vm.x;
					top = vm.y - vm.height / 2;
					bottom = vm.y + vm.height / 2;
					signX = right > left ? 1 : -1;
					signY = 1;
					borderSkipped = vm.borderSkipped || 'left';
				}

				// Canvas doesn't allow us to stroke inside the width so we can
				// adjust the sizes to fit if we're setting a stroke on the line
				if (borderWidth) {
					// borderWidth shold be less than bar width and bar height.
					const barSize = Math.min(
						Math.abs(left - right),
						Math.abs(top - bottom)
					);
					borderWidth = borderWidth > barSize ? barSize : borderWidth;
					const halfStroke = borderWidth / 2;
					// Adjust borderWidth when bar top position is near vm.base(zero).
					const borderLeft =
						left +
						(borderSkipped !== 'left' ? halfStroke * signX : 0);
					const borderRight =
						right +
						(borderSkipped !== 'right' ? -halfStroke * signX : 0);
					const borderTop =
						top +
						(borderSkipped !== 'top' ? halfStroke * signY : 0);
					const borderBottom =
						bottom +
						(borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
					// not become a vertical line?
					if (borderLeft !== borderRight) {
						top = borderTop;
						bottom = borderBottom;
					}
					// not become a horizontal line?
					if (borderTop !== borderBottom) {
						left = borderLeft;
						right = borderRight;
					}
				}

				// calculate the bar width and roundess
				const barWidth = Math.abs(left - right);
				const roundness =
					this._chart.config.options.barRoundness || 0.5;
				const radius = barWidth * roundness * 0.5;

				// keep track of the original top of the bar
				const prevTop = top;

				// move the top down so there is room to draw the rounded top
				top = prevTop + radius;
				const barRadius = top - prevTop;

				ctx.beginPath();
				ctx.fillStyle = vm.backgroundColor;
				ctx.strokeStyle = vm.borderColor;
				ctx.lineWidth = borderWidth;

				// draw the rounded top rectangle
				Chart.helpers.drawRoundedTopRectangle(
					ctx,
					left,
					top - barRadius + 1,
					barWidth,
					bottom - prevTop,
					barRadius
				);

				ctx.fill();
				if (borderWidth) {
					ctx.stroke();
				}
				top = prevTop;
			},
		});

		Chart.defaults.roundedBar = Chart.helpers.clone(Chart.defaults.bar);
		Chart.controllers.roundedBar = ChartCo.bar.extend({
			// @ts-ignore
			dataElementType: ChartEl.RoundedTopRectangle,
		});
	}
}
