function textfill_auto($other_max, $game_max, $cat_max) {
    $('.auto-size').textfill({
        minFontPixels: 10,
        maxFontPixels: $other_max
    });
    $('.auto-size-game').textfill({
        minFontPixels: 10,
        maxFontPixels: $game_max
    });
    $('.auto-size-category').textfill({
        minFontPixels: 10,
        maxFontPixels: $cat_max
    });
}