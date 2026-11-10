#!/usr/bin/env python3
import urllib.request
import re
import os
import glob
import time

# Retry fetching until dev server responds
html = None
for _ in range(15):
    try:
        html = urllib.request.urlopen("http://localhost:3000/").read().decode("utf-8")
        if html and "Shawon" in html:
            break
    except Exception:
        time.sleep(1)

if not html:
    raise SystemExit("Error: Could not fetch pre-rendered page from dev server")

css_files = glob.glob(".output/public/assets/styles-*.css")
js_files = glob.glob(".output/public/assets/index-*.js")

css_name = os.path.basename(css_files[0]) if css_files else ""
js_name = os.path.basename(js_files[0]) if js_files else ""

# Replace dev-only virtual script with production client bundle
html = re.sub(
    r"<script[^>]*virtual:tanstack-start-dev-client-entry[^>]*></script>",
    f'<script type="module" src="assets/{js_name}"></script>',
    html,
)
# Ensure CSS and static media references use relative paths for GitHub Pages subfolder compatibility
html = re.sub(r'href="/@tanstack-start/styles\.css[^"]*"', f'href="assets/{css_name}"', html)
html = re.sub(r'href="/favicon\.ico"', 'href="favicon.ico"', html)
html = re.sub(r'src="/([^"]+\.(?:mp4|webm|webp|jpg|jpeg|png))"', r'src="\1"', html)
html = re.sub(r'href="/([^"]+\.pdf)"', r'href="\1"', html)

# Add .nojekyll so GitHub Pages does not ignore underscore files
open(".output/public/.nojekyll", "w").close()

with open(".output/public/index.html", "w", encoding="utf-8") as f:
    f.write(html)

with open(".output/public/404.html", "w", encoding="utf-8") as f:
    f.write(html)

print(f"Successfully generated .output/public/index.html & 404.html ({len(html)} bytes)")
