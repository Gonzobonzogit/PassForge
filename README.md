# PassForge

A client-side password strength checker and generator built with vanilla HTML, CSS, and JavaScript.

## What it does

- Checks a password against five strength rules in real time as you type
- Fills a strength bar live (weak → moderate → strong) based on how many rules pass
- Runs a full check on demand and flags which rules are broken with a ✗ marker
- Warns you if you try to use a forbidden/common password
- Offers to generate a strong 14-character password if yours comes back weak or moderate

## Password rules

1. Minimum 10 characters
2. At least one uppercase letter
3. At least one lowercase letter
4. At least one number
5. At least one special character (`~!@#$%^&*` etc.)

## How to use

No install or build step needed. Just open `index.html` in a browser.

1. Type a password into the input field — the strength bar updates live
2. Click **Check** (or press Enter) to run the full evaluation
3. If your password is weak or moderate, you'll be offered a generated strong password
4. Use the **Clear** button to reset, or **Reset** to revert to your last checked password

## Project structure

```
PassForge/
├── index.html
├── assets/
│   ├── icon/
│   │   └── passforge.svg
│   ├── logic/
│   │   ├── checker.js     # Strength evaluation and bar logic
│   │   ├── generator.js   # Password generator (Fisher-Yates shuffle)
│   │   └── main.js        # DOM wiring and event listeners
│   └── style/
│       └── darkstyle.css  # Dracula x Catppuccin theme
```

## Built by

Gonzo Codes — Full-Stack Development Bootcamp Project
