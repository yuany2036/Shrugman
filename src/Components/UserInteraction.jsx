const UserInteraction = () => {
  return (
    <main>
      <section className="left">
        <input type="text" className="guess" />
        <button className="btn check">Check!</button>
      </section>
      <section className="right">
        <p className="message">Start guessing...</p>
        <p className="label-score">
          💯 Score: <span className="score">20</span>
        </p>
        <p className="label-highscore">
          🥇 Highscore: <span className="highscore">0</span>
        </p>
      </section>
    </main>
  );
};

// export default UserInteraction;
