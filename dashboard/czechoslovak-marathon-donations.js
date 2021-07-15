const donationTracker = nodecg.Replicant('donationTracker');
const subscriptionTracker = nodecg.Replicant('subscriptionTracker');

function setup() {
    NodeCG.waitForReplicants(donationTracker, subscriptionTracker).then(createButtons);
    
    function createButtons() {
        donationTracker.on('change', newVal => {
            let button = createButton(
                newVal[newVal.length - 1].name +' ┃ ' + newVal[newVal.length - 1].amount + " Kč"
            );
            let text = createP(newVal[newVal.length - 1].message);
            button.class('v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default');
            button.mousePressed(function () {
                button.remove();
                text.remove();
            });
        });
    
        subscriptionTracker.on('change', newVal => {
            let button = createButton(
                newVal[newVal.length - 1].name +' ┃ ' + newVal[newVal.length - 1].months + " měsíců"
            );
            let text = createP(newVal[newVal.length - 1].message);
            button.class('v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default');
            button.mousePressed(function () {
                button.remove();
                text.remove();
            });
        });
    }
}
