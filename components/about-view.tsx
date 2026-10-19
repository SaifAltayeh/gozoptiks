"use client";

import Image from "next/image";
import { useState } from "react";
import { aboutCopy } from "@/data/about";

export function AboutView() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const copy = aboutCopy[lang];

  return (
    <article className="about" lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <section className="about-hero">
        <Image src="/images/event/inside.jpg" alt="" fill sizes="100vw" priority />
        <div className="about-hero-copy">
          <div className="about-langs">
            <button type="button" className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>
              {aboutCopy.en.langLabel}
            </button>
            <button type="button" className={lang === "ar" ? "is-active" : ""} onClick={() => setLang("ar")}>
              {aboutCopy.ar.langLabel}
            </button>
          </div>
          <p className="kicker">Amman · 2020</p>
          <h1>{copy.title}</h1>
          <p>{copy.tagline}</p>
        </div>
      </section>

      <section className="about-story" data-reveal>
        <div className="about-body">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="about-story-media">
          <Image src="/images/event/service.jpg" alt="" fill sizes="(max-width: 860px) 100vw, 40vw" />
        </div>
      </section>

      <section className="about-promise">
        <div className="about-promise-inner" data-reveal>
          <h2>{copy.promiseTitle}</h2>
          <ul>
            {copy.promises.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="about-close" data-reveal>
        {copy.close}
      </p>
    </article>
  );
}
