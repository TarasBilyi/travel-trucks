import Container from "@/components/Container/Container";
import css from "./Home.module.css";
import Link from "next/link";

const Home = () => {
  return (
    <section className={css.home}>
      <Container>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.desc}>
          You can find everything you want in our catalog
        </p>
        <Link className="greenButton" href="/catalog">
          View Now
        </Link>
      </Container>
    </section>
  );
};

export default Home;
