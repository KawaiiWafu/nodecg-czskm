const fs = require('fs');

module.exports = nodecg => {
    const router = nodecg.Router();
    const switchLayoutRep = nodecg.Replicant('switchLayout', {defaultValue: 'intermission.html', persistent: false});
    const rtmpChanger = nodecg.Replicant('rtmpChanger', {defaultValue: '', persistent: false});
    const donationTracker = nodecg.Replicant('donationTracker', {defaultValue: [], persistent: false});
    const donationTotal = nodecg.Replicant('donationTotal', {defaultValue: 0.0});
    const subscriptionTracker = nodecg.Replicant('subscriptionTracker', {defaultValue: [], persistent: false});
    const donationLock = nodecg.Replicant('donationLock', {defaultValue: 0, persistent: false});
    const streamlabs = nodecg.extensions['nodecg-streamlabs'];
    const accessKey = nodecg.bundleConfig.accessKey;

    streamlabs.on("streamlabs-event", event => {
        if (event.type == 'donation') {
            if (donationTracker.value.length == 3) {
                donationTracker.value.shift();
            }
            donationTracker.value.push({
                name: event.message.name,
                amount: event.message.amount.amount,
                message: event.message.message
            });
            donationTotal.value += event.message.amount.amount;
        }
    });

    streamlabs.on("twitch-event", event => {
        if (event.type == 'subscription') {
            if (subscriptionTracker.value.length == 3) {
                subscriptionTracker.value.shift();
            }
            subscriptionTracker.value.push({
                name: event.message.name,
                message: event.message.message,
                months: event.message.months
            });
        }
    });
    
    // Only for Darujme.cz donations
    router.get('/darujme', (req, res) => {
        if (req.query.key === accessKey) {
            let name = req.query.author;
            let amount = req.query.amount;
            let message = req.query.message;
            donationTracker.value.push({
                name: name,
                amount: amount,
                message: message
            });
            if (amount !== 'Anonymous')
                donationTotal.value += parseFloat(amount);
            res.send(name + amount + message);
        } else {
            res.send('Error: Invalid key');
        }
    });

    router.get('/ws', (req, res) => {
        if (req.query.key === accessKey) {
            res.json({layout: switchLayoutRep.value, rtmp: rtmpChanger.value});
        } else {
            res.send('Error: Invalid key');
        }
    });
    
    nodecg.mount('/nodecg-czskm', router);
}
