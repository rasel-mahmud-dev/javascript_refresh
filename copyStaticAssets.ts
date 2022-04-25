import * as shell from "shelljs";

shell.cp("-R", "src/markdowns", "dist/markdowns");
shell.cp("-R", "src/db", "dist");