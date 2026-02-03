#!/usr/bin/env bash
set -euo pipefail

URL="${1:-http://localhost:8000}"

echo "Running quick smoke tests against: $URL"

# Determine base directory for assets (if URL points to an HTML file)
if [[ "$URL" =~ \.html?$ ]]; then
  BASE="${URL%/*}"
else
  BASE="${URL%/}"
fi

echo "Using base: $BASE"

check_status() {
  local u="$1"
  local code
  code=$(curl -sSf -o /dev/null -w "%{http_code}" "$u") || code=$?
  echo "$code"
}

# 1) main page
main_status=$(check_status "$URL" ) || true
if [ "$main_status" != "200" ]; then
  echo "FAIL: main page returned HTTP $main_status"
  exit 2
else
  echo "OK: main page returned 200"
fi

# 2) greeting text present (non-fatal)
if curl -s "$URL" | grep -q "Hello, I'm Omar"; then
  echo "OK: greeting text found"
else
  echo "WARN: greeting text not found in page"
fi

# 3) photo accessible
photo_url="$BASE/photo.png"
photo_status=$(check_status "$photo_url" ) || true
if [ "$photo_status" != "200" ]; then
  echo "WARN: photo not accessible at $photo_url (HTTP $photo_status)"
else
  echo "OK: photo accessible"
fi

# 4) CSS accessible
css_url="$BASE/style.css"
css_status=$(check_status "$css_url" ) || true
if [ "$css_status" != "200" ]; then
  echo "WARN: style.css not accessible at $css_url (HTTP $css_status)"
else
  echo "OK: style.css accessible"
fi

echo "Quick tests finished. To run locally, start a local server and run:"
echo "  ./tests/run_tests.sh http://localhost:8000"
