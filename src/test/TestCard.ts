import { Card, CardArea, CardKind } from "../Card";

export default class TestCard extends Card {
	#playRules: (card: Card) => boolean;

	constructor(area: CardArea, kind: CardKind) {
		super(area, kind);

		this.#playRules = () => true;
	}

	set playRules(fn: (card: Card) => boolean) {
		this.#playRules = fn;
	}

	play(card: Card) {
		return this.#playRules(card);
	}
}
