import cheerio from "cheerio";

const $ = cheerio.load(
  "<div><h2>Web scraping with cheerio</h2> <h2>Everyone should learn scraping</h2> </div>"
);


const firstHeader = $("div")

// iterating over Nodes

$('h2').each((idx,ref)=>{
    const elem = $(ref)
    console.log(elem.text())
    
})

console.log(firstHeader.text())