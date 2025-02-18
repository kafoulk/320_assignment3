const http = require("http");
const fs = require("fs");
const path = require("path");

const WebFile = require("./functions/webfile");

/**
 * 
 * @param {http.ClientRequest} req
 * @param {http.ServerResponse} res
 */


 function app(req, res) {
    const fileReq = new WebFile(req.url);
    const filePath = path.join(__dirname, "views", fileReq.filename);
    if(fs.existsSync(filePath) && fileReq.getExtension()) {
        res.writeHead(200, {"Content-Type": fileReq.getMimeType() || "text/html" });
        res.write(fs.readFileSync(filePath));

    } else if (!fileReq.getExtension() && fs.existsSync(filePath + ".html")) {
        filePath + ".html";
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(fs.readFileSync(filePath));
    
    } else if (!fileReq.getExtension() && fs.existsSync(path.join(filePath + ".html"))) {
            filePath = path.join(filePath + ".html");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(fs.readFileSync(filePath));
        } else {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write(fs.readFileSync(path.join(__dirname, "views/404.html")));
        // res.write("<h2>Hello There! </h2> <H5>Thank you for visiting this webpage!</H5>");
        // res.write(`<p>File Requested: ${req.url}</p>`);
        // res.write(`${fileReq.getMimeType()}`);
    }
    res.end();
} 

const server = http.createServer(app);

const port = process.env.PORT || 8008; // 3000, 3001,

server.listen(port);