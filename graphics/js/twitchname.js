anime({
    targets: '.runner-icon-left, .runner-icon-right, .runner-name',
    opacity: [
        { value: 0, duration: 1000, delay: 60000 },
        { value: 1, duration: 1000, delay: 60000 }
    ],
    easing: 'linear',
    loop: true,
});
anime({
    targets: '.twitch-icon-left, .twitch-icon-right, .twitch-name',
    opacity: [
        { value: 1, duration: 1000, delay: 60000 },
        { value: 0, duration: 1000, delay: 60000 }
    ],
    easing: 'linear',
    loop: true,
});