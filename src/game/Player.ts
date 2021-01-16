import type { Card } from "./Card";

export default class Player {
	#cards: Card[];
	#battlePile: Card[];

	constructor() {
		this.#battlePile = [];
		this.#cards = [];
	}

	get battle(): Card | null {
		const lastIdx = this.#battlePile.length - 1;

		if (lastIdx >= 0) {
			return this.#battlePile[lastIdx];
		}

		return null;
	}

	get cards(): Card[] {
		return this.#cards;
	}

	draw(card: Card): void {
		this.#cards.push(card);
	}

	play(target: Player, card: Card) {}

	recieve(card: Card) {
		this.#battlePile.push(card);
	}
}
