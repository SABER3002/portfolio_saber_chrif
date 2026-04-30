from flask import Flask, render_template, send_from_directory, request, redirect, url_for
import os
from config import (
    PERSONAL_INFO, SOCIAL_LINKS, CV_FILES, CONTENT,
    EDUCATION, EXPERIENCE, SKILLS, LANGUAGES_SPOKEN
)

app = Flask(__name__)

SUPPORTED_LANGS = ["en", "fr", "ar"]
DEFAULT_LANG = "en"

def get_lang():
    lang = request.args.get("lang", DEFAULT_LANG)
    if lang not in SUPPORTED_LANGS:
        lang = DEFAULT_LANG
    return lang

@app.route("/")
def index():
    lang = get_lang()
    return render_template(
        "index.html",
        lang=lang,
        info=PERSONAL_INFO,
        social=SOCIAL_LINKS,
        cv_files=CV_FILES,
        content=CONTENT[lang],
        education=EDUCATION[lang],
        experience=EXPERIENCE[lang],
        skills=SKILLS[lang],
        languages=LANGUAGES_SPOKEN[lang],
        rtl=(lang == "ar"),
    )

@app.route("/download/cv/<lang_code>")
def download_cv(lang_code):
    if lang_code not in CV_FILES:
        return "Not found", 404
    filepath = CV_FILES[lang_code]
    directory = os.path.join(app.static_folder, os.path.dirname(filepath))
    filename = os.path.basename(filepath)
    full_path = os.path.join(directory, filename)
    if not os.path.exists(full_path):
        return render_template("cv_coming_soon.html", lang=get_lang(), content=CONTENT[get_lang()], info=PERSONAL_INFO, social=SOCIAL_LINKS, rtl=(get_lang()=="ar")), 404
    return send_from_directory(directory, filename, as_attachment=True)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
