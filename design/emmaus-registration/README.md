# Walk to Emmaus — registration page (Strawbridge UMC)

Working files for the design canvas published at
https://claude.ai/code/artifact/3237ae5e-c935-4176-98ae-3df71b6a4c1b

| File | What it is |
|---|---|
| `Main.dc.html` | The artboard — the whole registration page, with the four-step form wired up |
| `canvas.json` | Artboard layout, the sticky note, and the launch view |
| `sumc-logo.png` | SUMC document mark (black curves), sized by height per the brand rule |
| `styles.css` | Source of the stylesheet inlined into `Main.dc.html`'s `<helmet>` |
| `dc-body.html`, `dc-logic.js` | Markup and component logic, assembled into `Main.dc.html` |
| `part-*.html`, `step*.html`, `build-preview.sh` | Static preview used to check the layout in a browser before seeding |

To re-seed after editing, from this directory:

    node "<design skill>/seed-canvas.mjs" \
      --template "<design skill>/payload.template.html" \
      --out emmaus-walk-registration.html \
      --title "Emmaus Walk Registration" \
      --artboard Main.dc.html --image sumc-logo.png --canvas canvas.json

Brand: strawbridge-umc-brand-design (green `#2F7D38` leads, yellow `#F4B428` rules).
