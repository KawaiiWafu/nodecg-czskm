const switchLayoutRep = nodecg.Replicant('switchLayout');

function setup() {
    $.getJSON("layouts.json", function(json) {
        let layouts = json['layouts'];
        $.each(layouts, function(_, value) {
            let button = createButton(value.name);
            button.class('v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default');
            button.mousePressed(() => {
                switchLayout(value.file)
            });
        });
    });
}

function switchLayout(layout) {
	switchLayoutRep.value = layout;
}