# Use Chainguard nginx image
FROM cgr.dev/chainguard/nginx:latest

# Copy all static files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY playlist-data.js /usr/share/nginx/html/

# PWA files
COPY manifest.json /usr/share/nginx/html/
COPY sw.js /usr/share/nginx/html/

# Icons and favicons
COPY favicon.svg /usr/share/nginx/html/
COPY icon-*.svg /usr/share/nginx/html/
COPY og-image.svg /usr/share/nginx/html/

# SEO files
COPY robots.txt /usr/share/nginx/html/
COPY sitemap.xml /usr/share/nginx/html/
COPY humans.txt /usr/share/nginx/html/

# Expose port 8080
EXPOSE 8080

# nginx runs automatically as the entrypoint
