
import markdownPath from "../utils/markdownPath";


import databaseConnect  from "../utils/databaseConnect"

const { marked } = require("marked")

import path  from "path";
import fs from "fs";
import {NextFunction, Request, Response, Application} from "express";
import Post, {PostType} from "../models/Post";
import createLogger, {logPath} from "../utils/createLogger";
import {log} from "util";
import {readdir, readFile, stat} from "fs/promises";

const categoryJson = require("../db/category.json");

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code: any, lang: any) {
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

function errorHtml(title: string){
  return `
 <div class="post_loadfail">
    <h2>${title}</h2>
    <h2>Post content not created yet.</h2>
    <img src="/images/not_found.png">
    </div>
    `
}

export default (app: Application)=> {
  
  /* GET home with category name page. */
  
  app.get('/:category_name/:slug', async function (req: Request, res: Response, next:NextFunction) {
    
    
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
    
    try {
       let post : PostType | any = await Post.getPost(`SELECT * FROM posts p where p.category_name = ? and p.slug = ?`, category_name, slug)
        
        // if (err || result == null) {
        //   return res.render('posts/details', {
        //     title: 'javascript-refresh',
        //     post: result,
        //     html: errorHtml(slug),
        //     categoryName: category_name,
        //     slug: slug,
        //     category: category
        //   });
        // }
        
    
        const content = fs.readFileSync(markdownPath(post.path))
          let html = marked.parse(content.toString())
          res.render('posts/details', {
            title: post.title,
            post: post,
            html,
            slug: post.title,
            categoryName: category_name,
            category: category
          });

      } catch (ex){
      
        // res.render('posts/details', {
        //   title: 'Express',
        //   post: result,
        //   html: errorHtml(result.title),
        //   categoryName: category_name,
        //   category: category
        // });
  
          return res.render('posts/details', {
            title: 'javascript-refresh',
            post: false,
            html: errorHtml(slug),
            categoryName: category_name,
            slug: slug,
            category: category
          });
      }
  })
  

  app.get("/inject.js.map", (req, res)=>{
    res.json([])
  })

  /* GET home page. */
  app.get('/', async function (req: Request, res: Response, next:NextFunction) {
    
    let categoryJson = require("../db/category.json")
    let HomeCategory;
    categoryJson.forEach(cat => {
      if (cat.category_name === "") {
        HomeCategory = cat;
      }
    })

    return res.render('index', {
      title: 'Javascript-refresh',
      posts: null,
      html: false,
      categoryName: "Javascript Fundamental",
      category: HomeCategory
    });

  })
  
  
  app.get('/:slug', async function (req: Request, res: Response, next:NextFunction) {
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
      
      try {
        let post : PostType | any = await Post.getPost("SELECT * FROM posts p where p.slug = ?", slug)
       
        const content = fs.readFileSync(markdownPath(post.path))
        let html = marked.parse(content.toString())
        
        res.render('posts/details', {
          title: post.title,
          post: post,
          html,
          categoryName: "Javascript Fundamental.",
          slug: post.title,
          category: category
        });
        
      } catch (ex){
  
        // return res.json({
        //   err: ex.message,
        //   title: slug,
        //   html: errorHtml(slug),
        //   slug: slug,
        //   categoryName: "Javascript Fundamental",
        //   category: category
        // });
        
        return res.render('posts/details', {
          title: slug,
          html: errorHtml(slug),
          slug: slug,
          categoryName: "Javascript Fundamental",
          category: category
        });
      }
      
      
    } else {
      
      return res.render('index', {
        title: "Javascript Fundamental/"+slug,
        message: "Post Not Found",
        categoryName: slug,
        html: false,
        category: category
      });
    }
  })
  
  
}


