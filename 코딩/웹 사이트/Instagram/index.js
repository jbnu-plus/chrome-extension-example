async function fetchImage() {
    const instagramUrl = document.getElementById('instagramUrl').value;
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";

    try {
        const response = await fetch(proxyUrl + instagramUrl);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const imageUrl = doc.querySelector("meta[property='og:image']").getAttribute("content");

        if (imageUrl) {
            const imageResult = document.getElementById('imageResult');
            imageResult.src = imageUrl;
            imageResult.alt = 'Instagram Image';

            // 다운로드 버튼 표시
            document.getElementById('downloadBtn').style.display = 'inline-block';
        } else {
            alert('Could not find image. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

function downloadImage() {
    const imageResult = document.getElementById('imageResult');
    const imageUrl = imageResult.src;

    if (!imageUrl) {
        alert('No image to download. Please fetch an image first.');
        return;
    }

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'instagram_image.jpg'; // 다운로드 될 파일 이름 설정
    link.click();
}
