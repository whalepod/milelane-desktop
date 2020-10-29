.PHONY: help

.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## build files for distribution
	yarn build

sync: ## sync dist directory with s3
	aws s3 sync ./dist s3://app.milelane.co/ --include "*" --acl public-read --cache-control "max-age=3600" --profile whalepod-milelane-s3

deploy: build sync ## deploy
