import React from "react";

export default function Meme(){
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(res => setAllMemeImg(res.data.memes));
    },[]);

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImg: "https://i.imgflip.com/1bij.jpg"
    });

    function handleClick(event){
        const {name,value} = event.target;
        setMeme(prevState => ({
            ...prevState,
            [name]:value
        }))
    }

    const [allMemeImg, setAllMemeImg] = React.useState([]);

    function getImg(){
        const randumIdx = Math.floor(Math.random()*allMemeImg.length);
        const url = allMemeImg[randumIdx].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImg : url
        }));
    }

    function downloadMeme(){
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.crossOrigin = 'anonymous'; 
        
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.font = '30px sans-serif';
            ctx.textAlign = 'center';
            
            ctx.fillText(meme.topText, canvas.width / 2, 40);
            ctx.strokeText(meme.topText, canvas.width / 2, 40);
         
            ctx.fillText(meme.bottomText, canvas.width / 2, canvas.height - 20);
            ctx.strokeText(meme.bottomText, canvas.width / 2, canvas.height - 20);

            const link = document.createElement('a');
            link.download = 'meme.png';
            link.href = canvas.toDataURL('image/png');

            link.click();
        };

        img.src = meme.randomImg;
    }

    return (
        <>
            <main>
                <div className="form">
                    <div className="inputs">
                        <div className="inp">
                            <label>Top text</label>
                            <input
                             type="text"
                             name="topText"
                             value={meme.topText}
                             onChange={handleClick}
                             placeholder="top text"></input>
                        </div>
                        <div className="inp">
                            <label>Bottom text</label>
                            <input 
                              type="text" 
                              name="bottomText"
                              value={meme.bottomText}
                              onChange={handleClick}
                              placeholder="bottom text"></input>
                        </div>
                    </div>
                    <button type="submit" onClick={getImg}>Get a new meme image  </button>
                </div>
                <div className="meme-container">
                    <img src={meme.randomImg} className="meme-img" alt="random-meme"></img>
                    <h2 className="top-txt">{meme.topText}</h2>
                    <h2 className="btm-txt">{meme.bottomText}</h2>
                </div>
            </main>
            <div className="download-container">
                <button onClick={downloadMeme}>Download Meme</button>
            </div>
        </>
    );
}
