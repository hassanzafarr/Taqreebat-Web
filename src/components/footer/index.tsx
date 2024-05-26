import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
interface FooterLinkProps {
  href: string;
  children: React.ReactNode; // Assuming you want to allow any valid React node as children
}

interface SocialLinkProps {
  href: string;
  src: string;
  alt: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <Link href={href} className={styles.paraFooter}>
    {children}
  </Link>
);

const SocialLink: React.FC<SocialLinkProps> = ({ href, src, alt }) => (
  <div>
    <a href={href}>
      <img src={src} alt={alt} />
    </a>
  </div>
);

const Footer = () => {
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { href: "/", text: "Home" },
        { href: "/", text: "About us" },
      ],
    },
    {
      title: "Contact Us",
      links: [
        { href: "/contact", text: "Info@taqreebat.com" },
        { href: "/number", text: "111-555-666" },
      ],
    },
  ];
  const socialLinks = [
    {
      href: "https://www.facebook.com",
      src: "/images/Facebook.svg",
      alt: "facebook",
    },
    {
      href: "https://www.instagram.com/",
      src: "/images/Instagram.svg",
      alt: "instagram",
    },
    {
      href: "https://www.linkedin.com",
      src: "/images/LinkedIn.svg",
      alt: "linkedin",
    },
    {
      href: "https://twitter.com",
      src: "/images/Twitter.svg",
      alt: "twitter",
    },
  ];

  return (
    <div className={styles.immi__footer}>
      <div className={styles.immi__footer_links}>
        <div className={styles.immi__footer_links_logo}>
          <img src="/images/logo.png" alt="logo" />
        </div>
        {footerLinks.map((group, index) => (
          <div key={index} className={styles.immi__footer_links_div}>
            <b>
              <p className={styles.headingMainFooter}>{group.title}</p>
            </b>
            {group.links.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.text}
              </FooterLink>
            ))}
          </div>
        ))}
        <div className={styles.immi__footer_links_div}>
          <div className={styles.immi__footer_copyright1}>
            <p className={styles.headingMainFooter}>Follow Us</p>
            <div className={styles.immi__social}>
              {socialLinks.map((link, index) => (
                <SocialLink key={index} {...link} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.immi__footer_copyright}>
        <p style={{ textAlign: "center" }}>
          &copy; Copyright {new Date().getFullYear()} Taqreebat. All rights
          reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
