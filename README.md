# GeoCode Routing API

![Node.js CI](https://github.com/stefanzone/geocode-routing-api/workflows/Node.js%20CI/badge.svg)
[![Build Status](https://travis-ci.com/stefanzone/geocode-routing-api.svg?branch=main)](https://travis-ci.com/stefanzone/geocode-routing-api)

The GeoCode Routing API is a service that calculates directions between locations. You can search for directions for different modes of transport, such as public transport, car, walking or cycling.

> **Note:** The data contained in this material is derived from proprietary and third-party sources believed to be reliable, is not necessarily all-inclusive and is not guaranteed as to its accuracy. It is the sole discretion of the viewer to rely on the information in this material.

## Found a bug? 👷‍

Thanks for letting us know! Please [file an issue](https://github.com/stefanzone/geocode-routing-api/issues/new?assignees=&labels=&template=bug_report.md&title=) and we should reply shortly.

## Building the site 🏗

You'll need a recent version of Node: v12.10 or higher.

### Clone the repo

```bash
git clone https://github.com/stefanzone/geocode-routing-api.git
```

### Install dependencies

```bash
npm ci
```

### Start a local server to preview the site

```bash
npm run dev
```

Open `http://localhost:3000/` to see the site locally. Changes to assets will
rebuild the site. Refresh to see your changes.

## Deploying the site 🚀

The site will build and deploy the `main` branch automatically after every `git push origin main` via [Vercel](https://vercel.com).
