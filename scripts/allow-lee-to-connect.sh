#/usr/bin/bash

# This script is used to allow Lee to connect to the TV via XRDP. It makes sure all 
# necessary packages are installed, enables the firewall, and allows XRDP through the
# firewall on the default port. It then gets the dynamic IP address of the machine and
# opens a browser to the TV's echo service with the IP address as a query parameter.
#
# Note: This script is intended to be run on the TV machine.
#
# Note: When installing on grandma's TV, you'll need to allow the file to be executable
# on double click. To do this, right click the file, go to Properties, and check the box
# that says "Allow executing file as program". If she can't double-click, then right-click
# and select "Run Program".



# Update Ubuntu repos.
sudo apt update

# Make sure XRDP is installed (it probably already is).
if ! dpkg -l | grep -q "^ii	xrdp"; then
	sudo apt install xrdp -y
fi

# Enable UFW (firewall).
sudo ufw enable

# Allow XRDP through the firewall on the default port.
sudo ufw allow 3389/tcp

# Reload the firewall to apply changes.
sudo ufw reload

# Get the dynamic IP address of the machine.
TV_IP=$(curl -s https://icanhazip.com)

# Open Firefox and echo the message.
firefox --url https://tv.brannan.cloud/echo?message=$TV_IP
