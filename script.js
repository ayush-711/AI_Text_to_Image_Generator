
const API_key = "2db1a182f0b8c13ead70726239f295d6806e87d64ac22f4e54620b7cff392d46d42cfb2f0c117137b5f8aa4a3b0f65ca";


async function generateImage() {
    const prompt = document.getElementById("prompt").value.trim();

    if (!prompt) return alert("please enter a propmt");

    document.getElementById("result").innerHTML = `<div class="loading-text">Generating Image... Please Wait!</div>`;


    const form = new FormData();
    form.append("prompt", prompt);

    try {
        const res = await fetch("https://clipdrop-api.co/text-to-image/v1", {
            method: "POST",
            headers: {"x-api-key": API_key},
            body: form,
        })

        if(!res.ok) throw new Error(`<div class = "loading-text" style = "color:red;">Image Generation Failed</div>`)

        const blob = await res.blob();
        const imgURL = URL.createObjectURL(blob);

        document.getElementById("result").innerHTML = `<div class="image-wrapper" id="image-container">
        <div class="icon-btns">
            <button onclick="downloadImage('${imgURL}')" class="downloadImage">
                <i class="fa-solid fa-download"></i>
            </button>
            <button onclick="deleteImage()" class="deleteImage">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
        <img id = "generated-image" src="${imgURL}" alt="Enter your imagination , and see the magic">`

    }
    catch (error) {
        document.getElementById("result").innerHTML = `<div class = "loading-text" style = "color:red;">${error.message}</div>`
        
    }


    
}


function downloadImage(url) {
        const a = document.createElement("a");
        a.href = url;
        a.download = 'ai_generated_image.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
}
    

function deleteImage() {
    document.getElementById("result").innerHTML = ``
    // console.log("imageDeleted");
}



