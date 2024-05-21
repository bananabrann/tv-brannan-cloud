#!/bin/sh

# ---
# Place the following file into /usr/local/bin/ prior to adding it
# to systemctl services (/etc/systemd/system/start_tv.service).
#
# Make sure the file has executable permissions.
# chmod +x /usr/local/bin/start-tv.sh
#
# In order for Firefox kiosk mode to run on Ubuntu 24.04, Wayland 
# needs to be disabled in /etc/gdm3/custom.conf. See README for
# more information.
#
# For more instructions or step-by-step of the Ubuntu computer
# hosting grandma's tv, see the README.
# ---

firefox --url "https://tv.brannan.cloud" --kiosk
