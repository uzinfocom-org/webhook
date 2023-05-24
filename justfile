#!/usr/bin/env just --justfile

alias s := start
alias d := development
alias l := lint
alias f := format
alias c := cache

start:
	deno run --allow-all ./schema.ts --config deno.json

development:
	deno run --allow-all --watch ./schema.ts --config deno.json

lint:
	deno lint --config deno.json

format:
	deno fmt --config deno.json

cache:
	deno cache ./deps.ts
