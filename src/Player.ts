import { Card, CardArea } from "./Card";

export default class Player {
	#cards: Card[];
	#battlePile: Card[];
	#speedPile: Card[];
	#safetyArea: Card[];

	constructor() {
		this.#battlePile = [];
		this.#cards = [];
		this.#speedPile = [];
		this.#safetyArea = [];
	}

	get battle(): Card | null {
		return this.peek(CardArea.Battle);
	}

	get cards(): Card[] {
		return this.#cards;
	}

	get safetyArea(): Card[] {
		return this.#safetyArea;
	}

	get speed(): Card | null {
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

	private peek(pileType: CardArea): Card | null {
		let pile: Card[];

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

	play(target: Player, card: Card) {}

	recieve(card: Card): boolean {
		if (!this.checkPiles(card)) {
			return false;
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
