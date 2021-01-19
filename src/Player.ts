import { ActionCard, Card, CardArea, DistanceCard } from "./Card";

export default class Player {
	#cards: Card[];
	#battlePile: ActionCard[];
	#speedPile: ActionCard[];
	#safetyArea: ActionCard[];
	#distanceCards: DistanceCard[];

	constructor() {
		this.#battlePile = [];
		this.#cards = [];
		this.#speedPile = [];
		this.#safetyArea = [];
		this.#distanceCards = [];
	}

	get battle(): ActionCard | null {
		return this.peek(CardArea.Battle);
	}

	get cards(): Card[] {
		return this.#cards;
	}

	get distance(): number {
		return this.#distanceCards.reduce(
			(total, { distance }) => (total += distance),
			0
		);
	}

	get safetyArea(): ActionCard[] {
		return this.#safetyArea;
	}

	get speed(): ActionCard | null {
		return this.peek(CardArea.Speed);
	}

	private checkPiles(card: Card): boolean {
		const cards = [this.battle, this.speed, ...this.safetyArea];

		for (const c of cards) {
			if (c?.play(card) === false) {
				return false;
			}
		}

		return true;
	}

	private peek(pileType: CardArea): ActionCard | null {
		let pile: ActionCard[];

		switch (pileType) {
			case CardArea.Battle:
				pile = this.#battlePile;
				break;

			case CardArea.Speed:
				pile = this.#speedPile;
				break;

			default:
				pile = [];
				break;
		}

		const lastIdx = pile.length - 1;

		if (lastIdx >= 0) {
			return pile[lastIdx];
		}

		return null;
	}

	draw(card: Card): void {
		this.#cards.push(card);
	}

	play(target: Player, card: ActionCard) {}

	recieve(card: ActionCard | DistanceCard): boolean {
		if (!this.checkPiles(card)) {
			return false;
		}

		if ("distance" in card) {
			this.#distanceCards.push(card);
			return true;
		}

		switch (card.area) {
			case CardArea.Battle:
				this.#battlePile.push(card);
				break;

			case CardArea.Speed:
				this.#speedPile.push(card);
				break;

			case CardArea.Safety:
				this.#safetyArea.push(card);
				break;

			default:
				return false;
		}

		return true;
	}
}
