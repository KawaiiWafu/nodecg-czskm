let runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
let runDataArray = nodecg.Replicant('runDataArray', 'nodecg-speedcontrol');
let donationList = nodecg.Replicant('donationList');
const backgrounds = nodecg.Replicant('assets:backgrounds');

NodeCG.waitForReplicants(runDataActiveRun, runDataArray, donationList, backgrounds).then(loadFromSpeedControl);

function getNextRuns(runData, amount) {
	let nextRuns = [];
	let indexOfCurrentRun = findIndexInRunDataArray(runData);
	setBackground(indexOfCurrentRun);
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
	startSetupTimer(currentRun.setupTimeS);
	let nextRuns = getNextRuns(currentRun, 3);
	let i = 0;
    let futureRuns = [];
	for (let run of nextRuns) {
		if (i >= 2) {
			break;
		}
		if (run.game === 'Setup') {
			i -= 1;
			continue;
		}
        futureRuns.push(run.game + " (" + run.category + ")");
		i += 1;
	}
    $('#next-runs').html(futureRuns.join(' ┃ '));
}

function startSetupTimer(setupTime) {
	var cdt = new Date().getTime() + setupTime * 1000;
    $('#clock').countdown(cdt)
    .on('update.countdown', function(event) {
      var $this = $(this);
      $this.html(event.strftime('%M:%S'));
    });
}

function setBackground(index) {
	let background = backgrounds.value.find(el => el.name === (index + 1).toString() || el.name === (index + 1).toString() + '-dark');
	if (background === undefined) {
		$('#game-background').css('background-image', 'none');
		$('#logo-img').attr('src', 'img/logo-dark.svg');
		$('h1').css('color', '#ffffff');
	}
	else {
		$('#game-background').css('background-image', 'url(' + background.url + ')');
		if (background.name.includes('dark')) {
			$('#logo-img').attr('src', 'img/logo.svg');
			$('h1').css('color', '#000000');
		} else {
			$('#logo-img').attr('src', 'img/logo-dark.svg');
			$('h1').css('color', '#ffffff');
		}
	}
}