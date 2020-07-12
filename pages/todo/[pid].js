import Head from "next/head";
import { useRouter } from "next/router";

const Todo = (props) => {
  return (
    <div className="container">
      <Head>
        <title>{props.todo?.title || "Todo"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2>{props.todo?.id}</h2>
        <div>{props.todo?.title}</div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

Todo.getInitialProps = async (ctx) => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos/" + ctx.query.pid
  );
  const todo = await res.json();
  return { todo };
};

export default Todo;
