#!/bin/bash

# 1. Install Nginx if not present
apt update
apt install -y nginx

# 2. Write the Nginx configuration file safely
cat > /etc/nginx/sites-available/api << 'EOF'
server {
    listen 80;
    server_name api.*;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# 3. Enable the bridge and restart Nginx
ln -sf /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
systemctl restart nginx

echo "Nginx setup complete!"
