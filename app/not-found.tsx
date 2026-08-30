import { Metadata } from "next";
import Container from "@/components/Container/Container";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 - Page not found! | Travel Trucks",
  description: "Sorry, the page you are looking for does not exist.",
};

const NotFound = () => {
  return (
    <Container>
      <div className={css.wrapper}>
        <h1 className={css.title}>404 - Page not found!</h1>
        <p className={css.description}>
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </Container>
  );
};

export default NotFound;
