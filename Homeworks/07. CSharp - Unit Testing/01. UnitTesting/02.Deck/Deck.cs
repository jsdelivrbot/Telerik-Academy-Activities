﻿namespace _02.Deck
{
    using _03.Santase.GameLogic.Cards;
    using _03.Santase.GameLogic.Extensions;
    using System.Collections.Generic;
    using System.Linq;

    public class Deck : IDeck
    {
        private static readonly IList<Card> AllCards = new List<Card>();

        private static readonly IEnumerable<CardType> AllCardTypes = new List<CardType>
                                                                            {
                                                                            CardType.Nine,
                                                                            CardType.Ten,
                                                                            CardType.Jack,
                                                                            CardType.Queen,
                                                                            CardType.King,
                                                                            CardType.Ace
                                                                            };

        private static readonly IEnumerable<CardSuit> AllCardSuits = new List<CardSuit>
                                                                            {
                                                                            CardSuit.Club,
                                                                            CardSuit.Diamond,
                                                                            CardSuit.Heart,
                                                                            CardSuit.Spade
                                                                            };

        private readonly IList<Card> listOfCards;

        static Deck()
        {
            foreach (var cardSuit in AllCardSuits)
            {
                foreach (var cardType in AllCardTypes)
                {
                    AllCards.Add(new Card(cardSuit, cardType));
                }
            }
        }

        public Deck()
        {
            this.listOfCards = AllCards.Shuffle().ToList();
            this.TrumpCard = this.listOfCards[0];
        }

        public Card TrumpCard { get;  set; }

        public int CardsLeft => this.listOfCards.Count;

        public Card GetTrumpCard
        {
            get
            {
                return this.TrumpCard;
            }
        }

        public Card GetNextCard()
        {
            if (this.listOfCards.Count == 0)
            {
                throw new _03.Santase.GameLogic.InternalGameException("Deck is empty!");
            }

            var card = this.listOfCards[this.listOfCards.Count - 1];
            this.listOfCards.RemoveAt(this.listOfCards.Count - 1);

            return card;
        }

        public void ChangeTrumpCard(Card newCard)
        {
            this.TrumpCard = newCard;

            if (this.listOfCards.Count > 0)
            {
                this.listOfCards[0] = newCard;
            }
        }
    }
}