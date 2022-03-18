.PHONY: build create up run exec refresh ssg

build:
	@docker-compose build

create:
# 	@docker run --rm -it -v $PWD:/app -w /app node:16 yarn create next-app --typescript
	@sudo chown -R toshi:toshi ./
	@docker-compose run --rm next yarn install
	@docker-compose run --rm next yarn build

up:
	@docker-compose up -d

run:
	@docker-compose run -p 3000:3000 next bash

refresh:
	@docker-compose stop
	@docker-compose start

del:
	@docker-compose down

exec:
	@docker exec -it next bash
