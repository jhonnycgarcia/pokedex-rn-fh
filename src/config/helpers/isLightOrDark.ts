
export const isLightOrDark = (color: any) => {
    // HSP equation from http://alienryderflex.com/hsp.html
    const lightOrDark = (r: number, g: number, b: number) => {
        const hsp =
            Math.sqrt(
                0.299 * (r * r) +
                0.587 * (g * g) +
                0.114 * (b * b)
            );

        // Using the HSP value, determine whether the color is light or dark
        return hsp > 160 ? 'light' : 'dark';
    };

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        let r = color[1];
        let g = color[2];
        let b = color[3];
        return lightOrDark(r, g, b);
    }
    else {
        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

        let r = color >> 16;
        let g = color >> 8 & 255;
        let b = color & 255;
        return lightOrDark(r, g, b);
    }
};
