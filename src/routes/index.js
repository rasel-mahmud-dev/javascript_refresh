import e from "express";
import {type} from "os";
import markdownPath from "../utils/markdownPath";


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
  app.get('/:category_name/:slug', async function (req, res, next) {
    
    
    // categories
    const { slug, category_name } = req.params
    
    let category = {}
  
    let categoryJson = require("../db/category.json")
    
    for (let i = 0; i < categoryJson.length; i++) {
      let cat = categoryJson[i]
      if (cat.category_name === category_name) {
        category = cat
        break;
      }
    }
    
  
    let db = await databaseConnect()

      db.get(`SELECT * FROM posts p where p.category_name = ? and p.slug = ?`, category_name, slug, (err, result) => {
        if (err) {
          // console.log(result)
          return res.render('index', {
            title: 'Express',
            errorMessage: "Post Not Found",
            categoryName: "es6",
            category: category
          });
        }
        
        try {
      
          const content = fs.readFileSync(markdownPath(result.path))
            let html = marked.parse(content.toString())
            res.render('posts/details', {title: 'Express', post: result, html, categoryName: "es6", category: category});

          } catch (ex){
            // console.log(ex, result)
            let html = "<h1>Post markdown file not found</h1>"
            res.render('posts/details', {title: 'Express', post: result, html, categoryName: "es6", category: category});
          }
        
      });
    
    
    // if(isPostDetails) {
    //   let db = await databaseConnect()
    //   db.get("SELECT * FROM posts p where p.slug = ?", slug, (err, result) => {
    //     if (err) {
    //       console.log(err)
    //       return res.render('index', {
    //         title: 'Express',
    //         errorMessage: "Post Not Found",
    //         categoryName: "es6",
    //         category: category
    //       });
    //     }
    //
    //     try {
    //       const content = fs.readFileSync(path.resolve("src/markdowns/" + result.path))
    //       let html = marked.parse(content.toString())
    //
    //       res.render('posts/details', {title: 'Express', post: result, html, categoryName: "es6", category: category});
    //
    //     } catch (ex){
    //
    //       console.log(ex)
    //
    //       let html = "marked.parse(content.toString())"
    //       res.render('posts/details', {title: 'Express', post: result, html, categoryName: "es6", category: category});
    //     }
    //   })
    // } else {
    //   return res.render('index', {
    //     title: 'Express',
    //     message: "Post Not Found",
    //     categoryName: "es6",
    //     category: category
    //   });
    // }
    
  })
  
  
  /* GET home page. */
  app.get('/', async function (req, res, next) {
    
    let db = await databaseConnect()
    
    
    db.all(`select * from posts`, (err, doc) => {
      if (err) {
        console.log(err)
        return res.render('index', {
          title: 'Express',
          html: false,
          posts: [],
          categoryName: "all",
          category: {category_label: "All"}
        });
      
      } else {
        let categoryJson = require("../db/category.json")
        categoryJson.forEach(cat => {
          if (cat.category_name === "") {
       
            res.render('index', {
              title: 'Express',
              posts: doc,
              html: false,
              categoryName: "Javascript Fundamental",
              category: cat
            });
          }
        })
     
        res.render('index', {
          title: 'Express',
          posts: doc,
          html: false,
          categoryName: "all",
          category: {category_label: "All"}
        });
        // res.render('index', {title: 'Express', posts: doc});
        db.close()
      }
    });
  })
  
  
  app.get('/:slug', async function (req, res, next) {
    const slug = req.params.slug
    let category = {}
    
    let categoryJson = require("../db/category.json")
    
    let isPostDetails = false
    
    for (let i = 0; i < categoryJson.length; i++) {
      let cat = categoryJson[i]
      if (cat.category_name === slug) {
        category = cat
        isPostDetails = false
        break;
      } else {
         isPostDetails = true
        if (cat.category_name === "") {
          category = cat
        }
      }
    }


    if(isPostDetails) {
      let db = await databaseConnect()
      db.get("SELECT * FROM posts p where p.slug = ?", slug, (err, result) => {
        if (err) {
          console.log(err)
          return res.render('index', {
            title: 'Express',
            html: false,
            errorMessage: "Post Not Found",
            categoryName: "es6",
            category: category
          });
        }
    
        try {
          const content = fs.readFileSync(path.resolve("src/markdowns/" + result.path))
          let html = marked.parse(content.toString())
        
          res.render('posts/details', {
            title: 'Express', post: result,
            html,
            categoryName: "es6",
            category: category
          });
        
        } catch (ex){
          let html = "marked.parse(content.toString())"
          res.render('posts/details', {
            title: 'Express',
            post: result,
            html,
            categoryName: "es6",
            category: category
          });
        }
      })
    } else {
      return res.render('index', {
        title: 'Express',
        message: "Post Not Found",
        categoryName: "es6",
        html: false,
        category: category
      });
    }
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


