// BackGround is the background image to be changed.
// ForeGround is the foreground image.
// ForeGroundOpacity is the opacity of the foreground image.
// ForeGroundPosition is the The foreground image's location, measured in pixels. It can be negative, and the alignment of the foreground and background's top-left pixels is indicated by (0,0).

function composite(BackGround, ForeGround, ForeGroundOpacity, ForeGroundPosition) {
    var bgData = BackGround.data;
    var fgData = ForeGround.data;
    var width = BackGround.width;
    var height = BackGround.height;

    // Calculate the bounds for the foreground image
    var x = ForeGroundPosition.x;
    var y = ForeGroundPosition.y;
    var minX = Math.max(x, 0);
    var minY = Math.max(y, 0);
    var maxX = Math.min(x + ForeGround.width, width);
    var maxY = Math.min(y + ForeGround.height, height);

   for (var py = minY; py < maxY; py++) {
        for (var px = minX; px < maxX; px++) {
            var bgIdx = (py * width + px) * 4; // Background pixel index
            var fgIdx = ((py - y) * ForeGround.width + (px - x)) * 4; // Foreground pixel index

           // Extract the color components
            var bgA = bgData[bgIdx + 3]; // Background alpha
            var fgA = fgData[fgIdx + 3]; // Foreground alpha

            // Calculate the blended color
            var alpha = ForeGroundOpacity * fgA / 255;
            var blendedR = Math.round(bgData[bgIdx] * (1 - alpha) + fgData[fgIdx] * alpha);
            var blendedG = Math.round(bgData[bgIdx + 1] * (1 - alpha) + fgData[fgIdx + 1] * alpha);
            var blendedB = Math.round(bgData[bgIdx + 2] * (1 - alpha) + fgData[fgIdx + 2] * alpha);

           // Update the background pixel data with the blended color
            bgData[bgIdx] = blendedR;
            bgData[bgIdx + 1] = blendedG;
            bgData[bgIdx + 2] = blendedB;
        }
    }
}


