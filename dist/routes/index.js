"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const databaseConnect = require("../utils/databaseConnect");
const { marked } = require("marked");
const path = require("path");
const fs = require("fs");
const categoryJson = require("../db/category.json");
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
        const hljs = require('highlight.js');
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});
// marked.parse(mdContent.toString(), (err, html) => {
// if(!err) {
//   res.write(html)
//   res.end()
//   // response(res, 200, {mdContent: html, message: "yyyyyyy"})
// } else{
//   response(res, 500,  "markdown file parse fail")
// }
// });
exports.default = (app) => {
    /* GET home with category name page. */
    app.get('/:category_name', function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = yield databaseConnect();
            db.all(`select * from posts`, (err, doc) => {
                if (err) {
                    res.render('index', { title: 'Express', posts: [] });
                }
                else {
                    let categoryJson = require("../db/category.json");
                    categoryJson.forEach(cat => {
                        if (cat.category_name === req.params.category_name) {
                            res.render('index', { title: 'Express', posts: doc, categoryName: "es6", category: cat });
                        }
                    });
                    db.close();
                }
                // const posts = [
                //   { slug: "JavaScript-Primitive-vs-Reference-Values", path: "JavaScript Primitive vs. Reference Values", title: "JavaScript Primitive vs. Reference Values" },
                //   { slug: "JavaScript Class", path: "JavaScript Primitive vs. Reference Values", title: "JavaScript Class" },
                // ]
                // res.render('index', { title: 'Express', posts: posts});
            });
        });
    });
    /* GET home page. */
    app.get('/', function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = yield databaseConnect();
            db.all(`select * from posts`, (err, doc) => {
                if (err) {
                    console.log(err);
                    res.render('index', { title: 'Express', posts: [], categoryName: "all", category: { category_label: "All" } });
                }
                else {
                    db.all(`select *, c.name as category_name from categories c join sub_categories sc on sc.category_id = c.category_id `, (err, sideBar) => {
                        let f = {};
                        sideBar.forEach(cat => {
                            if (f[cat.label]) {
                                f[cat.label] = [...f[cat.label], cat];
                            }
                            else {
                                f[cat.label] = [cat];
                            }
                        });
                        console.log("dsf");
                        res.render('index', { title: 'Express', posts: doc, categoryName: "all", category: { category_label: "All" } });
                        db.close();
                    });
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
        });
    });
    /* GET home page. */
    app.get('/p/:slug', function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            let db = yield databaseConnect();
            db.each(`select * from posts where slug = ?`, slug, (err, doc) => {
                if (err) {
                }
                else {
                    const content = fs.readFileSync(path.resolve("markdowns/" + doc.path));
                    let html = marked.parse(content.toString());
                    res.render('posts/details', { title: 'Express', post: doc, html });
                }
            });
            // const posts = [
            //   { slug: "JavaScript-Primitive-vs-Reference-Values", path: "JavaScript Primitive vs. Reference Values", title: "JavaScript Primitive vs. Reference Values" },
            //   { slug: "JavaScript Class", path: "JavaScript Primitive vs. Reference Values", title: "JavaScript Class" },
            // ]
            // res.render('index', { title: 'Express', posts: posts});
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInJvdXRlcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQzVELE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDcEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUVwRCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ2hCLFFBQVEsRUFBRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7SUFDL0IsU0FBUyxFQUFFLFVBQVMsSUFBSSxFQUFFLElBQUk7UUFDNUIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQzdELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDO0lBQ0QsVUFBVSxFQUFFLGdCQUFnQjtJQUM1QixRQUFRLEVBQUUsS0FBSztJQUNmLEdBQUcsRUFBRSxJQUFJO0lBQ1QsTUFBTSxFQUFFLEtBQUs7SUFDYixRQUFRLEVBQUUsS0FBSztJQUNmLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLEtBQUssRUFBRSxLQUFLO0NBQ2IsQ0FBQyxDQUFBO0FBRUYsc0RBQXNEO0FBQ3BELGFBQWE7QUFDYixvQkFB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