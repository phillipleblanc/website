# Phillip LeBlanc - Personal Website

A minimal personal website with AI agent support via [llms.txt](https://llmstxt.org/).

## Features

- Clean, responsive design with dark mode support
- `/llms.txt` for AI agent discovery
- `/api.json` OpenAPI schema for the contact API
- Contact form that works via API (agent-friendly)

## Agent Integration

AI agents can discover how to contact me by:

1. Fetching `https://phillipleblanc.github.io/llms.txt`
2. Reading the contact API documentation
3. Sending a POST request to the contact endpoint

## Local Development

```bash
# Serve locally
python -m http.server 8000
```

## Deployment

Automatically deployed to GitHub Pages on push to `main`.

## Contact API

The contact form uses an external API hosted on Val Town. To set up your own:

1. Create a Val on [val.town](https://val.town)
2. Update the API URL in `contact.js` and `llms.txt`
