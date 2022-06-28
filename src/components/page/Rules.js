import Header from "../functional/Header";
import Footer from "../functional/Footer";
import "../../Rules.css";

const Rules = () => {


  return (
    <>
      <Header />
      <div className="container__rules">
        <div id="side_bar" className="side_bar">
         
        </div>
        <div id="maincontainer" className="rulecontainer">
          <article>
            <p>The Four Golden Rules</p>
            <ul>
              <li>
                <b>Everyone must have fun.</b>
                <br />
                Winning is cool but at what cost? If your the only person
                enjoying yourself then your building your decks wrong.
                Ovewhelming strategies or powerful cards can make playing mtg a
                chore rather than recreation. Tournament level cards and
                tornament strategies only make it harder for others to create
                fun decks because they will always lose.
              </li>
              <li>
                <b>Try not to outspend your neighbor.</b>
                <br />
                Speaking of powerful cards. MTG can be expensive and the best
                card for your deck can be over $20US each. Efficiency is great
                but put away your piggy bank. Overspending just creates an
                "arms-race" where who has the most money wins and who doesn't
                loses. All you end up doing is breaking rule 1.
              </li>
              <li>
                <b>Respect your neighbor’s deck build.</b>
                <br />
                Finding that perfect card for your deck can be a great
                experience and it will suck is someone just comes along an adds
                it to their deck. So when fixing your own deck try to ovoid
                using cards that are unique to another player's deck. When in
                doubt just ask them. stay away from key
              </li>
              <li>
                <b>Don't break Cards</b>
                <br />
                Its impossible to know how every card interacts with each other.
                We have tried to ban what we believe to the most unfun or
                non-fairplay cards in Modern MTG. Yet there are going to be
                cards we missed. Others we left because we hope people will use
                them fairly. If this is not the case then those cards will be
                banned immediately. Reguardless if they are in someone's deck.
                Desicions on these bans will be made democractically by the
                group.
              </li>
            </ul>
          </article>

          <h3>Banned MTG Deck Strategies</h3>
          <ul>
            <li>Land Destruction</li>
            <li>Creature Sacrifice</li>
            <li>
              Turn Manipilation - this includes:
              <ul>
                <li>Excessive Extra Turns</li>
                <li>Controlling Oppenent's Turn</li>
                <li>Prohibiting actions taken during an oppenent's turn</li>
              </ul>
            </li>
            <li>Infinite Combos</li>
            <li>Cannot Win or Lose</li>
            <li>Poison Counters</li>
          </ul>

          <h3>MTG Key Abilities</h3>
          <ul>
            <li>Infect</li>
            <li>Imprint</li>
            <li>Annihilate</li>
          </ul>

          <h3>Banned Card Archtypes</h3>
          <ul>
            <li>Mass Removal - mana value of 4 and less</li>
            <li>Mass Removal - that removes everthing from the battlefield</li>
          </ul>
        </div>
        <div id="side_bar" className="side_bar">

        </div>
      </div>
      <button onclick="topFunction()" id="myBtn" title="Go to top">
        Top
      </button>
      <Footer />
    </>
  );
};

export default Rules;
