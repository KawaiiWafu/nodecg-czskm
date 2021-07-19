let select, input, button;

const rtmpChanger = nodecg.Replicant('rtmpChanger');
const rtmpIp = nodecg.bundleConfig.rtmp;

function setup() {
    input = createInput().attribute('placeholder', 'abcdefghijkl/czskm1');
    select = createSelect();
    input.class('v-input theme--dark v-size--default');
    select.class('v-input theme--dark v-size--default');
    for (let i = 1; i <= 6; i++) {
        for (let p = 1; p <= i; p++) {
            select.option('4-3-' + i + '/' + p);
        }
    }
    for (let i = 1; i <= 4; i++) {
        for (let p = 1; p <= i; p++) {
            select.option('16-9-' + i + '/' + p);
        }
    }
    button = createButton('Change RTMP');
    button.class('v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default');
    button.mousePressed(() => {
        changeRtmp(select.value(), input.value());
    });
}

function changeRtmp(input, streamKey) {
    rtmpChanger.value = input + '|rtmp://' + rtmpIp + '/' + streamKey;
}