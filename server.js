var http = require('http')
var url = require('url')
var querystring = require('querystring')
const port = 5000;
http.createServer(function (req, res) {
    var query = url.parse(req.url).query;
    var p = parseInt(querystring.parse(query)["principal"]);
    var r = parseInt(querystring.parse(query)["rate"]) / 100;
    var n = parseInt(querystring.parse(query)["compounding"]);
    var t = parseInt(querystring.parse(query)["time"]);
    const ci = p * Math.pow(1 + r / n, n * t) - p;
    const tot = p + ci;
    // res.write("Principal Amount="+p+"\nRate="+(r*100)+"%\nFrequency="+n+" months\nTime="+t+" years\nCompound Interest="+ci.toFixed(2)+"\n"+ "Total Amount="+tot.toFixed(2));
    var htmlTable = `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Compound Interest Details</title>
<style>
  body {
    display: flex;
    flex-direction:column;
    align-items: center;
    height: 100vh;
  }
  table {
    font-family: Arial, sans-serif;
    border-collapse: collapse;
    width: 50%;
    margin-top: 20px;
  }
  th {
    background-color: #f2f2f2;
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
</style>
</head>
<body>
<br/>
<br/>
<h2 style="text-align: center;">Compound Interest Details</h2>
<table>
  <tr>
    <th>Principal Amount</th>
    <td>${p}</td>
  </tr>
  <tr>
    <th>Rate</th>
    <td>${(r*100).toFixed(2)}%</td>
  </tr>
  <tr>
    <th>Frequency</th>
    <td>${n} months</td>
  </tr>
  <tr>
    <th>Time</th>
    <td>${t} years</td>
  </tr>
  <tr>
    <th>Compound Interest</th>
    <td>${ci.toFixed(2)}</td>
  </tr>
  <tr>
    <th>Total Amount</th>
    <td>${tot.toFixed(2)}</td>
  </tr>
</table>
</body>
</html>

`;

    res.write(htmlTable);

    res.end()
}).listen(port);
console.log("starting")
console.log(`Server is running in http://localhost:${port}`);