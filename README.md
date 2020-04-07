# marc-down

[![Join the chat at https://gitter.im/HE-Arc/marc-down](https://badges.gitter.im/HE-Arc/marc-down.svg)](https://gitter.im/HE-Arc/marc-down?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Write and save markdown notes online

## Installation

### Development

Create and activate a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

```bash
# Install dependencies
pip install -r requirements.txt
# Apply migrations
python marcdown_project/manage.py migrate
# Run the server
python marcdown_project/manage.py runserver
```

```bash
cd marcdown_project/frontend

# Install modules
npm install

# "Compile" js files
npm run dev
```

### Production

Adapt the `deploy.sh` script to suit your server's settings, as well as the Capistrano config files in `config`. Then, run

```bash
cap production deploy
```

If you want to deploy a branch other than `master`, run

```bash
cap production deploy BRANCH=branch-name
```
