---
title: Restart Service VMWare 5.5
date: 2017-06-15T16:09:49
description: Log in to ESXi Shell or SSH as root.For Enabling ESXi Shell or SSH, see Using ESXi Shell in ESXi 5.x and 6.x (2004746).Restart the ESXi host daemon and vCenter Agent services using these commands#/etc
---

Log in to ESXi Shell or SSH as root.

For Enabling ESXi Shell or SSH, see Using ESXi Shell in ESXi 5.x and 6.x (2004746).

Restart the ESXi host daemon and vCenter Agent services using these commands:

/etc/init.d/hostd restart

/etc/init.d/vpxa restart
