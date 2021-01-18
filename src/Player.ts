import { ActionCard, CardArea } from "./Card";

export default class Player {
	#cards: ActionCard[];
	#battlePile: ActionCard[];
	#speedPile: ActionCard[];
	#safetyArea: ActionCard[];

	constructor() {
		this.#battlePile = [];
		this.#cards = [];
		this.#speedPile = [];
		this.#safetyArea = [];
	}

	get battle(): ActionCard | null {
		return this.peek(CardArea.Battle);
	}

	get cards(): ActionCard[] {
		return this.#cards;
	}

	get safetyArea(): ActionCard[] {
		return this.#safetyArea;
	}

	get speed(): ActionCard | null {
		return this.peek(CardArea.Speed);
	}

	private checkPiles(card: ActionCard): boolean {
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

	draw(card: ActionCard): void {
		this.#cards.push(card);
	}

	play(target: Player, card: ActionCard) {}

	recieve(card: ActionCard): boolean {
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
