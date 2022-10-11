const fs = require("fs")
const pathToEntry = "./build/index.html"
const builtHTMLContent = fs.readFileSync(pathToEntry).toString()
const indexVersion = Math.floor(Math.random() * 1001)
const newFile = builtHTMLContent.replace(
  '<link href="./version.css" as="style">',
  `<link href="./version.css?${indexVersion}" as="style">`
)

fs.writeFileSync(pathToEntry, newFile)
