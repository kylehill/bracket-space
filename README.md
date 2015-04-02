# BracketSpace

Hello! Side projects are more fun than a business, so I'm going to make sure to open source this jam.

This <strike>is</strike> will eventually be a dead simple way to create and administer a tournament or league for you and your friends. Give it a list of people and a few easy format choices (single elim? double elim? World Cup-style group stage? round-robin? etc) and it does the rest. The concepts of data intake and (especially) bracket display <strike>have been</strike> will be redesigned from the ground up. Live updates of results get pushed to anyone that's watching. It's basically a sexier version of Challonge.

It's a node app that runs on [Sails](http://www.sailsjs.org), which is awesome. You should only need to `npm install` and `npm start`, although `npm install -g sails` to get to the CLI tools is suggested. Front-end <strike>is</strike> will be written with Angular; big ups to my students at The Iron Yard for helping me to learn that Angular might not suck as much as I've told them it does.

**Current status**: Barely functiona; front-end complete -- participant intake, bracket display, result intake

**Next up**: Actually make it with Mongo so we can persist data lol

**Queued**:

* MVP data intake
* MVP bracket display
* Double-elim format
* Round-robin format
* Group stage -> single-elim format (World Cup)
* Socket.io push results
* Email link authentication for writes
* Slug configuration
* Self-service registration