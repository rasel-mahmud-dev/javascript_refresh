

const databaseConnect = require("../utils/databaseConnect");
const { marked } = require("marked")
const path = require("path");
const fs = require("fs");

const categoryJson = require("../db/category.json");

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang) {
    const hljs = require('highlight.js');
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

// marked.parse(mdContent.toString(), (err, html) => {
  // if(!err) {
  //   res.write(html)
  //   res.end()
  //   // response(res, 200, {mdContent: html, message: "yyyyyyy"})
  // } else{
  //   response(res, 500,  "markdown file parse fail")
  // }
// });

export default (app)=> {
  /* GET home with category name page. */
  app.get('/:category_name', async function (req, res, next) {
    
    let db = await databaseConnect()
    
    db.all(`select * from posts`, (err, doc) => {
      if (err) {
        res.render('index', {title: 'Express', posts: []});
      } else {
        
        let categoryJson = require("../db/category.json")
        categoryJson.forEach(cat => {
          if (cat.category_name === req.params.category_name) {
            res.render('index', {title: 'Express', posts: doc, categoryName: "es6", category: cat});
          }
        })
        db.close()
      }
      
      // const posts = [
      //   { slug: "JavaScript-Primitive-vs-Reference-Values", path: "JavaScript Primitive vs. Reference Values", title: "JavaScript Primitive vs. Reference Values" },
      //   { slug: "JavaScript Class", path: "JavaScript Primitive vs. Reference Values", title: "JavaScript Class" },
      // ]
      // res.render('index', { title: 'Express', posts: posts});
    });
  })
  
  
  /* GET home page. */
  app.get('/', async function (req, res, next) {
    
    let db = await databaseConnect()
    
    
    db.all(`select * from posts`, (err, doc) => {
      if (err) {
        console.log(err)
        res.render('index', {title: 'Express', posts: [], categoryName: "all", category: {category_label: "All"}});
      } else {
        
        db.all(`select *, c.name as category_name from categories c join sub_categories sc on sc.category_id = c.category_id `, (err, sideBar) => {
          
          let f = {}
          sideBar.forEach(cat => {
            if (f[cat.label]) {
              f[cat.label] = [...f[cat.label], cat]
            } else {
              f[cat.label] = [cat]
            }
          })
          console.log("dsf")
          res.render('index', {title: 'Express', posts: doc, categoryName: "all", category: {category_label: "All"}});
          db.close()
        })
        
        //
        // res.render('index', {title: 'Express', posts: doc});
        // db.close()
      }
      
      // const posts = [
      //   { slug: "JavaScript-Primitive-vs-Reference-Values", path: "JavaScript Primitive vs. Reference Values", title: "JavaScript Primitive vs. Reference Values" },
      //   { slug: "JavaScript Class", path: "JavaScript Primitive vs. Reference Values", title: "JavaScript Class" },
      // ]
      // res.render('index', { title: 'Express', posts: posts});
    });
  })
  
  
  /* GET home page. */
  app.get('/p/:slug', async function (req, res, next) {
    
    const {slug} = req.params
    
    let db = await databaseConnect()
    db.each(`select * from posts where slug = ?`, slug, (err, doc) => {
      if (err) {
      
      } else {
        
        
        const content = fs.readFileSync(path.resolve("markdowns/" + doc.path))
        
        let html = marked.parse(content.toString())
        
        res.render('posts/details', {title: 'Express', post: doc, html});
        
      }
    })
    
    // const posts = [
    //   { slug: "JavaScript-Primitive-vs-Reference-Values", path: "JavaScript Primitive vs. Reference Values", title: "JavaScript Primitive vs. Reference Values" },
    //   { slug: "JavaScript Class", path: "JavaScript Primitive vs. Reference Values", title: "JavaScript Class" },
    // ]
    
    // res.render('index', { title: 'Express', posts: posts});
  });
  
}


