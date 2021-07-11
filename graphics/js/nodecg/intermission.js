let runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
let runDataArray = nodecg.Replicant('runDataArray', 'nodecg-speedcontrol');
let donationList = nodecg.Replicant('donationList');

NodeCG.waitForReplicants(runDataActiveRun, runDataArray, donationList).then(loadFromSpeedControl);

function getNextRuns(runData, amount) {
	let nextRuns = [];
	let indexOfCurrentRun = findIndexInRunDataArray(runData);
	for (let i = 1; i <= amount; i++) {
		if (!runDataArray.value[indexOfCurrentRun + i]) {
			break;
		}
		nextRuns.push(runDataArray.value[indexOfCurrentRun + i]);
	}
	return nextRuns;
}

function findIndexInRunDataArray(run) {
	let indexOfRun = -1;
	if (run) {
		for (let i = 0; i < runDataArray.value.length; i++) {
			if (run.id === runDataArray.value[i].id) {
				indexOfRun = i; break;
			}
		}
	}
	return indexOfRun;
}

function loadFromSpeedControl() {
	runDataActiveRun.on('change', (newVal, oldVal) => {
		refreshNextRunsData(newVal);
	});

	runDataArray.on('change', (newVal, oldVal) => {
		refreshNextRunsData(runDataActiveRun.value);
	});

	donationList.on('change', newVal => {
	 	$('#donation-history').text(newVal);
	});
}

function refreshNextRunsData(currentRun) {
	let nextRuns = getNextRuns(currentRun, 2);
	let i = 0;
    let futureRuns = [];
	for (let run of nextRuns) {
		if (i >= 2) {
			break;
		}
        futureRuns.push(run.game + " (" + run.category + ")");
		i += 1;
	}
    $('#next-runs').html(futureRuns.join(' ┃ '));
}