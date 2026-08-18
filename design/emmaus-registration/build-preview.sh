#!/bin/sh
head_() {
cat <<'H'
<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@300;400;500;600;700&display=swap">
<link rel="stylesheet" href="styles.css"></head><body>
H
}
foot_() { echo '</body></html>'; }

{ head_; cat part-top.html; echo '</div></section></div>'; foot_; } > prev-a.html
{ head_; echo '<div class="shell"><section class="band-white"><div class="wrap">'; cat step1.html step2.html; echo '</div></section></div>'; foot_; } > prev-b.html
{ head_; echo '<div class="shell"><section class="band-white"><div class="wrap">'; cat step3.html step4.html step5.html; echo '</div></section></div>'; foot_; } > prev-c.html
{ head_; echo '<div class="shell"><section>'; cat part-bottom.html; } > prev-d.html
{ head_; cat part-top.html; cat step1.html; cat part-bottom.html; foot_; } > prev-full.html
