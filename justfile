#!/usr/bin/env just --justfile

alias s := start
alias d := development
alias l := lint
alias f := format
alias c := cache

start:
	deno run --allow-all ./mod.ts --config deno.jsonc

development:
	deno run --allow-all --watch ./mod.ts --config deno.jsonc

lint:
	deno lint --config deno.jsonc

format:
	deno fmt --config deno.jsonc

cache:
	deno cache ./deps.ts
