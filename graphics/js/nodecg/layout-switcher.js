'use strict';
$(() => {
    const switchLayoutRep = nodecg.Replicant('switchLayout');

    var transition = $('#transition');
    var layout = $('#layout');
    
    switchLayoutRep.on('change', newVal => {
        transition.attr('src', '/bundles/nodecg-czskm/graphics/transition.html');
        setTimeout(() => {
            layout.attr('src', '/bundles/nodecg-czskm/graphics/' + newVal);
        }, 5000);
    });
});