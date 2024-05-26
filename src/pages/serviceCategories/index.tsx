import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./ServiceCategories.module.css";
import Info from "@/components/homecard/homecard";
import { useRouter } from "next/router";
import Link from "next/link";

const ServiceCategories = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.section__padding1}>
          <div className={styles.how__cta_content}>
            <h3>Book something awesome for your next event</h3>
          </div>
          <div className={styles.tran__sectionAdvanceContainerr}>
            {[
              {
                img: "/images/photography.svg",
                title: "Photography",
                type: "Photographer",
              },
              { img: "/images/venues.svg", title: "Venue", type: "Venues" },
              { img: "/images/caters.svg", title: "Caters", type: "Caterer" },
              { img: "/images/manage.svg", title: "Manage by Taqreebat" },
            ].map((item, index) => (
              <Link href={`/vendorPackages?type=${item.type}`}>
                <div
                  key={index}
                  className={styles.tran__container_b}
                  style={{
                    backgroundImage: `url(${item.img})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                  }}
                >
                  <div className={styles.info__containerr}>
                    <Info title={item.title} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCategories;
