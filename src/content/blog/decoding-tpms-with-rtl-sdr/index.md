---
title: "Decoding TPMS with an RTL-SDR"
date: 2026-07-18T09:00:00-05:00
category: sigint
tags: [rtl-sdr, tpms, sdr, 433mhz, rtl_433]
description: "Pulling tire-pressure telemetry out of the air with a $30 RTL-SDR dongle and rtl_433."
---

Every car built since the mid-2000s is quietly shouting its tire pressure over the air.
Tire Pressure Monitoring System (TPMS) sensors transmit unencrypted telemetry on the
315MHz or 433MHz ISM bands, and with a cheap RTL-SDR dongle you can pull it straight out
of the air. This is a quick walkthrough of the setup I used for a weekend of parking-lot
captures.

## Gear

- RTL-SDR Blog V3 dongle
- A basic 433MHz whip antenna (the bundled telescopic one is fine to start)
- A laptop running [`rtl_433`](https://github.com/merbanan/rtl_433)

No amplifier, no filter, nothing exotic. TPMS sensors are close-range by design — they're
meant to reach a receiver a few feet away inside the same vehicle — so you don't need much
gain to catch one from across a parking lot.

## Capturing

`rtl_433` ships with decoders for most common TPMS protocols (Schrader, Continental,
Hyundai/Kia, and a handful of others). Point it at the dongle and let it listen:

```sh
rtl_433 -f 433.92M -F json
```

Within a minute or two of standing near a row of parked cars, you'll start seeing frames
like this:

```json
{
  "time": "2026-07-18 14:02:11",
  "model": "Schrader",
  "type": "TPMS",
  "id": "1a2b3c",
  "pressure_kPa": 234.4,
  "temperature_C": 28,
  "mic": "CRC"
}
```

Each sensor broadcasts a fixed ID, current pressure, and temperature every minute or so —
more frequently if the car is moving or the pressure changes suddenly. The `id` field is
the interesting one: it's static per sensor, which means it's also a de facto tracking
beacon for that specific vehicle. This is a well-documented privacy concern with TPMS and
part of why it's worth understanding as a SIGINT hobbyist, not just a novelty decode.

## Making sense of the noise

In a real lot you'll catch overlapping frames from every car in range, not just one. A
couple of things that helped:

- Filter on `model` first to drop protocols you don't care about.
- Log to JSON and pipe through `jq` rather than trying to read the raw terminal output.
- Group by `id` to see how a single sensor's pressure/temperature drifts over a capture
  session — this is a much better signal than any single frame.

```sh
rtl_433 -f 433.92M -F json 2>/dev/null | jq -c 'select(.model == "Schrader")'
```

## Where this goes next

The obvious next step is logging captures with a timestamp and rough location and folding
them into a small dashboard — which is exactly the kind of telemetry pipeline I've been
building on the hardware side (more on that in the [builds](/categories/builds/)
category). For now, this is just the receive chain: cheap dongle, stock antenna, open
source decoder, and a surprising amount of data floating around in a band nobody thinks
about.
