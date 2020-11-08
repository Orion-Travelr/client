import * as shell from "shelljs";

shell.mkdir('-p', 'dist');
shell.cp("-R", "index.html", "dist/index.html");
