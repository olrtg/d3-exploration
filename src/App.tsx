import Chart from './Chart';
import toolCounts from './tool-counts.json';
import toolMatches from './tool-matches.json';

function App() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-6">
        <section className="text-center pt-12 pb-4">
          <h1 className="font-semibold text-4xl">
            Javascript Framework Co-usage
          </h1>

          <p className="text-lg">
            Likelihood of being a fan of other tools, given that a developer is
            a fan of a tool
          </p>
        </section>

        <div className="py-24">
          <Chart toolCounts={toolCounts} toolMatches={toolMatches} />
        </div>

        <footer className="py-4 text-center">
          <p>
            Original:{' '}
            <a
              href="https://js-tools.netlify.app/"
              className="text-blue-600 underline"
              target="_blank"
            >
              js-tools.netlify.app
            </a>{' '}
            (by Amelia Wattenberger)
          </p>

          <p>
            Recreated by:{' '}
            <a
              href="https://resume.olrtg.me/"
              className="text-blue-600 underline"
              target="_blank"
            >
              José Olórtegui
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}

export default App;
