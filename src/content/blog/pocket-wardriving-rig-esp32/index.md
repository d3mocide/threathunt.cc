---
title: "Building a Pocket Wardriving Rig with an ESP32 and GPS"
date: 2026-07-27T09:00:00-05:00
category: builds
tags: [esp32, wardriving, hardware, gps, enclosure]
description: "A battery-powered ESP32 + GPS box that logs Wi-Fi and BLE beacons to a microSD card while it rides in a bag."
---

I wanted a wardriving box small enough to toss in a bag and forget about — no laptop, no
phone tether, just power it on and let it log. This is the first pass: an ESP32, a cheap
GPS module, and a microSD card, in a printed enclosure small enough to clip to a strap.

## Parts

- ESP32 dev board (any WROOM-32 variant works)
- NEO-6M GPS module
- microSD breakout (SPI)
- 18650 cell + a basic TP4056 charge/protection board
- Small 3D-printed enclosure

Total cost is under $25 if you're buying modules instead of a pre-built board, and the
whole thing runs for a full day on a single 18650.

## Wiring

Nothing unusual here — the GPS module talks over UART, the SD card over SPI, and both
share the 3.3V rail:

| Module      | ESP32 pin       |
| ----------- | ---------------- |
| GPS TX      | GPIO16 (RX2)      |
| GPS RX      | GPIO17 (TX2)      |
| SD CS       | GPIO5             |
| SD MOSI/MISO/SCK | GPIO23/19/18 |

The GPS module needs a clear-ish view of the sky, so it sits at the top of the enclosure
under a thin printed window rather than buried next to the battery.

## Firmware approach

The logging loop is deliberately simple:

1. Put the Wi-Fi radio in promiscuous mode and capture beacon/probe frames.
2. Alternate short windows of BLE scanning using the same radio.
3. On every frame, grab the current GPS fix (or the last known good one if there isn't a
   lock yet) and append a line to a WiGLE-compatible CSV on the SD card.
4. Sleep briefly between windows to keep power draw manageable.

That CSV format means captures drop straight into WiGLE or any tool that already speaks
that dialect, without a conversion step. This is the same rough shape as the ESP32-class
sensors in projects like [AntiHunter](https://github.com/lukeswitz/AntiHunter) — single
radio, dumb logger, no realtime processing on-device.

## Power and enclosure

The TP4056 handles charge and protection, so the whole thing survives being tossed in a
bag without a fuel gauge or a fancy PMIC. Battery life lands around 10-12 hours of
continuous scanning on a single 2600mAh 18650, which comfortably covers a day of driving
or walking.

The enclosure is a simple two-piece print: a base that holds the board stack and battery,
and a lid with a cutout for the GPS window and a status LED. Nothing press-fit — just two
M2 screws — so it's easy to get back in for firmware updates.

## What's next

Right now this is a standalone logger — pull the SD card, drop the CSV wherever it needs
to go. The obvious next step is a mesh uplink so a handful of these can report back
without ever touching a laptop, which is the direction I'm taking with
[MeshRF](https://github.com/d3mocide/MeshRF). More on that once there's a second unit
built.
