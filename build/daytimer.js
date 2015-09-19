#!/usr/bin/env node
var input, program, tag;

tag = "daytimer:%s =>";

program = require("commander");

input = {};

program.command("question", "add tracking question").parse(process.argv);
