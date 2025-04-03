async function initNeuralNetwork() {
    const model = bodySegmentation.SupportedModels.BodyPix;
    const segmenterConfig = {
        runtime: 'tfjs',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation',
        modelType: 'general'
    }
    const segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
    return segmenter;
}

async function segment(video, segmenter) {

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    video.width = videoWidth;
    video.height = videoHeight;

    CANVAS.width = videoWidth;
    CANVAS.height = videoHeight;

    const config = {
        flipHorizontal: false,
        multiSegmentation: false,
        segmentBodyParts: true,
        segmentationThreshold: 0.5
    };
    const segmentation = await segmenter.segmentPeople(video, config);
    console.log(segmentation);

    // const coloredPartImage = await bodySegmentation.toColoredMask(segmentation, bodySegmentation.bodyPixMaskValueToRainbowColor, {r: 255, g: 255, b: 255, a: 255});

    const foregroundColor = { r: 0, g: 0, b: 0, a: 0 };
    const backgroundColor = { r: 0, g: 0, b: 0, a: 255 };
    const coloredPartImage = await bodySegmentation.toBinaryMask(segmentation, foregroundColor, backgroundColor);

    const opacity = 0.7;
    const flipHorizontal = false;
    const maskBlurAmount = 3;

    bodySegmentation.drawMask(
        CANVAS,
        video,
        coloredPartImage,
        opacity,
        maskBlurAmount,
        flipHorizontal);
}

async function main() {

    var video = await startVideo();
    const segmenter = await initNeuralNetwork();

    setInterval(() => {
        segment(video, segmenter);
    });

}

main();