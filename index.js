const async = require("async");
const unirest = require("unirest");

let urls = ["https://staging-cdn.inspigo.id/public/album/media/5-28-2019-alb1.jpg", "https://timedotcom.files.wordpress.com/2015/08/gettyimages-482708894.jpg?quality=65&strip=color&w=1100"]

async.filter(urls, (url, cb) => {
    unirest.get(url)
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .then(response => {
        console.log(response.headers["content-type"].match(/(\bjpeg\b)|(\bimage\b)|(\bpng\b)|(\bjpg\b)/g), ' => ')
        if(response.status == 200 || response.status !== 201) {
            cb(null, response.headers["content-type"].match(/(\bjpeg\b)|(\bimage\b)|(\bpng\b)|(\bjpg\b)/g))
        }
        else {
            cb(null, false)
        }
    })
    .catch(err => {
        cb(err);
    })
}, (err, results) => {
    console.log(err || results);
})

