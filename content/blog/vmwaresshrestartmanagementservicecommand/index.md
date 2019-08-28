---
title: VM Ware 5 ssh restart Management Service Command
date: 2016-08-02T02:57:01
description: Log in to SSH or Local console as root.Run these commands:
/etc/init.d/hostd restart
/etc/init.d/vpxa restart

Note: In ESXi 4.x, run this command to restart the vpxa agent:

service vmware-vpxa
---

Log in to SSH or Local console as root.
Run these commands:

/etc/init.d/hostd restart
/etc/init.d/vpxa restart

Note: In ESXi 4.x, run this command to restart the vpxa agent:

service vmware-vpxa restart
