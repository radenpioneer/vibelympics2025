# Use Chainguard nginx image
FROM cgr.dev/chainguard/nginx:latest

# Copy all static files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY playlist-data.js /usr/share/nginx/html/

# Expose port 8080
EXPOSE 8080

# nginx runs automatically as the entrypoint
