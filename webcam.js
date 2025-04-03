const VIDEO = document.getElementById('video');

async function loadWebcam() {

    const videoWidth = VIDEO.width;
    const videoHeight = VIDEO.height;

    const camConfig = {
        audio: false,
        video: {
            facingMode: 'user',
            width: videoWidth,
            height: videoHeight,
            frameRate: { max: 60 }
        },
    };

    VIDEO.muted = true;
    VIDEO.srcObject = await navigator.mediaDevices.getUserMedia(camConfig);
}

async function startVideo() {
    await loadWebcam();
    VIDEO.play();
    return VIDEO;
}