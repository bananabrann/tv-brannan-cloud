# Grandma's TV
![Version](https://shields.io/github/package-json/v/bananabrann/tv.brannan.cloud?logo=npm)
![Website](https://img.shields.io/website?down_color=red&down_message=offline&label=app&logo=vercel&up_color=green&up_message=online&url=https%3A%2F%2Ftv.brannan.cloud)

A simple project to make navigating to various streaming services simple and easy for my grandma. This site is loaded directly onto a microprocessor behind their TV (it's secretly just a website, don't tell her) and is opened automatically when they turn their TV on.

As of 1.1.0, tv.brannan.cloud now has a ChatGPT-powered chat bot that enables grandma to type the name of a show, and if it's a valid show on Netflix or Youtube, have the option to instantly navigate to the show on the website.

## Deploying this app
To deploy code to grandma's TV, **push to the "main" branch.**

This website is a SvelteKit app deployed and hosted on Vercel. CI/CD pipelines configurations are managed on Vercel. Storage and other services (such as DNS) are on DigitalOcean. CD pipelines and environments variables are **configured on Vercel.**

## SvelteKit development commands

##### Build script

`npm run build`

> To deploy your app, the SvelteKit app needs the [Vercel adapter](https://kit.svelte.dev/docs/adapters).

#### Preview production build

`npm run preview`

##### Preview production build

`npm run preview`

##### Start development build

`npm run dev`, or if you're cool, `npm run dev -- --open`


## Common errors

### SOME_SECRET_HERE" is not exported by "$env/static/private", imported by "src/lib/server/{file}"

The environment variables are not set.

In GitHub Actions (or other pipeline providers), `env` of the YAML does not pass it to the app. The server needs the .env file to be created.

```yaml
jobs:
    build:
        - name: "Create .env file"
            run: |
                touch .env
                echo "OPENAI_API_KEY=${{ secrets.OPENAI_API_KEY }}" >> .env
                echo "OPENAI_ORGANIZATION_ID=${{ secrets.OPENAI_ORGANIZATION_ID }}" >> .env
                echo "WHITELISTED_USERS"="" >> .env
```
