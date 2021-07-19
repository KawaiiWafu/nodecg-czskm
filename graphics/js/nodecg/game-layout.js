'use strict';
$(() => {
	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';
	
	// JQuery selectors.
	var gameTitle = $('#game-title');
	var gameCategory = $('#game-category');
	var gameSystem = $('#game-system');
	var gameEstimate = $('#game-estimate');
	var player = $('#player1');
	var twitch = $('#twitch1');
	var intermission = $('#intermission')
	var commentator = $('#commentator');
	
	// This is where the information is received for the run we want to display.
	// The "change" event is triggered when the current run is changed.
	var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
	runDataActiveRun.on('change', (newVal, oldVal) => {
		if (newVal)
			updateSceneFields(newVal);
	});
	
	// Sets information on the pages for the run.
	function updateSceneFields(runData) {
        let currentTeamsData = runData.teams;
		let runners = '';
		let first = true;
		gameTitle.html(runData.game);
		gameCategory.html(runData.category);
		gameSystem.html(runData.system);
		gameEstimate.html(runData.estimate);
		commentator.html('');
		if (player.length || twitch.length) {
			let i = 0;
            for (let team of currentTeamsData) {
				if (intermission.length) {
					if (first) {
						runners += team.players.map((player) => player.name).join(', ');
						first = false;
					} else {
						runners += ', ' + team.players.map((player) => player.name).join(', ');
					}
				} else {
					for (let player of team.players) {
						if (player.name.startsWith("[C] ")) {
							commentator.html(player.name.substring(4));
						} else {
							$('#player' + (i + 1)).html(player.name);
							$('#twitch' + (i + 1)).html(player.social.twitch);
						}
						i += 1;
					}
				}
            }
			player.html(runners);
		}
        textfill_auto(scaleInfo, scaleGame, scaleCat);
	}
});