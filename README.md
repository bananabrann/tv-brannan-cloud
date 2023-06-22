# Grandma's TV

![Version](https://shields.io/github/package-json/v/bananabrann/tv.brannan.cloud?logo=npm)
![Website](https://img.shields.io/website?url=https%3A%2F%2Ftv.brannan.cloud&logo=microsoftazure&logoColor=blue)

A simple project to make navigating to various streaming services simple and easy for my grandma. This site is loaded directly onto a microprocessor behind their TV (it's secretly just a website, don't tell her) and is opened automatically when they turn their TV on.

As of 1.1.0, tv.brannan.cloud now has a ChatGPT-powered chat bot tailored for her to type the name of a show, and if it's a valid show on Netflix or Youtube, have the option to instantly navigate to the show on the website.

> There is currently no way to "preview" the chat feature. Due to API costs, I only allow connections from a secret whitelist. Want this feature? [Leave an issue!](https://github.com/bananabrann/tv.brannan.cloud/issues)

## Deploying this app

To deploy code to grandma's TV, **merge code into the "main" branch.** GitHub Actions will comment on your PR with the preview site, and deploy it when it's merged.

This website is a [SvelteKit](https://kit.svelte.dev/) app hosted on [Azure Static Web Apps](https://azure.microsoft.com/en-us/products/app-service/static). Storage and other services are also on Azure.

## SvelteKit development commands

##### Build script

`npm run build`

> To deploy your app, the SvelteKit app needs [this Azure SWA adapter](https://github.com/geoffrich/svelte-adapter-azure-swa). Learn more about adapters [here](https://kit.svelte.dev/docs/adapters).

#### Preview production build

`npm run preview`

##### Preview production build

`npm run preview`

##### Start development build

`npm run dev`, or if you're cool, `npm run dev -- --open` auto-opens the browser. 

## Common errors

### SOME_SECRET_HERE" is not exported by "$env/static/private", imported by "src/lib/server/{file}"

The environment variables are not set. In GitHub Actions (or other pipeline providers), `env` of the YAML does not pass it to the app. The server needs the .env file to be created.

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
