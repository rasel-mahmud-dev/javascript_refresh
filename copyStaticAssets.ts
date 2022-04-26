import * as shell from "shelljs";

shell.cp("-R", "src/markdowns", "dist");
shell.cp("-R", "src/public/images", "dist/public");
shell.cp("-R", "src/db/category.json", "dist/db");