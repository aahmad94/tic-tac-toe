export default class Cat {
    constructor() {
        Array.prototype.every.call(document.querySelectorAll(".cat"), img => img.remove());
        this.getCat();
    }

    getCat() {
        return fetch("https://api.thecatapi.com/v1/images/search")
        .then(res => {
            if (!res.ok) {
                throw new Error("Response not ok");
            };
            return res.json();
        })
        .then(json => this.createImgNode(json))
        .catch(err => console.log(err));
    }

    createImgNode(res) {
        console.log({res});
        const img = document.createElement("img"); 
        img.className = "cat";    
        let height = res[0].height * 0.4;
        let width = res[0].width * 0.4;
        

        if (height > 225 || width > 300) {
            const ratio = width/height
            height = 150;
            width = height * ratio;
            console.log({ height });
            console.log({ width });
        }
        
        img.src = res[0].url;
        img.style.height = height.toString().concat("px");
        img.style.width = width.toString().concat("px");
        const headings = document.getElementsByClassName("heading");
        Array.prototype.forEach.call(headings, (heading => {
            heading.appendChild(img);
        }));
    }
}