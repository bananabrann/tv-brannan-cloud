# Grandma's TV

![Version](https://shields.io/github/package-json/v/bananabrann/tv.brannan.cloud?logo=npm)
![Website](https://img.shields.io/website?url=https%3A%2F%2Ftv.brannan.cloud&logo=microsoftazure&logoColor=blue)

A simple project to make navigating to various streaming services simple and easy for my grandma. This site is loaded directly onto a microprocessor behind their TV (it's secretly just a website, don't tell her) and is opened automatically when they turn their TV on.

As of 1.1.0, tv.brannan.cloud now has a GPT 3.4-turbo -powered chat bot tailored for her to type the name of a show, and if it's a valid show on Netflix or Youtube, have the option to instantly navigate to the show on the website.

![demo-collage](https://files.brannan.cloud/tv-files/demo-collage.png)

## Setting up hardware

This app is intended to run on Ubuntu 24.04 connected to a TV. These steps assume that you already have Ubuntu 24.04 on the computer.

> For help with that, Google "how to flash .iso to harddrive.

After installaing Ubuntu, there's a few config items to change to make sure the grandma's TV is ready-to-go.

### Start on-screen keyboard

tv.brannan.cloud takes advantage of Ubuntu 24's very clean and robust on-screen keyboard. To use it, simply enable it in the accessibility section in settings.

Settings > Accessibility > Enable "Screen Keyboard"

### Setup fullscreen script

Grandma's TV is an illusion, because it's actually nothing fancy under the hood. But to give that illusion, the website needs to be in fullscreen mode. Grandma doesn't have access to a keyboard, so pressing F11 everytime is not acceptable. Do the following steps so that Firefox can automatically open in fullscreen mode.

#### Disable Wayland

Ubuntu 24 swapped from XOrg to Wayland. Though a more effecient way to interface with low-level graphical systems, Wayland significantly changes how keystrokes are handled in scripts because there's no longer an X11 server to easily interact with.

Edit the config file in /etc/gdm3/

```sh
$ sudo nano /etc/gdm3/custom.conf
```

Make sure the WaylandEnable config option is uncommented and set to `false`.

```txt
WaylandEnable=false
```

#### Run tv script on startup

We need to add a task so that our script is ran on startup. This will allow tv.brannan.cloud to pop-up when grandma turns it on.

Place the startup script in /usr/local/bin/

```bash
sudo mv start-tv.sh /usr/local/bin/start-tv.sh
```

Make sure it has executable rights.

```bash
sudo chmod +x /usr/local/bin/start-tv.sh
```

Create a serivce file and move the contents of /start_tv.service into it.

```bash
sudo nano /etc/systemd/system/start_tv.service
```

```txt
[Unit]
Description=Script to startup Firefox for grandmas TV
After=display.manager.target

[Service]
ExecStart=/usr/local/bin/start-tv.sh
Type=simple
Environment=DISPLAY=:0
Environment=XAUTHORITY=/ome/tv/.Xauthority
User=tv
#Restart=on-failure # optional

[Install]
WantedBy=graphical.target
```

Add it to systemctl.

> You should see a sysmlink created.

```bash
sudo system enable start_tv.service
```

And you're done!

> Helpful systemctl actions:
```bash
# Reload the daemon. This is useful if you edit start_tv.service.
$ sudo systemctl daemon-reload

# Restart the script. This is useful if you're developing because it saves you having to reboot every single time.
$ sudo systemctl restart start_tv.service

```

## Deploying app code changes

There is no software that runs on the computer/tv to host tv.brannan.cloud. It is just a website that is loaded in full-screen mode. The only software that is run is the script for on the computer's startup, which is covered in above section.

To deploy code to grandma's TV, **merge code into the "main" branch.** GitHub Actions will comment on your PR with the preview site, and deploy it when it's merged.

This website is a [SvelteKit](https://kit.svelte.dev/) app hosted on [Azure Static Web Apps](https://azure.microsoft.com/en-us/products/app-service/static). Storage and other services are also on Azure.

## SvelteKit development commands

##### Build script

`npm run build`

> To deploy the tv.brannan.cloud app, the SvelteKit app needs [this Azure SWA adapter](https://github.com/geoffrich/svelte-adapter-azure-swa). Learn more about adapters [here](https://kit.svelte.dev/docs/adapters).

#### Preview production build

`npm run preview`

##### Preview production build

`npm run preview`

##### Start development build

`npm run dev`, or if you're cool, `npm run dev -- --open` auto-opens the browser.

## Common errors

### SOME_SECRET_HERE" is not exported by "$env/static/private", imported by "src/lib/server/{file}"

The environment variables are not set. SvelteKit does not automatically create this file, but will throw an error if the app's environment variables are missing. So you need to create it wherever the app builds, i.e. in the pipeline or configuration files on Azure.

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

### Dockerbuild failed with exit code 1

If Azure Static Web Apps fails to build and **there are no other errors**, it is most likely caused by deployment limits due to caching on Azure Static Web Apps. Because this project uses the free tier of ASWA, I have a limited number of deployments sites allowed. If rapidly developing and deploying, it is possible a new deployment request is sent before the previous deployment site is fully deleted.

Wait a few minutes then try again.

### (on computer) gdk_window_get_position: assertion 'GDK_IS_WINDOW (window)' failed

There are tons of reasons why `firefox --kiosk` doesn't work. Ubuntu 24 switched from XOrg to Wayland, which appears to mess up all sorts of things that relied on the X11 server for keystroke manipulation.

Try disabling Wayland in /etc/gdm3/custom.conf.

> See the section in these docs for disabling Wayland.
