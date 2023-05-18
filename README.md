# Haiku

An app to read and write haikus. [Deployed here](https://haiku-blog.fly.dev/home).

## Install

This project uses Node, npm and Express. Check you have them installed:

```
node --version
```
```
npm --version
```
Clone the repo and make sure you're within the folder before running the following command in the terminal
```
npm install
```
Then to start a server, run:
```
npm run dev
```
and navigate to "http://localhost:8080/home" to view the site.

Run all tests with 
```
node --test
```

## Known Issues

"/delete/:id request edit haikus array" test is currently failing, though the delete button itself works.

CSS document is undergoing restructuring along with applying bem naming conventions.

## Roadmap

- Wireframe
- Deployed to Fly.io
- A page with a form to submit posts, and a page showing all posts
- No .html files (all HTML responses should be created dynamically within Node)
- No client-side JavaScript (all logic should happen on the server)
- All static assets served correctly (CSS, favicon etc)
- Tests for each server route
- A responsive, mobile-first design
- Ensure the app is accessible to as many different users as possible

## User stories

### Core 
- As an opinionated person, I want to: post my thoughts so others can read them
- As a bored person, I want to: read what other people have posted
### Stretch 
- As an impulsive person, I want to: delete my posts so no one can see them anymore

## Acknowledgements
- [oliverjam.es](https://oliverjam.es/articles/deploying-to-fly)
- [fly.io](https://fly.io/docs/app-guides/continuous-deployment-with-github-actions/)

