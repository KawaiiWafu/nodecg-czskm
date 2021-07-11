'use strict';

const donationTracker = nodecg.Replicant('donationTracker');
const subscriptionTracker = nodecg.Replicant('subscriptionTracker');
const donationLock = nodecg.Replicant('donationLock');
const switchLayoutRep = nodecg.Replicant('switchLayout');
const donationList = nodecg.Replicant('donationList', {defaultValue: ''});

NodeCG.waitForReplicants(donationTracker, subscriptionTracker, donationLock, switchLayoutRep, donationList).then(trackDonations);

function trackDonations() {
    var donations = [];
    var donationWidth = 400;
    var donationHistory = [];

    donationTracker.on('change', newVal => {
        if (newVal[newVal.length - 1] !== undefined) {
            donations.push({top: newVal[newVal.length - 1].name, bottom: newVal[newVal.length - 1].amount + ' Kč'});
            if (donationHistory.length >= 3) {
                donationHistory.shift();
            }
            donationHistory.push(newVal[newVal.length - 1].name + " (" + newVal[newVal.length - 1].amount + " Kč)");
            donationList.value = donationHistory.join(' ┃ ');
        }
    });

    subscriptionTracker.on('change', newVal => {
        if (newVal[newVal.length - 1] !== undefined) {
            let months = newVal[newVal.length - 1].months
            let formattedMonths = months == 1 ? ' měsíc)' : months < 5 ? ' měsíce)' : ' měsíců)';
            donations.push({top: newVal[newVal.length - 1].name, bottom: 'Předplatné (' + months + formattedMonths});
            if (donationHistory.length >= 3) {
                donationHistory.shift();
            }
            donationHistory.push(newVal[newVal.length - 1].name + " (" + months + formattedMonths);
            donationList.value = donationHistory.join(' ┃ ');
        }
    });

    donationLock.on('change', newVal => {
        if (newVal == 0) {
            if (donations.length == 0 && donationLock.value == 0) {
                setTimeout(() =>  {
                    donationLock.value = 2;
                }, 8500);
            } else {
                donationLock.value = 1;
                const donation = donations.shift();
                $('#donor').html(donation.top);
                $('#amount').html(donation.bottom);
                showDonation(donationWidth);
                setTimeout(() =>  {
                    donationLock.value = 0;
                }, 8500);
            }
        }
        if (newVal == 2) {
            donationLock.value = 0;
        }
    });

    switchLayoutRep.on('change', newVal => {
        $.getJSON("../dashboard/donationbox.json", function(json) {
            let changedValues = json[newVal];
            $('#donation').css('height', changedValues.height + 'px');
            $('#donation').css('left', changedValues.posX);
            $('#donation').css('top', changedValues.posY);
            donationWidth = changedValues.width;
        });
    });
};