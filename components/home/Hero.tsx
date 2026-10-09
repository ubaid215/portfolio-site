import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import portrait from "../../public/images/portfolio-img.png"
import { HeroAtmosphere } from "./HeroAtmosphere"
import styles from "./Hero.module.css"

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title" data-hero>
      <HeroAtmosphere />
      <div className={styles.portraitStage} aria-hidden="true" data-hero-portrait>
        <div className={styles.portraitMotion}>
          <Image
            src={portrait}
            alt=""
            fill
            sizes="(max-width: 700px) 110vw, 65vw"
            loading="eager"
            placeholder="blur"
            className={styles.portraitImage}
          />
        </div>
      </div>
      <div className={styles.readabilityVeil} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.opening}>
          <p className={styles.statement}>
            What people see.<br />
            How your business runs.
          </p>
          <p className={styles.intro}>
            I build websites for the first impression and custom applications
            for everything that happens after.
          </p>

          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/work" data-magnetic>
              <span className={styles.actionLabel}>
                <span>Explore my work</span>
                <span aria-hidden="true">Explore my work</span>
              </span>
              <span className={styles.actionIcon} aria-hidden="true">
                <ArrowUpRight size={18} strokeWidth={1.8} />
                <ArrowUpRight size={18} strokeWidth={1.8} />
              </span>
            </Link>
            <Link className={styles.secondaryAction} href="/contact">
              Let&apos;s talk
              <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={styles.identity} data-hero-identity>
          <h1 id="hero-title" className={styles.headline} aria-label="Muhammad Ubaidullah">
            <span className={styles.nameMotion}>
              <span className={styles.givenName}>
                <span className={styles.nameReveal}>Muhammad</span>
              </span>
              <span className={styles.familyName}>
                <span className={styles.nameReveal}>Ubaidullah<span className={styles.fullStop}>.</span></span>
              </span>
            </span>
          </h1>
          <p className={styles.role}>Full stack<br />developer.</p>
        </div>

        <div className={styles.bottomRail}>
          <p>Websites <span aria-hidden="true">/</span> Custom applications</p>
          <Link href="#services">
            Scroll to explore
            <span className={styles.scrollIcon} aria-hidden="true">
              <ArrowDown size={16} strokeWidth={1.7} />
              <ArrowDown size={16} strokeWidth={1.7} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
